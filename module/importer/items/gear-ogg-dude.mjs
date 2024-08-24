import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";
import {buildMod, buildWeaponModifiers} from "./combat-item-mapper.mjs";

/**
 * Gear Array Mapper : Map the Gear XML data to the SwesGear object array.
 * @param gears {Array} The Gears data from the XML file.
 * @returns {Array} The Gear object array.
 * @public
 * @function
 * @name gearMapper
 */
export function gearMapper(gears) {
    return gears.map((xmlGear) => {
        return {
            name: OggDudeImporter.mapMandatoryString("gear.Name", xmlGear.Name),
            key: OggDudeImporter.mapMandatoryString("gear.Key", xmlGear.Key),
            short: OggDudeImporter.mapOptionalString(xmlGear.Short),
            description: OggDudeImporter.mapMandatoryString("gear.Description", xmlGear.Description),
            encumbrance: OggDudeImporter.mapOptionalNumber(xmlGear.Encumbrance),
            price: OggDudeImporter.mapOptionalNumber(xmlGear.Price),
            rarity: OggDudeImporter.mapOptionalNumber(xmlGear.Rarity),
            HP: OggDudeImporter.mapOptionalNumber(xmlGear.HP),
            restricted: OggDudeImporter.mapOptionalBoolean(xmlGear.Restricted),
            type: OggDudeImporter.mapMandatoryString("gear.Type", xmlGear.Type),
            sources: OggDudeImporter.mapOptionalArray(
                xmlGear?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: OggDudeImporter.mapOptionalArray(xmlGear?.Categories?.Category, (category) => category),

            mods: OggDudeImporter.mapOptionalArray(
                xmlGear?.BaseMods?.Mod,
                (mod) => {
                    return buildMod(mod)
                }
            ),

            weaponModifiers: OggDudeImporter.mapOptionalArray(xmlGear?.WeaponModifiers?.WeaponModifier, (weaponModifier) => buildWeaponModifiers(weaponModifier)),

            eraPricing: OggDudeImporter.mapOptionalArray(xmlGear?.EraPricing?.Era, (eraPrice) => {
                return {
                    name: OggDudeImporter.mapMandatoryString("gear.EraPrice.Name", eraPrice.Name),
                    price: OggDudeImporter.mapMandatoryString("gear.EraPrice.Price", eraPrice.Price),
                    rarity: OggDudeImporter.mapMandatoryString("gear.EraPrice.Rarity", eraPrice.Rarity),
                    restricted: OggDudeImporter.mapMandatoryBoolean("gear.EraPrice.Restricted", eraPrice.Restricted)
                }
            })

        }
    });
}

/**
 * Build the Gear context for the importer process.
 * @param zip
 * @param groupByDirectory
 * @param groupByType
 * @returns {{zip: {elementFileName: string, directories, content}, image: {images: (string|((buffer: Buffer, options?: ansiEscapes.ImageOptions) => string)|number|[OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|OggDudeContextImage|*), criteria: string, systemPath: string, worldPath: string}, folder: {name: string, type: string}, element: {jsonCriteria: string, mapper: *, type: string}}}
 * @public
 * @function
 */
export function buildGearContext(zip, groupByDirectory, groupByType) {
    return {
        zip: {
            elementFileName: "Gear.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Gear",
            worldPath: buildArmorImgWorldPath("gears"),
            systemPath: buildItemImgSystemPath("gear.svg"),
            images: groupByType.image
        },
        folder: {
            name: 'Swes - Gears',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Gears.Gear',
            mapper: gearMapper,
            type: 'gear'
        }
    };
}
