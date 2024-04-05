export default class OggDudeImporter {

    /**
     * @param file : File (Zip file path) from OGGDude https://www.swrpgcommunity.com/gm-resources/apps-dice-utilities/oggdudes-generator
     * @returns {Promise<{[p: string]: JSZip.JSZipObject}>}
     */
    async load(file) {
        let zip = JSZip.loadAsync(file)
        return zip;
    }
    /* -------------------------------------------- */

}