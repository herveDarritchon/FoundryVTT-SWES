/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";
import {checkFileExists, createPathIfNeccessary, uploadFileOnTheServer} from "../helpers/server/directory/file.mjs";
import {createFoundryFolder} from "../helpers/foundry/folder.mjs";
import {parseXmlToJson} from "../utils/xml/parser.mjs";

/**
 * Build the path to the armor images.
 * @returns {string} The path to the armor images.
 * @private
 * @function
 * @name _buildItemImgSystemPath
 * @memberof OggDudeDataImporter
 */
function _buildItemImgSystemPath() {
    return `systems/${game.system.id}/assets/images/icons`;
}

/**
 * Build the path to the images.
 * @param type {string} The type of the images.
 * @returns {string} The path to the images.
 * @private
 * @function
 * @name _buildArmorImgWorldPath
 * @memberof OggDudeDataImporter
 */
function _buildArmorImgWorldPath(type) {
    return `worlds/${game.world.id}/swes-assets/images/${type}`;
}

/**
 * Create the path to the armor images and verify that it exists on the server.
 * If it does not exist, create it.
 * @returns {Promise<string>}
 * @async
 * @private
 * @function
 * @name _createArmorImagePath
 * @memberof OggDudeDataImporter
 */
async function _createArmorImagePath() {
    // Verify that the path is valid and exists on the server and create it if it does not
    const imgPath = _buildArmorImgWorldPath("armors");
    await createPathIfNeccessary(imgPath);
    return imgPath;
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */

/**
 * Upload the images to the server.
 * @param images {OggDudeDataElement[]} The images to upload.
 * @param zip {JSZip} The zip file.
 * @param imgPath {string} The path of the images.
 * @returns {Promise<void>}
 * @async
 * @private
 * @function
 * @name _uploadImagesOnTheServer
 * @memberof OggDudeDataImporter
 */
async function _uploadImagesOnTheServer(images, zip, imgPath) {
    // Upload the armor images to the server
    const armorImages = images.filter(image => {
        // select only images starting with "EquipmentImages/Armor"
        return image.fullPath.startsWith("Data/EquipmentImages/Armor");
    });

    console.log("Armor Images:", armorImages);

    for (const armorImage of armorImages) {
        const imgData = await zip.files[armorImage.fullPath].async('blob');
        console.log("Armor Image Data before upload:", armorImage);
        await uploadFileOnTheServer({data: imgData, element: armorImage}, imgPath);
    }
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */

/**
 * Store the Armor Items in the database.
 * @param armorItems {SwesArmor[]} The Armor Items to store.
 * @param folder {Folder} The folder to store the items.
 * @returns {Promise<void>} A Promise that resolves when the Armor Items have been stored.
 * @async
 * @private
 * @function
 * @name _storeArmorItems
 * @memberof OggDudeDataImporter
 */
async function _storeArmorItems(armorItems, folder) {
    let armorPromises = await Promise.all(armorItems.map(async armor => {
        console.log("Armor %s: Armor image to be returned by method _getArmorImage.", armor.key);
        const img = await _getArmorImage(armor.key);
        console.log("Armor %s: Armor image returned by method _getArmorImage is %.", armor.key, img);
        return {
            name: armor.name,
            img: img,
            type: 'armor', // This should match the type defined in your system
            system: armor, // This should match the structure of your SwesArmor schema
            folder: folder.id // Set the folder id
        };
    }));

    console.log("Armors to be created from Promises:", armorPromises);

    let armorPromiseResolved =  Promise.all(armorPromises).then(async armors => {
        console.log("Armors to be created:", armors)
        await Item.createDocuments(armors).then((items) => {
            console.log("Armors created:", items);
        });
    }).catch(error => {
        console.error("Error while creating armors:", error);
    });
}

/**
 * Store the Armor Items in the database. The Armor data is mapped to the SwesArmor object array.
 * @param armorDataXml {object} The Armor JSON data.
 * @param folder {Folder} The Armor folder.
 * @returns {Promise<void>} A Promise that resolves when the Armor Items have been stored.
 * @async
 * @private
 * @function
 * @name _storeArmor
 * @memberof OggDudeDataImporter
 */
async function _storeArmor(armorDataXml, folder) {
    // Step 2: Create the items
    const armors = armorDataXml.Armors.Armor;
    let armorItems = _armorMapper(armors);
    console.log(`armorItems to be created in FVTT ${armorItems} with armors ${armors}`);
    await _storeArmorItems(armorItems, folder);
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */

/**
 * Map a String value, if it is not present, return an empty string.
 * @param label {string} The label of the element.
 * @param value {string} The value of the element.
 * @returns {string} The mapped value of the element.
 * @private
 * @function
 * @name _mapMandatoryString
 * @memberof OggDudeDataImporter
 */
function _mapMandatoryString(label, value) {
    if (value == null || typeof value !== "string") {
        console.warn(`Value ${label} is mandatory !`);
        return "";
    }
    return value;
}

/**
 * Map an optional String value, if it is not present, return an empty string.
 * @param value {string} The value of the element.
 * @returns {string} The mapped value of the element.
 * @private
 * @function
 * @name _mapOptionalString
 * @memberof OggDudeDataImporter
 */
function _mapOptionalString(value) {
    return typeof value === "string" ? value : "";
}

/**
 * Map a String value to a Number, if it is not present, return 0.
 * @param label {string} The label of the element.
 * @param value {string} The value of the element.
 * @returns {number} The mapped value of the element.
 * @private
 * @function
 * @name _mapMandatoryNumber
 * @memberof OggDudeDataImporter
 */
function _mapMandatoryNumber(label, value) {
    if (value == null || typeof value !== "string") {
        console.warn(`Value ${label} is mandatory !`);
        return 0;
    }
    return parseInt(value) || 0;
}

/**
 * Map an optional Number value, if it is not present, return 0.
 * @param value {string} The value of the element.
 * @returns {number|number} The mapped value of the element.
 * @private
 * @function
 * @name _mapOptionalNumber
 * @memberof OggDudeDataImporter
 */
function _mapOptionalNumber(value) {
    return parseInt(value) || 0;
}

/**
 * Map an optional array value, if it is not present, return an empty array.
 * @param value {Array} The value of the element.
 * @param mapper {function} The function to map the value.
 * @returns {*[]} The mapped value of the element as an array.
 * @private
 * @function
 * @name _mapOptionalArray
 * @memberof OggDudeDataImporter
 */
function _mapOptionalArray(value, mapper) {
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
 * Armor Array Mapper : Map the Armor XML data to the SwesArmor object array.
 * @param armors {Array} The Armors data from the XML file.
 * @returns {Array} The SwesArmor object array.
 * @private
 * @function
 * @name _armorMapper
 * @memberof OggDudeDataImporter
 */
function _armorMapper(armors) {
    return armors.map((xmlArmor) => {
        return {
            name: _mapMandatoryString("armor.Name", xmlArmor.Name),
            key: _mapMandatoryString("armor.Key", xmlArmor.Key),
            description: _mapMandatoryString("armor.Description", xmlArmor.Description),
            soak: _mapMandatoryNumber("armor.Soak", xmlArmor.Soak),
            defense: _mapMandatoryNumber("armor.Defense", xmlArmor.Defense),
            encumbrance: _mapMandatoryNumber("armor.Encumbrance", xmlArmor.Encumbrance),
            price: _mapMandatoryNumber("armor.Price", xmlArmor.Price),
            rarity: _mapMandatoryNumber("armor.Rarity", xmlArmor.Rarity),
            HP: _mapMandatoryNumber("armor.HP", xmlArmor.HP),
            sources: _mapOptionalArray(
                xmlArmor?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: _mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),
            mods: {
                miscDesc: _mapOptionalString(xmlArmor?.BaseMods?.Mod?.MiscDesc)
            }
        }
    });
}

/**
 * Get the image of an armor. If it does not exist, return  the default armor image.
 * Otherwise, return the path of the armor image.
 * @param armorKey {string} The key of the armor.
 * @returns {Promise<string>} The path of the armor image.
 *  @async
 *  @private
 *  @function
 *  @name _getArmorImage
 *  @memberof OggDudeDataImporter
 */
async function _getArmorImage(armorKey) {
    // get the armor image path
    const imgArmorWorldPath = _buildArmorImgWorldPath("armors");
    const armorImage = `${imgArmorWorldPath}/Armor${armorKey}.png`;
    console.log(`Armor image ${armorImage} for armor ${armorKey} to be checked.`);
    const found = await checkFileExists(armorImage);
    if (found) {
        console.log(`Armor image ${armorImage} for armor ${armorKey} found. Using specific armor image.`);
        return armorImage;
    } else {
        const imgArmorSystemPath = _buildItemImgSystemPath();
        const armorImage = `${imgArmorSystemPath}/armor.svg`;
        console.log(`Armor image ${armorImage} for armor ${armorKey} not found. Using default armor image.`)
        return armorImage;
    }
}

/**
 * Process the Armor data from the imported file. The process is as follows:
 * 1. Load the zip file
 * 2. Load the data elements from the zip
 * 3.1 Group the data elements by type
 * 3.2 Group the data elements by directory
 * 4. Get the Armor file from the Data directory
 * 5. Get the Armor data from the Armor file
 * 6. Create the folder in the Item tab
 * 7. Upload the images to the server
 * 8. Parse the XML data
 * 9. Create the folder
 * 10. Store the Armor Items
 * @param importedFile {File} The imported file.
 * @returns {Promise<void>} A Promise that resolves when the Armor data has been processed.
 * @async
 * @private
 * @function
 * @name _processArmorData
 * @memberof OggDudeDataImporter
 */
async function _processArmorData(importedFile) {
    // Step 1: Load the zip file
    const zip = await new OggDudeImporter().load(importedFile);

    // Step 2: Load the data elements from the zip
    let allDataElements = OggDudeDataElement.from(zip);

    // Step 3.1: Group the data elements by directory
    let groupByDirectory = OggDudeDataElement.groupByDirectory(allDataElements);
    console.log("Group By Directory:", groupByDirectory);

    // Step 3.2: Group the data elements by type
    let groupByType = OggDudeDataElement.groupByType(allDataElements);
    console.log("Group By Type:", groupByType);

    // Step 4: Get the Armor file from the Data directory
    const armorFile = OggDudeDataElement.getElementsFrom(groupByDirectory, "Data", "Armor.xml");

    // Step 5: Get the Armor data from the Armor file
    const armorData = await zip.files[armorFile.fullPath].async('text');

    // Step 6: Create the folder in the Item tab
    const imgPath = await createPathIfNeccessary(_buildArmorImgWorldPath("armors"));

    // Step 7: Upload the images to the server
    await _uploadImagesOnTheServer(groupByType.image, zip, imgPath);

    // Step 8: Parse the XML data
    const armorDataXml = await parseXmlToJson(armorData);

    // Step 9: Create the folder
    let folder =  await createFoundryFolder('Swes Armors', 'Item');

    // Step 10: Store the Armor Items
    await _storeArmor(armorDataXml, folder);
}

/**
 * An application for processing OggDude data file. This application is used to import data from OggDude's generator.
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

        await _processArmorData(importedFile);

        await this.close({});
    }
}
