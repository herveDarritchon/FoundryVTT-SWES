/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";

/**
 * Create a directory on the server. If the directory does not exist, create it.
 * @param path {string} The path to create the directory.
 * @param target {string} The target directory to create the path.
 * @returns {Promise<Directory>} The created directory.
 * @async
 * @private
 * @function
 * @name _createDirectory
 * @memberof OggDudeDataImporter
 */
async function _createDirectory(path, target) {
    console.log(`Create Path ${path} with target ${target}.`);
    return await FilePicker._createDirectory("data", path + "/" + target, {bucket: "data"});
}

/**
 * Check if the path exists on the server. If the path exists, return true, otherwise return false.
 * @param path {string} The path to check.
 * @returns {Promise<boolean>} True if the path exists, false otherwise.
 * @async
 * @private
 * @function
 * @name _checkPathExists
 * @memberof OggDudeDataImporter
 */
async function _checkPathExists(path) {
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
 * Create a path on the server by creating each directory in turn.
 * If the path does not exist, create it.
 * @param path {string} The path to create.
 * @returns {Promise<void>} A Promise that resolves when the path has been created.
 * @async
 * @private
 * @function
 * @name _createPath
 * @memberof OggDudeDataImporter
 */
async function _createPath(path) {
    console.log(`Create Path ${path} if necessary.`);
    let pathParts = path.split('/');
    let currentPath = '';
    let fullPath = '';

    for (let part of pathParts) {
        fullPath += part + '/';
        const found = await _checkPathExists(fullPath);
        console.log(`Sub-path ${fullPath} exists ?`, found);
        if (!found) {
            console.log(`Sub-path ${fullPath} does not exist. Let's create it. CurrentPath ${currentPath} with part ${part}.`)
            const result = await _createDirectory(currentPath, part);
            console.log(`Sub-path ${fullPath} created !`, result);
        }
        currentPath = fullPath;
    }
}

/**
 * Build the path to the armor images.
 * @returns {string} The path to the armor images.
 * @private
 * @function
 * @name _buildImgItemSystemPath
 * @memberof OggDudeDataImporter
 */
function _buildImgItemSystemPath() {
    return `systems/${game.system.id}/assets/images/icons`;
}

/**
 * Build the path to the armor images.
 * @returns {string}
 * @private
 * @function
 * @name _buildImgArmorWorldPath
 * @memberof OggDudeDataImporter
 */
function _buildImgArmorWorldPath() {
    return `worlds/${game.world.id}/swes-assets/images/armors`;
}

/**
 * Create the path to the armor images and verify that it exists on the server.
 * If it does not exist, create it.
 * @returns {Promise<string>}
 * @async
 * @private
 * @function
 * @name _createArmorPath
 * @memberof OggDudeDataImporter
 */
async function _createArmorPath() {
    // Verify that the path is valid and exists on the server and create it if it does not
    const imgPath = _buildImgArmorWorldPath();
    if (await _checkPathExists(imgPath)) {
        console.log(`Path ${imgPath} exists !`);
    } else {
        console.warn(`Path ${imgPath} does not exist ! Let's create it.`);
        await _createPath(imgPath);
    }
    return imgPath;
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */
/**
 * Upload an image to the server. If the image is uploaded, return the path of the image.
 * @param path {string} The path of the image.
 * @param file {File} The image file.
 * @returns {Promise<string>} The path of the image.
 * @async
 * @private
 * @function
 * @name _uploadImage
 * @memberof OggDudeDataImporter
 */
async function _uploadImage(path, file) {
    return await FilePicker.upload("data", path, file, {}, {notify: false});
}

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
        const imgFile = new File([imgData], armorImage.name, {type: armorImage.type});
        console.log(`Image to be stored ${imgPath}/`, imgFile);
        const result = await _uploadImage(imgPath, imgFile)
        console.log(`Image ${imgFile.name} has been uploaded ?`, result);
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
 * Create the Armor folder in the FoundryVTT Item tab.
 * If the folder does not exist, create it.
 * @returns {Promise<Folder>} The Armor folder.
 * @async
 * @private
 * @function
 * @name _createArmorFoundryFolder
 * @memberof OggDudeDataImporter
 */
async function _createArmorFoundryFolder() {
    // Create the folder
    let folder = game.folders.find(f => f.name === 'Swes Armors' && f.type === 'Item');
    if (!folder) {
        folder = await Folder.create({name: 'Swes Armors', type: 'Item', parent: null});
    }
    return folder;
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */

/**
 * Parse the Armor XML data to JSON. The XML data is parsed using the xml2js library.
 * @param armorData {string} The Armor XML data.
 * @returns {Promise<*>} The Armor JSON data.
 * @async
 * @private
 * @function
 * @name _parseArmorXmlToJson
 * @memberof OggDudeDataImporter
 */
async function _parseArmorXmlToJson(armorData) {
    // Parse the Armor XML data
    const armorDataXml = await xml2js.js.parseStringPromise(armorData, {
        explicitArray: false,
        trim: true,
        mergeAttrs: true
    });
    console.log("Armor Data XML:", armorDataXml);
    return armorDataXml;
}

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
        console.error(`Value ${label} is mandatory !`);
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
        console.error(`Value ${label} is mandatory !`);
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
    const imgArmorWorldPath = _buildImgArmorWorldPath();
    const armorImage = `${imgArmorWorldPath}/Armor${armorKey}.png`;
    console.log(`Armor image ${armorImage} for armor ${armorKey} to be checked.`);
    const found = await _checkPathExists(armorImage);
    if (found) {
        console.log(`Armor image ${armorImage} for armor ${armorKey} found. Using specific armor image.`);
        return armorImage;
    } else {
        const imgArmorSystemPath = _buildImgItemSystemPath();
        const armorImage = `${imgArmorSystemPath}/armor.svg`;
        console.log(`Armor image ${armorImage} for armor ${armorKey} not found. Using default armor image.`)
        return armorImage;
    }
}

/**
 * Process the Armor data from the imported file. The process is as follows:
 * 1. Load the zip file
 * 2. Load the data elements from the zip
 * 3. Group the data elements by directory
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

    // Step 3: Group the data elements by directory
    let groupByDirectory = OggDudeDataElement.groupByDirectory(allDataElements);

    // Step 4: Get the Armor file from the Data directory
    const armorFile = OggDudeDataElement.getElementsFrom(groupByDirectory, "Data", "Armor.xml");

    // Step 5: Get the Armor data from the Armor file
    const armorData = await zip.files[armorFile.fullPath].async('text');

    // Step 6: Create the folder in the Item tab
    const imgPath = await _createArmorPath();

    // Step 7: Upload the images to the server
    let groupByType = OggDudeDataElement.groupByType(allDataElements);
    console.log("Group By Type:", groupByType);
    const images = groupByType.image;
    console.log("All Images:", images);
    await _uploadImagesOnTheServer(images, zip, imgPath);

    // Step 8: Parse the XML data
    const armorDataXml = await _parseArmorXmlToJson(armorData);

    // Step 9: Create the folder
    let folder = await _createArmorFoundryFolder();

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
