/**
 * Parse a XML data string to JSON string.
 * @module module/utils/xml/parser
 * @requires xml2js
 * @param data {string} The data to parse from XML to JSON.
 * @returns {Promise<string>} The data parsed from XML to JSON.
 * @public
 * @function
 * @name _parseXmlToJson
 */
export async function parseXmlToJson(data) {
    // xmlData {string} The data to parse in a XML format.
    const xmlData = await xml2js.js.parseStringPromise(data, {
        explicitArray: false,
        trim: true,
        mergeAttrs: true
    });
    console.debug("Data XML:", xmlData);
    return xmlData;
}