/**
 * @typedef {object} ZipEntry
 * @property {null|string} comment
 * @property {object} date
 * @property {boolean} dir
 * @property {null|number} dosPermissions
 * @property {string} name
 * @property {object} options
 * @property {null|number} unixPermissions
 * @property {string} unsafeOriginalName
 * @property {number} uncompressedSize
 * @property {object} _data
 * @property {boolean} _dataBinary
 /**

 * Represents a file in the OggDude data zip
 */
class OggDudeDataElement {
    /**
     * The allowed image extensions
     * @type {string[]}
     * @private
     */
    static ALLOWED_IMAGE_EXTENSIONS = ["webp", "jpg", "jpeg", "png", "gif"];

    /**
     * The type of image file
     * @type {string}
     */
    static image = "image";

    /**
     * The type of xml file
     * @type {string}
     */
    static xml = "xml";

    /**
     * The type of directory
     * @type {string}
     */
    static directory = "directory";

    /**
     *
     * @param {ZipEntry} zipEntry Object the zip entry object
     */
    constructor(zipEntry = {}) {
        /**
         * The name of the file
         * @type {string}
         * @private
         */
        this._name = this._getFileName(zipEntry.name, zipEntry.dir);

        /**
         * The relative path of the file in the zip without the filename
         * @type {string}
         * @private
         */
        this._relativePath = this._getRelativePath(zipEntry.name, zipEntry.dir);

        /**
         * The type of the file (directory or image or xml file)
         * @type {string}
         * @private
         */
        this._type = this.__getElementType(zipEntry.name, zipEntry.dir);

        /**
         * The full path of the file in the zip, including the filename.
         * @type {string}
         * @private
         */
        this._fullPath = zipEntry.name;
    }

    /**
     * Returns true if the element is a directory
     * @returns {boolean}
     */
    isDir = () => (this._type === OggDudeDataElement.directory);

    /**
     * Returns true if the element is an image
     * @returns {boolean}
     */
    isImage = () => (this._type === OggDudeDataElement.image);

    /**
     * Returns true if the element is a xml file
     * @returns {boolean}
     */
    isXml = () => (this._type === OggDudeDataElement.xml);

    /**
     * Returns the name of the file
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Returns the relative path of the file in the zip without the filename
     * @returns {string}
     */
    get relativePath() {
        return this._relativePath;
    }

    /**
     * Returns the full path of the file in the zip, including the filename.
     * @returns {string}
     */
    get fullPath() {
        return this._fullPath;
    }

    /**
     * Returns the list of OggDudeDataElement from the zip
     * @param {{[p: string]: JSZip.JSZipObject}} zip
     * @returns {OggDudeDataElement[]}
     */
    static from(zip) {
        return Object.values(zip.files).map((zipEntry) => {
            return new OggDudeDataElement(zipEntry);
        });
    };


    /**
     * Group OggDudeDataElement by type
     * @param {OggDudeDataElement[]} elements
     * @returns {object} An object where the keys are the types and the values are arrays of elements of that type
     */
    static groupByType(elements) {
       return elements.reduce((grouped, element) => {
            const key = element._type;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(element);
            return grouped;
        }, {});
    }

    /**
     * Group OggDudeDataElement by type
     * @param {OggDudeDataElement[]} elements
     * @returns {object} An object where the keys are the types and the values are arrays of elements of that type
     */
    static groupByDirectory(elements) {
        return elements
            .filter((element) => element._type !== OggDudeDataElement.directory)
            .reduce((grouped, element) => {
            const key = element._relativePath;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(element);
            return grouped;
        }, {});
    }

    static getElementsFrom(directories, path, name) {
        const directory = directories[path] || [];
        return directory.find((element) => element.name === name);
    }

    /**
     * Returns the filename with the extension and without the path
     * @param {string} fileName the name of the file
     * @param {boolean} dir if the type of the file is a directory
     * @returns {string} the filename with the extension
     * @private
     */
    _getFileName = (fileName, dir) => dir ? "" : new URL("file://" + fileName).pathname.split("/").pop();

    /**
     * Returns the relative path of the file in the zip without the filename
     * @param {string} fileName the name of the file
     * @param {boolean} dir if the type of the file is a directory
     * @returns {string} the relative path of the file in the zip
     * @private
     */
    _getRelativePath = (fileName, dir) => dir ? fileName : fileName.substring(0, fileName.lastIndexOf("/"));

    /**
     *  Returns the type of the file (directory or image or xml file)
     * @param {boolean} dir if the type of the file is a directory
     * @param {string} filename
     * @returns {string} the type of the file (directory or image or xml file)
     * @private
     */
    __getElementType = (filename, dir) => dir ? "directory" : this._getFileType(filename);

    /**
     * Returns the file type of the file (image or xml)
     * @param {string} filename
     * @returns {string}
     * @private
     */
    _getFileType = (filename) => {
        const extension = filename.split(".").pop();
        if (OggDudeDataElement.ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
            return OggDudeDataElement.image;
        } else if (extension === OggDudeDataElement.xml) {
            return OggDudeDataElement.xml;
        }
    }
}

export default OggDudeDataElement;