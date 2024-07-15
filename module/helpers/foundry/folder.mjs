/**
    * Create a folder in the Foundry VTT sidebar
 * @param name {string} The name of the folder to create.
 * @param type {string} The type of the folder to create.
 * @returns {Promise<Folder>} The created folder.
 * @async
 * @public
 * @function
 * @name createFoundryFolder
 */
export async function createFoundryFolder(name, type) {
    // Create the folder
    let folder = game.folders.find(f => f.name === name && f.type === type);
    if (!folder) {
        folder = await Folder.create({name, type, parent: null});
    }
    return folder;
}