/**
 * @typedef {Object} DataFile
 * @property {Blob} data - The data of the file.
 * @property {OggDudeDataElement} element - The element of the file.
 */

/* ------------------------------------------------------------------------------------------------------------------------------------ */

/**
 * Create a directory on the server. If the directory does not exist, create it.
 * @param path {string} The path to create the directory.
 * @param target {string} The target directory to create the path.
 * @returns {Promise<Directory>} The created directory.
 * @async
 * @private
 * @function
 * @name _createDirectory
 */
async function _createDirectory(path, target) {
    console.debug(`Create Path ${path} with target ${target}.`);
    return await FilePicker.createDirectory("data", path + "/" + target, {bucket: "data"});
}

/**
 * Check if the path exists on the server. If the path exists, return true, otherwise return false.
 * @param path {string} The path to check.
 * @returns {Promise<boolean>} True if the path exists, false otherwise.
 * @async
 * @private
 * @function
 * @name _checkPathExists
 */
async function _checkPathExists(path) {
    console.debug(`Check that Path ${path} exists.`);
    let result;
    try {
        result = await FilePicker.browse("data", path, {activeSource: "data", recursive: true});
    } catch (e) {
        return false;
    }
    const target = result.target;
    const isExisting = target !== null;
    console.debug(`Path ${path} with result ${target} exists ?`, isExisting);
    return isExisting;
}

/**
 * Create a path on the server by creating each directory in turn.
 * If the path does not exist, create it.
 * @param path {string} The path to create.
 * @returns {Promise<void>} A Promise that resolves when the path has been created.
 * @async
 * @public
 * @function
 * @name _createPath
 */
async function _createPath(path) {
    console.debug(`Create Path ${path} if necessary.`);
    let pathParts = path.split('/');
    let currentPath = '';
    let fullPath = '';

    for (let part of pathParts) {
        fullPath += part + '/';
        const found = await _checkPathExists(fullPath);
        console.debug(`Sub-path ${fullPath} exists ?`, found);
        if (!found) {
            console.debug(`Sub-path ${fullPath} does not exist. Let's create it. CurrentPath ${currentPath} with part ${part}.`)
            const result = await _createDirectory(currentPath, part);
            console.debug(`Sub-path ${fullPath} created !`, result);
        }
        currentPath = fullPath;
    }
}

/* ------------------------------------------------------------------------------------------------------------------------------------ */

/**
 * Check if the file exists on the server. If the file exists, return true, otherwise return false.
 * @param file {string} The file to check.
 * @returns {Promise<boolean>} True if the file exists, false otherwise.
 * @async
 * @public
 * @function
 * @name checkFileExists
 */
export async function checkFileExists(file) {
    return _checkPathExists(file);
}

/**
 * Create a path on the server if it does not exist. If the path exists, do nothing.
 * @param path {string} The path to create.
 * @returns {Promise<string>} A Promise that resolves when the path has been created.
 * @async
 * @public
 * @function
 * @name createPathIfNeccessary
 */
export async function createPathIfNeccessary(path) {
    if (await _checkPathExists(path)) {
        console.debug(`Path ${path} exists on the server !`);
    } else {
        console.warn(`Path ${path} does not exist on the server ! Let's create it.`);
        await _createPath(path);
    }
    return path;
}

/**
 * Upload a file to the server. If the file is uploaded, return the path of the file.
 * @param path {string} The path of the file.
 * @param file {File} The file.
 * @returns {Promise<string>} The path of the file.
 * @async
 * @private
 * @function
 * @name uploadFile
 */
export async function uploadFile(path, file) {
    return await FilePicker.upload("data", path, file, {}, {notify: false});
}

/**
 * Upload a file to the server. If the file is uploaded, return the path of the file. If the file is not uploaded, return null.
 * @param dataFile {DataFile} The data of the file.
 * @param path {string} The path of the file.
 * @returns {Promise<string|null>} The path of the file.
 * @async
 * @public
 * @function
 * @name uploadFileOnTheServer
 */
export async function uploadFileOnTheServer(dataFile, path) {
        const file = new File([dataFile.data], dataFile.element.name, {type: dataFile.element.getMimeType()});
        console.debug(`Image to be stored ${path}/`, file);
        const result = await uploadFile(path, file)
        console.debug(`Image ${file.name} has been uploaded ?`, result);
}