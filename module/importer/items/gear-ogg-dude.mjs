import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";

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
            short: OggDudeImporter.mapMandatoryString("gear.Short", xmlGear.Short),
            description: OggDudeImporter.mapMandatoryString("gear.Description", xmlGear.Description),
            encumbrance: OggDudeImporter.mapMandatoryNumber("gear.Encumbrance", xmlGear.Encumbrance),
            price: OggDudeImporter.mapMandatoryNumber("gear.Price", xmlGear.Price),
            rarity: OggDudeImporter.mapMandatoryNumber("gear.Rarity", xmlGear.Rarity),
            HP: OggDudeImporter.mapMandatoryNumber("gear.HP", xmlGear.HP),
            restricted: OggDudeImporter.mapOptionalBoolean(xmlGear.Restricted),
            type: OggDudeImporter.mapMandatoryString("gear.Type", xmlGear.Type),
            sources: OggDudeImporter.mapOptionalArray(
                xmlGear?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: OggDudeImporter.mapOptionalArray(xmlGear?.Categories?.Category, (category) => category),
            weaponModifiers: {
                unarmed: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.Unarmed", xmlGear?.WeaponModifiers?.WeaponModifier?.Unarmed),
                unarmedName: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.UnarmedName", xmlGear?.WeaponModifiers?.WeaponModifier?.UnarmedName),
                skillKey: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.SkillKey", xmlGear?.WeaponModifiers?.WeaponModifier?.SkillKey),
                allSkillKey: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.AllSkillKey", xmlGear?.WeaponModifiers?.WeaponModifier?.AllSkillKey),
                damage: OggDudeImporter.mapOptionalNumber(xmlGear?.WeaponModifiers?.WeaponModifier?.Damage),
                damageAdd: OggDudeImporter.mapOptionalNumber(xmlGear?.WeaponModifiers?.WeaponModifier?.DamageAdd),
                crit: OggDudeImporter.mapOptionalNumber(xmlGear?.WeaponModifiers?.WeaponModifier?.Crit),
                critSub: OggDudeImporter.mapOptionalNumber(xmlGear?.WeaponModifiers?.WeaponModifier?.CritSub),
                rangeValue: OggDudeImporter.mapOptionalNumber(xmlGear?.WeaponModifiers?.WeaponModifier?.RangeValue),
                qualities: OggDudeImporter.mapOptionalArray(xmlGear?.WeaponModifiers?.WeaponModifier?.Qualities?.Quality, (quality) => {
                    return {
                        key: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.Quality.Key", quality.Key),
                        count: OggDudeImporter.mapMandatoryNumber("gear.WeaponModifier.Quality.Count", quality.Count)
                    }
                }),
            },
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
