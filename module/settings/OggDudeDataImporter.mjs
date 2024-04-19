/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";
import {SwesItem} from "../data/_module.mjs";

/**
 * A class responsible for configuring custom fonts for the world.
 * @extends {FormApplication}
 */
export class OggDudeDataImporter extends FormApplication {

    /**
     * An application for processing OggDude data file.
     * @param {NewDataFile} [object]  The default settings for new font definition creation.
     * @param {object} [options]            Additional options to configure behaviour.
     */
    constructor(object = {}, options = {}) {
        foundry.utils.mergeObject(object, {
            src: "",
        });
        super(object, options);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: game.i18n.localize('SETTINGS.OggDudeDataImporter.loadWindow.menuLabel'),
            id: 'swesSettings',
            template: 'systems/swes/templates/settings/oggDudeDataImporter.hbs',
            popOut: true,
            icon: 'fas fa-cogs',
            width: 400,
            height: "auto",
            closeOnSubmit: false,
            submitOnChange: true
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    activateListeners(html) {
        super.activateListeners(html);

        html.find(".load-button.control").click(this._onloadButtonClick.bind(this));

    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _updateObject(event, formData) {
        foundry.utils.mergeObject(this.object, formData);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async close(options = {}) {
        await super.close(options);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _onChangeInput(event) {
        return super._onChangeInput(event);
    }

    /* -------------------------------------------- */

    /**
     *
     * @param {Event} event  The originating click event
     * @private
     */
    _onloadButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = $("form.oggDude-data-importer")[0];
        const importedFile = form['zip-file'].files[0];
        const zipFile = new OggDudeImporter().load(importedFile);
        let allDataElements = zipFile
            .then((zip) => {
                let dataElements = OggDudeDataElement.from(zip);
                console.log("All Data Elements:", dataElements);
                return dataElements;

            }).then((dataElements) => {
                let groupByType = OggDudeDataElement.groupByType(dataElements);
                console.log("All Types:", groupByType.directory);
                console.log("All Images:", groupByType.image);
                console.log("All XML:", groupByType.xml);

                let groupByDirectory = OggDudeDataElement.groupByDirectory(dataElements);
                console.log("Group By Directory:", groupByDirectory);

                let xmlGroupByDirectory = OggDudeDataElement.groupByDirectory(groupByType.xml);
                console.log("XML Group By Directory:", xmlGroupByDirectory);

                return dataElements;
            })
            .catch(err => alert(err));

        const armorData = allDataElements.then((data) => {
            let groupByDirectory = OggDudeDataElement.groupByDirectory(data);
            const armorFile = OggDudeDataElement.getElementsFrom(groupByDirectory, "Data", "Armor.xml");
            return zipFile.then((zip) => {
                return zip.files[armorFile.fullPath].async('text');
            });
        });

        const allImages = allDataElements.then((data) => {
            let groupByType = OggDudeDataElement.groupByType(data);
            console.log("Group By Type:", groupByType);
            let images = groupByType.image;
            console.log("All Images:", groupByType.image);

            return images;
        });

        allImages.then(async (images) => {
            const armorImages = images.filter(image => {
                // select only images starting with "EquipmentImages/Armor"
                return image.fullPath.startsWith("Data/EquipmentImages/Armor");
            });
            console.log("Armor Images:", armorImages);

            // Verify that the path is valid and exists on the server and create it if it does not
            const imgPath = OggDudeDataImporter.buildImgArmorPath();
            if (await OggDudeDataImporter.checkPathExists(imgPath)) {
                console.log(`Path ${imgPath} exists !`);
            } else {
                console.warn(`Path ${imgPath} does not exist ! Let's create it.`);
                await OggDudeDataImporter.createPath(imgPath);
            }

            armorImages.forEach(armorImage => {
                zipFile.then((zip) => {
                    const imgData = zip.files[armorImage.fullPath].async('blob');
                    const imgFile = new File([imgData], armorImage.name, {type: armorImage.type});
                    console.log(`Image to be stored ${imgPath}/`, imgFile);
                    OggDudeDataImporter.uploadImage(imgPath, imgFile).then((result) => {
                        console.log(`Image ${imgFile.name} has been uploaded ?`, result);
                    });
                });
            })
        });

        armorData.then((data) => {

            // Without parser
            xml2js.js.parseStringPromise(data, {
                explicitArray: false,
                trim: true,
                mergeAttrs: true
            })
                .then(
                    async function (result) {
                        let folder = game.folders.find(f => f.name === 'Swes Armors' && f.type === 'Item');
                        if (!folder) {
                            folder = await Folder.create({name: 'Swes Armors', type: 'Item', parent: null});
                        }
                        // Step 2: Create the items
                        let armorItems = OggDudeDataImporter.armorMapper(result.Armors.Armor);
                        OggDudeDataImporter.storeArmorItems(armorItems, folder);
                    }
                )
                .catch(
                    function (err) {
                        alert(err)
                    }
                )
            ;

        });
    }

    /**
     * Create a directory on the server.
     * @param path {string} The path to create.
     */
    async static createDirectory(path) {
        return FilePicker.createDirectory("data", path);
    }

    /**
     * Create a path on the server by creating each directory in turn.
     * @param path {string} The path to create.
     */
    async static createPath(path) {
        let pathParts = path.split('/');
        pathParts.forEach((part, index) => {
            let subPath = pathParts.slice(0, index + 1).join('/');
            OggDudeDataImporter.checkPathExists(subPath).then((found) => {
                if (!found) {
                    OggDudeDataImporter.createDirectory(subPath).then((result) => {
                        console.log(`Sub-path ${subPath} created !`, result);
                    });
                }
            });
        });
    }

    /**
     * Check if the path exists on the server.
     * @param path {string} The path to check.
     * @returns {*}
     */
    async static checkPathExists(path) {
        return FilePicker.browse("data", path, {activeSource: "data", recursive: true})
            .then((result) => {
                console.log("Result:", result);
                return result.target !== null;
            })
            .catch(err => {
                console.warn(err);
                return false;
            });
    }

    /**
     * Upload an image to the server.
     * @param path {string} The path of the image.
     * @param file {File} The image file.
     */
    async static uploadImage(path, file) {
        return FilePicker.upload("data", path, file, {}, {notify: false});
    }

    /**
     * Map a String value, if it is not present, return an empty string.
     * @param label {string} The label of the element.
     * @param value {string} The value of the element.
     * @returns {string}
     */
    static mapMandatoryString(label, value) {
        if (value == null || typeof value !== "string") {
            console.error(`Value ${label} is mandatory !`);
            return "";
        }
        return value;
    }

    /**
     * Map an optional String value, if it is not present, return an empty string.
     * @param value {string} The value of the element.
     * @returns {string}
     */
    static mapOptionalString(value) {
        return typeof value === "string" ? value : "";
    }

    /**
     * Map a String value to a Number, if it is not present, return 0.
     * @param label {string} The label of the element.
     * @param value {string} The value of the element.
     * @returns {number}
     */
    static mapMandatoryNumber(label, value) {
        if (value == null || typeof value !== "string") {
            console.error(`Value ${label} is mandatory !`);
            return 0;
        }
        return parseInt(value) || 0;
    }

    /**
     * Map an optional Number value, if it is not present, return 0.
     * @param value {string} The value of the element.
     * @returns {number|number}
     */
    static mapOptionalNumber(value) {
        return parseInt(value) || 0;
    }

    /**
     * Map an optional array value, if it is not present, return an empty array.
     * @param value {Array} The value of the element.
     * @param mapper {function} The function to map the value.
     * @returns {*[]}
     */
    static mapOptionalArray(value, mapper) {
        if (value && Array.isArray(value)) {
            return value.map((v) => {
                return mapper(v)
            });
        }
        if (typeof value === "object" && value !== {}) {
            return [mapper(value)];
        }
        return [];
    }

    /**
     * Store the Armor Items in the database.
     * @param armorItems {SwesArmor[]} The Armor Items to store.
     * @param folder {Folder} The folder to store the items.
     */
    static storeArmorItems(armorItems, folder) {
        let armors = armorItems.map(armor => {
            return {
                name: armor.name,
                img: OggDudeDataImporter.getArmorImage(armor.key),
                type: 'armor', // This should match the type defined in your system
                system: armor, // This should match the structure of your SwesArmor schema
                folder: folder.id // Set the folder id
            };
        });

        // Step 2: Create the items
        Item.createDocuments(armors).then(console.log("Items created !", items));
    }

    /**
     * Armor Array Mapper : Map the Armor XML data to the SwesArmor object array.
     * @param armors {Array} The Armors data from the XML file.
     * @returns {Array}
     */
    static armorMapper(armors) {
        return armors.map((xmlArmor) => {
            return {
                name: OggDudeDataImporter.mapMandatoryString("armor.Name", xmlArmor.Name),
                key: OggDudeDataImporter.mapMandatoryString("armor.Key", xmlArmor.Key),
                description: OggDudeDataImporter.mapMandatoryString("armor.Description", xmlArmor.Description),
                soak: OggDudeDataImporter.mapMandatoryNumber("armor.Soak", xmlArmor.Soak),
                defense: OggDudeDataImporter.mapMandatoryNumber("armor.Defense", xmlArmor.Defense),
                encumbrance: OggDudeDataImporter.mapMandatoryNumber("armor.Encumbrance", xmlArmor.Encumbrance),
                price: OggDudeDataImporter.mapMandatoryNumber("armor.Price", xmlArmor.Price),
                rarity: OggDudeDataImporter.mapMandatoryNumber("armor.Rarity", xmlArmor.Rarity),
                HP: OggDudeDataImporter.mapMandatoryNumber("armor.HP", xmlArmor.HP),
                sources: OggDudeDataImporter.mapOptionalArray(
                    xmlArmor?.Sources?.Source,
                    (source) => {
                        return {description: source._, page: source.Page}
                    }),
                categories: OggDudeDataImporter.mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),
                mods: {
                    miscDesc: OggDudeDataImporter.mapOptionalString(xmlArmor?.BaseMods?.Mod?.MiscDesc)
                }
            }
        });
    }

    /**
     * Build the path to the armor images.
     * @returns {string}
     */
    static buildImgArmorWorldPath() {
        return `worlds/${game.world.id}/swes/images/armors`;
    }

    /**
     * Build the path to the armor images.
     * @returns {string}
     */
    static buildImgArmorSystemPath() {
        return `worlds/${game.system.id}/swes/images/armors`;
    }

    /* -------------------------------------------- */
    /**
     * Get the image of an armor. If it does not exist, return  the default armor image.
     * Otherwise, return the path of the armor image.
     *
     * @param armorKey {string} The key of the armor.
     * @returns {Promise<void>}
     */
    async static getArmorImage(armorKey) {
        // get the armor image path
        const imgArmorWorldPath = OggDudeDataImporter.buildImgArmorWorldPath();
        OggDudeDataImporter.checkPathExists(`${imgArmorWorldPath}/Armor${armorKey}.png`).then((found) => {
            if (found) {
                return `${imgArmorWorldPath}/Armor${armorKey}.png`;
            } else {
                const imgArmorSystemPath = OggDudeDataImporter.buildImgArmorSystemPath();
                return `${imgArmorSystemPath}/Armor.png`;
            }
        });
    }
}
