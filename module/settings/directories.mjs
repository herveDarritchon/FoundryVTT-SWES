/**
 * Build the path to the armor images.
 * @param imageFileName {string} The name of the image file.
 * @returns {string} The path to the armor images.
 * @public
 * @function
 * @name OggDudeDataImporter._buildItemImgSystemPath
 * @memberof OggDudeDataImporter
 */
export function buildItemImgSystemPath(imageFileName) {
    return `systems/${game.system.id}/assets/images/icons/${imageFileName}`;
}

/**
 * Build the path to the images.
 * @param type {string} The type of the images.
 * @returns {string} The path to the images.
 * @public
 * @function
 * @name _buildArmorImgWorldPath
 * @memberof OggDudeDataImporter
 */
export function buildArmorImgWorldPath(type) {
    return `worlds/${game.world.id}/swes-assets/images/${type}`;
}