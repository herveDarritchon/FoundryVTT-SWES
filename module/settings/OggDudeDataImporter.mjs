/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";
import {buildArmorImgWorldPath, buildItemImgSystemPath} from "./directories.mjs";

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
 * Armor Array Mapper : Map the Weapon XML data to the Swes Weapon object array.
 * @param weapons {Array} The Weapons data from the XML file.
 * @returns {Array} The Swes Weapon object array.
 * @private
 * @function
 * @name _weaponMapper
 * @memberof OggDudeDataImporter
 */
function _weaponMapper(weapons) {
    return weapons.map((xmlWeapon) => {
        return {
            name: _mapMandatoryString("armor.Name", xmlWeapon.Name),
            key: _mapMandatoryString("armor.Key", xmlWeapon.Key),
            description: _mapMandatoryString("armor.Description", xmlWeapon.Description),
            soak: _mapMandatoryNumber("armor.Soak", xmlWeapon.Soak),
            defense: _mapMandatoryNumber("armor.Defense", xmlWeapon.Defense),
            encumbrance: _mapMandatoryNumber("armor.Encumbrance", xmlWeapon.Encumbrance),
            price: _mapMandatoryNumber("armor.Price", xmlWeapon.Price),
            rarity: _mapMandatoryNumber("armor.Rarity", xmlWeapon.Rarity),
            HP: _mapMandatoryNumber("armor.HP", xmlWeapon.HP),
            sources: _mapOptionalArray(
                xmlWeapon?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: _mapOptionalArray(xmlWeapon?.Categories?.Category, (category) => category),
            mods: {
                miscDesc: _mapOptionalString(xmlWeapon?.BaseMods?.Mod?.MiscDesc)
            }
        }
    });
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

    /* --------------------------------------------- GÉNÉRIQUE ------------------------------------------------------------------- */

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

    /* --------------------------------------------- SPÉCIFIQUE ------------------------------------------------------------------- */

    /**
     *  Construct the Armor Item Context
     * @type {OggDudeElementContext} The Armor Context of the element to be stored
     */
    const armorContext = {
        zip: {
            elementFileName: "Armor.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Armor",
            worldPath: buildArmorImgWorldPath("armors"),
            systemPath: buildItemImgSystemPath("armor.svg"),
            images: groupByType.image
        },
        folder: {
            name: 'Swes - Armors',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Armors.Armor',
            mapper: _armorMapper,
            type: 'armor'
        }
    }

    await OggDudeDataElement.processElements(armorContext);

    /**
     *  Construct the Weapon Item Context
     * @type {OggDudeElementContext} The  Weapon Context of the element to be stored
     */
    const weaponContext = {
        zip: {
            elementFileName: "Weapon.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Weapon",
            worldPath: buildArmorImgWorldPath("weapons"),
            systemPath: buildItemImgSystemPath("weapon.svg"),
            images: groupByType.image
        },
        folder: {
            name: 'Swes - Weapons',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Weapons.Weapon',
            mapper: _weaponMapper,
            type: 'weapon'
        }
    }

    await OggDudeDataElement.processElements(weaponContext);

    /* ------------------------------------------------------------------------------------------------------------------------------------ */


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
