import OggDudeDataElement from "../settings/models/OggDudeDataElement.mjs";
import {buildGearContext} from "./items/gear-ogg-dude.mjs";
import {buildArmorContext} from "./items/armor-ogg-dude.mjs";
import {buildWeaponContext} from "./items/weapon-ogg-dude.mjs";

export default class OggDudeImporter {

    /**
     * Map a String value, if it is not present, return an empty string.
     * @param label {string} The label of the element.
     * @param value {string} The value of the element.
     * @returns {string} The mapped value of the element.
     * @public
     * @function
     * @name mapMandatoryString
     */
    static mapMandatoryString(label, value) {
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
     * @public
     * @function
     * @name mapOptionalString
     */
    static mapOptionalString(value) {
        return typeof value === "string" ? value : "";
    }

    /**
     * Map a String value to a Number, if it is not present, return 0.
     * @param label {string} The label of the element.
     * @param value {string} The value of the element.
     * @returns {number} The mapped value of the element.
     * @public
     * @function
     * @name mapMandatoryNumber
     */
    static mapMandatoryNumber(label, value) {
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
     * @public
     * @function
     * @name mapOptionalNumber
     */
    static mapOptionalNumber(value) {
        return parseInt(value) || 0;
    }

    /**
     * Map a Boolean value, if it is not present, return false.
     * @param label {string} The label of the element.
     * @param value {string} The value of the element.
     * @returns {boolean} The mapped value of the element.
     * @public
     * @function
     * @name mapMandatoryBoolean
     */
    static mapMandatoryBoolean(label, value) {
        if (value == null || typeof value !== "string") {
            console.warn(`Value ${label} is mandatory !`);
            return false;
        }
        return (value === 'true');
    }

    /**
     *  Map a Boolean value, if it is not present, return false.
     * @param value {string} The value of the element.
     * @returns {boolean} The mapped value of the element.
     * @public
     * @function
     * @name mapOptionalBoolean
     */
    static mapOptionalBoolean(value) {
        return (value === 'true');
    }

    /**
     * Map an optional array value, if it is not present, return an empty array.
     * @param value {Array} The value of the element.
     * @param mapper {function} The function to map the value.
     * @returns {*[]} The mapped value of the element as an array.
     * @public
     * @function
     * @name mapOptionalArray
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
     * Process the Armor data from the imported file. The process is as follows:
     * 1. Load the zip file
     * 2. Load the data elements from the zip
     * 3.1 Group the data elements by type
     * 3.2 Group the data elements by directory
     * 4.1 Get the Armor file from the Data directory
     * 4.2 Get the Weapon file from the Data directory
     * 4.3 Get the Gear file from the Data directory
     * @param importedFile {File} The imported file.
     * @returns {Promise<void>} A Promise that resolves when the Armor data has been processed.
     * @async
     * @public
     * @function
     * @name _processOggDudeData
     */
    static async processOggDudeData(importedFile) {

        /* --------------------------------------------- GÉNÉRIQUE ------------------------------------------------------------------- */

        // Step 1: Load the zip file
        const zip = await new OggDudeImporter().load(importedFile);

        // Step 2: Load the data elements from the zip
        let allDataElements = OggDudeDataElement.from(zip);

        // Step 3.1: Group the data elements by directory
        let groupByDirectory = OggDudeDataElement.groupByDirectory(allDataElements);
        console.debug("Group By Directory:", groupByDirectory);

        // Step 3.2: Group the data elements by type
        let groupByType = OggDudeDataElement.groupByType(allDataElements);
        console.debug("Group By Type:", groupByType);

        /* --------------------------------------------- SPÉCIFIQUE ------------------------------------------------------------------- */

        // Step 4.1: Get the Armor file from the Data directory
        await OggDudeDataElement.processElements(buildArmorContext(zip, groupByDirectory, groupByType));

        // Step 4.2: Get the Weapon file from the Data directory
        await OggDudeDataElement.processElements(buildWeaponContext(zip, groupByDirectory, groupByType));

        // Step 4.3: Get the Gear file from the Data directory
        await OggDudeDataElement.processElements(buildGearContext(zip, groupByDirectory, groupByType));

        /* ------------------------------------------------------------------------------------------------------------------------------------ */

    }

    /**
     * @param file : File (Zip file path) from OGGDude https://www.swrpgcommunity.com/gm-resources/apps-dice-utilities/oggdudes-generator
     * @returns {Promise<{[p: string]: JSZip.JSZipObject}>}
     */
    async load(file) {
        return JSZip.loadAsync(file);
    }

    /* -------------------------------------------- */

}