import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";
import {buildMod, buildWeaponModifiers} from "./combat-item-mapper.mjs";
import OggDudeDataElement from "../../settings/models/OggDudeDataElement.mjs";

/**
 * Armor Array Mapper : Map the Armor XML data to the SwesArmor object array.
 * @param armors {Array} The Armors data from the XML file.
 * @returns {Array} The SwesArmor object array.
 * @public
 * @function
 * @name armorMapper
 */
export function armorMapper(armors) {
    return armors.map((xmlArmor) => {
        return {
            soak: OggDudeImporter.mapOptionalNumber(xmlArmor.Soak),
            defense: OggDudeImporter.mapOptionalNumber(xmlArmor.Defense),

            // FIXME il faudrait refactorer tout ça pour ne pas avoir de duplication avec les autres combat-item
            name: OggDudeImporter.mapMandatoryString("armor.Name", xmlArmor.Name),
            key: OggDudeImporter.mapMandatoryString("armor.Key", xmlArmor.Key),
            description: OggDudeImporter.mapMandatoryString("armor.Description", xmlArmor.Description),
            restricted: OggDudeImporter.mapOptionalBoolean(xmlArmor.Restricted),
            encumbrance: OggDudeImporter.mapOptionalNumber(xmlArmor.Encumbrance),
            price: OggDudeImporter.mapMandatoryNumber("armor.Price", xmlArmor.Price),
            rarity: OggDudeImporter.mapMandatoryNumber("armor.Rarity", xmlArmor.Rarity),
            hp: OggDudeImporter.mapOptionalNumber(xmlArmor.HP),
            type: OggDudeImporter.mapOptionalString(xmlArmor.Type),

            sources: OggDudeImporter.mapOptionalArray(
                xmlArmor?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),

            categories: OggDudeImporter.mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),

            mods: OggDudeImporter.mapOptionalArray(
                xmlArmor?.BaseMods?.Mod,
                (mod) => buildMod(mod)),

            weaponModifiers: OggDudeImporter.mapOptionalArray(
                xmlArmor?.WeaponModifiers?.WeaponModifier,
                (weaponModifier) => buildWeaponModifiers(weaponModifier)
            ),

            eraPricing: OggDudeImporter.mapOptionalArray(xmlArmor?.EraPricing?.Era, (eraPrice) => {
                return {
                    name: OggDudeImporter.mapMandatoryString("armor.EraPrice.Name", eraPrice.Name),
                    price: OggDudeImporter.mapMandatoryString("armor.EraPrice.Price", eraPrice.Price),
                    rarity: OggDudeImporter.mapMandatoryString("armor.EraPrice.Rarity", eraPrice.Rarity),
                    restricted: OggDudeImporter.mapMandatoryBoolean("armor.EraPrice.Restricted", eraPrice.Restricted)
                }
            })

        }
    });
}

/**
 * Create the Armor Context for the OggDude Data Import
 * @param zip
 * @param groupByDirectory
 * @param groupByType
 * @returns {{zip: {elementFileName: string, directories, content}, image: {images: (string|((buffer: Buffer, options?: ansiEscapes.ImageOptions) => string)|number|[OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|OggDudeContextImage|*), criteria: string, systemPath: string, worldPath: string}, folder: {name: string, type: string}, element: {jsonCriteria: string, mapper: *, type: string}}}
 * @public
 * @function
 */
export async function buildArmorContext(zip, groupByDirectory, groupByType) {

    console.debug("Building Armor with Zip, GroupByDirectory, GroupByType", zip, groupByDirectory, groupByType);

    return {
        jsonData: await OggDudeDataElement.buildJsonDataFromFile(zip, groupByDirectory, "Armor.xml",  "Armors.Armor"),
        zip: {
            elementFileName: "Armor.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Armor",
            worldPath: buildArmorImgWorldPath("armors"),
            systemPath: buildItemImgSystemPath("armor.svg"),
            images: groupByType.image,
            prefix: 'Armor'
        },
        folder: {
            name: 'Swes - Armors',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Armors.Armor',
            mapper: armorMapper,
            type: 'armor'
        }
    };
}
