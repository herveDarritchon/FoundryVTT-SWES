/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";

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
    async _onloadButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = $("form.oggDude-data-importer")[0];
        const importedFile = form['zip-file'].files[0];
        const zipFile = new OggDudeImporter().load(importedFile);
        let allDataElementsPromise = await zipFile
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

        const allDataElements = await allDataElementsPromise
        let groupByDirectory = OggDudeDataElement.groupByDirectory(allDataElements);
        const armorFile = OggDudeDataElement.getElementsFrom(groupByDirectory, "Data", "Armor.xml");
        const armorData = await zipFile.then((zip) => {
            return zip.files[armorFile.fullPath].async('text');
        });

        let groupByType = OggDudeDataElement.groupByType(allDataElements);
        console.log("Group By Type:", groupByType);
        const images = groupByType.image;
        console.log("All Images:", images);

        const armorImages = images.filter(image => {
            // select only images starting with "EquipmentImages/Armor"
            return image.fullPath.startsWith("Data/EquipmentImages/Armor");
        });

        console.log("Armor Images:", armorImages);

        // Verify that the path is valid and exists on the server and create it if it does not
        const imgPath = OggDudeDataImporter.buildImgArmorWorldPath();
        if (await OggDudeDataImporter.checkPathExists(imgPath)) {
            console.log(`Path ${imgPath} exists !`);
        } else {
            console.warn(`Path ${imgPath} does not exist ! Let's create it.`);
            await OggDudeDataImporter.createPath(imgPath);
        }

        armorImages.forEach(armorImage => {
            zipFile.then(async (zip) => {
                const imgData = await zip.files[armorImage.fullPath].async('blob');
                const imgFile = new File([imgData], armorImage.name, {type: armorImage.type});
                console.log(`Image to be stored ${imgPath}/`, imgFile);
                await OggDudeDataImporter.uploadImage(imgPath, imgFile).then((result) => {
                    console.log(`Image ${imgFile.name} has been uploaded ?`, result);
                });
            });
        })

        // Without parser
        const armorDataXml = await xml2js.js.parseStringPromise(armorData, {
            explicitArray: false,
            trim: true,
            mergeAttrs: true
        });

        let folder = game.folders.find(f => f.name === 'Swes Armors' && f.type === 'Item');
        if (!folder) {
            folder = await Folder.create({name: 'Swes Armors', type: 'Item', parent: null});
        }

        // Step 2: Create the items
        const armors = armorDataXml.Armors.Armor;
        let armorItems = OggDudeDataImporter.armorMapper(armors);
        console.log(`armorItems to be created in FVTT ${armorItems} with armors ${armors}`);
        await OggDudeDataImporter.storeArmorItems(armorItems, folder);

        await this.close({});
    }

    /**
     * Create a directory on the server.
     * @param path {string} The path to create.
     * @param target {string} The target directory to create.
     */
    static async createDirectory(path, target) {
        console.log(`Create Path ${path} with target ${target}.`);
        return await FilePicker.createDirectory("data", path + "/" + target, {bucket: "data"});
    }

    /**
     * Create a path on the server by creating each directory in turn.
     * @param path {string} The path to create.
     */
    static async createPath(path) {
        console.log(`Create Path ${path} if necessary.`);
        let pathParts = path.split('/');
        let currentPath = '';
        let fullPath = '';

        for (let part of pathParts) {
            fullPath += part + '/';
            const found = await OggDudeDataImporter.checkPathExists(fullPath);
            console.log(`Sub-path ${fullPath} exists ?`, found);
            if (!found) {
                console.log(`Sub-path ${fullPath} does not exist. Let's create it. CurrentPath ${currentPath} with part ${part}.`)
                const result = await OggDudeDataImporter.createDirectory(currentPath, part);
                console.log(`Sub-path ${fullPath} created !`, result);
            }
            currentPath = fullPath;
        }
    }

    /**
     * Check if the path exists on the server.
     * @param path {string} The path to check.
     * @returns {Promise<boolean>} True if the path exists, false otherwise.
     */
    static async checkPathExists(path) {
        console.log(`Check that Path ${path} exists.`);
        let result;
        try {
            result = await FilePicker.browse("data", path, {activeSource: "data", recursive: true});
        } catch (e) {
            return false;
        }
        const target = result.target;
        const isExisting = target !== null;
        console.log(`Path ${path} with result ${target} exists ?`, isExisting);
        return isExisting;
    }

    /**
     * Upload an image to the server.
     * @param path {string} The path of the image.
     * @param file {File} The image file.
     */
    static async uploadImage(path, file) {
        return await FilePicker.upload("data", path, file, {}, {notify: false});
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
    static async storeArmorItems(armorItems, folder) {
        let armorPromises = await Promise.all(armorItems.map(async armor => {
            console.log("Armor %s: Armor image to be returned by method getArmorImage.", armor.key);
            const img = await OggDudeDataImporter.getArmorImage(armor.key);
            console.log("Armor %s: Armor image returned by method getArmorImage is %.", armor.key, img);
            return {
                name: armor.name,
                img: img,
                type: 'armor', // This should match the type defined in your system
                system: armor, // This should match the structure of your SwesArmor schema
                folder: folder.id // Set the folder id
            };
        }));

        console.log("Armors to be created from Promises:", armorPromises);

        let armorPromiseResolved = Promise.all(armorPromises).then(async armors => {
            console.log("Armors to be created:", armors)
            await Item.createDocuments(armors).then((items) => {
                console.log("Armors created:", items);
            });
        }).catch(error => {
            console.error("Error while creating armors:", error);
        });
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
    static buildImgItemSystemPath() {
        return `systems/${game.system.id}/assets/images/icons`;
    }

    /* -------------------------------------------- */
    /**
     * Get the image of an armor. If it does not exist, return  the default armor image.
     * Otherwise, return the path of the armor image.
     *
     * @param armorKey {string} The key of the armor.
     * @returns {Promise<string>} The path of the armor image.
     */
    static async getArmorImage(armorKey) {
        // get the armor image path
        const imgArmorWorldPath = OggDudeDataImporter.buildImgArmorWorldPath();
        const armorImage = `${imgArmorWorldPath}/Armor${armorKey}.png`;
        console.log(`Armor image ${armorImage} for armor ${armorKey} to be checked.`);
        const found = await OggDudeDataImporter.checkPathExists(armorImage);
        if (found) {
            console.log(`Armor image ${armorImage} for armor ${armorKey} found. Using specific armor image.`);
            return armorImage;
        } else {
            const imgArmorSystemPath = OggDudeDataImporter.buildImgItemSystemPath();
            const armorImage = `${imgArmorSystemPath}/armor.svg`;
            console.log(`Armor image ${armorImage} for armor ${armorKey} not found. Using default armor image.`)
            return armorImage;
        }
    }
}
