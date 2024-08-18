import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";

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
            name: OggDudeImporter.mapMandatoryString("armor.Name", xmlArmor.Name),
            key: OggDudeImporter.mapMandatoryString("armor.Key", xmlArmor.Key),
            description: OggDudeImporter.mapMandatoryString("armor.Description", xmlArmor.Description),
            soak: OggDudeImporter.mapOptionalNumber( xmlArmor.Soak),
            defense: OggDudeImporter.mapOptionalNumber( xmlArmor.Defense),
            encumbrance: OggDudeImporter.mapOptionalNumber( xmlArmor.Encumbrance),
            price: OggDudeImporter.mapMandatoryNumber("armor.Price", xmlArmor.Price),
            rarity: OggDudeImporter.mapMandatoryNumber("armor.Rarity", xmlArmor.Rarity),
            HP: OggDudeImporter.mapOptionalNumber( xmlArmor.HP),
            restricted: OggDudeImporter.mapOptionalBoolean(xmlArmor.Restricted),
            type: OggDudeImporter.mapOptionalString(xmlArmor.Type),
            sources: OggDudeImporter.mapOptionalArray(
                xmlArmor?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: OggDudeImporter.mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),
            mods: OggDudeImporter.mapOptionalArray(xmlArmor?.BaseMods?.Mod, (mod) => {
                return {
                    miscDesc: OggDudeImporter.mapOptionalString( mod.MiscDesc),
                    key: OggDudeImporter.mapOptionalString( mod.Key),
                    count: OggDudeImporter.mapOptionalNumber( mod.Count),
                    index: OggDudeImporter.mapOptionalNumber( mod.Index),
                    dieModifiers: OggDudeImporter.mapOptionalArray(mod?.DieModifiers?.DieModifier, (dieModifier) => {
                        return {
                            skillKey: OggDudeImporter.mapOptionalString( dieModifier.SkillKey),
                            skillType: OggDudeImporter.mapOptionalString(dieModifier.SkillType),
                            skillChar: OggDudeImporter.mapOptionalString(dieModifier.SkillChar),
                            addSetBackCount: OggDudeImporter.mapOptionalNumber(dieModifier.AddSetBackCount),
                            advantageCount: OggDudeImporter.mapOptionalNumber(dieModifier.AdvantageCount),
                            boostCount: OggDudeImporter.mapOptionalNumber(dieModifier.BoostCount),
                            setbackCount: OggDudeImporter.mapOptionalNumber(dieModifier.SetbackCount),
                            successCount: OggDudeImporter.mapOptionalNumber(dieModifier.SuccessCount),
                            threatCount: OggDudeImporter.mapOptionalNumber(dieModifier.ThreatCount),
                            upgradeAbilityCount: OggDudeImporter.mapOptionalNumber(dieModifier.UpgradeAbilityCount),
                            upgradeDifficultyCount: OggDudeImporter.mapOptionalNumber(dieModifier.UpgradeDifficultyCount)
                        }
                    }),
                }
            }),
            weaponModifiers: {
                unarmed: OggDudeImporter.mapOptionalString(xmlArmor?.WeaponModifiers?.WeaponModifier?.Unarmed),
                unarmedName: OggDudeImporter.mapOptionalString(xmlArmor?.WeaponModifiers?.WeaponModifier?.UnarmedName),
                skillKey: OggDudeImporter.mapOptionalString(xmlArmor?.WeaponModifiers?.WeaponModifier?.SkillKey),
                allSkillKey: OggDudeImporter.mapOptionalString(xmlArmor?.WeaponModifiers?.WeaponModifier?.AllSkillKey),
                damage: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.Damage),
                damageAdd: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.DamageAdd),
                crit: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.Crit),
                critSub: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.CritSub),
                rangeValue: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.RangeValue),
                qualities: OggDudeImporter.mapOptionalArray(xmlArmor?.WeaponModifiers?.WeaponModifier?.Qualities?.Quality, (quality) => {
                    return {
                        key: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.Quality.Key", quality.Key),
                        count: OggDudeImporter.mapOptionalNumber(quality.Count)
                    }
                }),
            },
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
export function buildArmorContext(zip, groupByDirectory, groupByType) {
    return {
        zip: {
            elementFileName: "Armor.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Armor",
            worldPath: buildArmorImgWorldPath("armors"),
            systemPath: buildItemImgSystemPath("armor.svg"),
            images: groupByType.image
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
