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
            soak: OggDudeImporter.mapMandatoryNumber("armor.Soak", xmlArmor.Soak),
            defense: OggDudeImporter.mapMandatoryNumber("armor.Defense", xmlArmor.Defense),
            encumbrance: OggDudeImporter.mapMandatoryNumber("armor.Encumbrance", xmlArmor.Encumbrance),
            price: OggDudeImporter.mapMandatoryNumber("armor.Price", xmlArmor.Price),
            rarity: OggDudeImporter.mapMandatoryNumber("armor.Rarity", xmlArmor.Rarity),
            HP: OggDudeImporter.mapMandatoryNumber("armor.HP", xmlArmor.HP),
            restricted: OggDudeImporter.mapOptionalBoolean(xmlArmor.Restricted),
            type: OggDudeImporter.mapMandatoryString("armor.Type", xmlArmor.Type),
            sources: OggDudeImporter.mapOptionalArray(
                xmlArmor?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: OggDudeImporter.mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),
            mods: OggDudeImporter.mapOptionalArray(xmlArmor?.BaseMods?.Mod, (mod) => {
                return {
                    miscDesc: OggDudeImporter.mapMandatoryString("armor.Mod.MiscDesc", mod.MiscDesc),
                    key: OggDudeImporter.mapOptionalString("armor.Mod.Key", mod.Key),
                    count: OggDudeImporter.mapOptionalNumber("armor.Mod.Count", mod.Count),
                    dieModifiers: OggDudeImporter.mapOptionalArray(mod?.DieModifiers?.DieModifier, (dieModifier) => {
                        return {
                            skillKey: OggDudeImporter.mapMandatoryString("armor.Mod.Die,Modifier.SkillKey", dieModifier.SkillKey),
                            skillType: OggDudeImporter.mapMandatoryString("armor.Mod.Die,Modifier.SkillType", dieModifier.SkillType),
                            skillChar: OggDudeImporter.mapMandatoryString("armor.Mod.Die,Modifier.SkillChar", dieModifier.SkillChar),
                            addSetBackCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.AddSetBackCount", dieModifier.AddSetBackCount),
                            advantageCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.AdvantageCount", dieModifier.AdvantageCount),
                            boostCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.BoostCount", dieModifier.BoostCount),
                            setbackCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.SetbackCount", dieModifier.SetbackCount),
                            successCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.SuccessCount", dieModifier.SuccessCount),
                            threatCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.ThreatCount", dieModifier.ThreatCount),
                            upgradeAbilityCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.UpgradeAbilityCount", dieModifier.UpgradeAbilityCount),
                            upgradeDifficultyCount: OggDudeImporter.mapMandatoryNumber("armor.Mod.Die,Modifier.UpgradeDifficultyCount", dieModifier.UpgradeDifficultyCount)
                        }
                    }),
                }
            }),
            weaponModifiers: {
                unarmed: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.Unarmed", xmlArmor?.WeaponModifiers?.WeaponModifier?.Unarmed),
                unarmedName: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.UnarmedName", xmlArmor?.WeaponModifiers?.WeaponModifier?.UnarmedName),
                skillKey: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.SkillKey", xmlArmor?.WeaponModifiers?.WeaponModifier?.SkillKey),
                allSkillKey: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.AllSkillKey", xmlArmor?.WeaponModifiers?.WeaponModifier?.AllSkillKey),
                damage: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.Damage),
                damageAdd: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.DamageAdd),
                crit: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.Crit),
                critSub: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.CritSub),
                rangeValue: OggDudeImporter.mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.RangeValue),
                qualities: OggDudeImporter.mapOptionalArray(xmlArmor?.WeaponModifiers?.WeaponModifier?.Qualities?.Quality, (quality) => {
                    return {
                        key: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.Quality.Key", quality.Key),
                        count: OggDudeImporter.mapMandatoryNumber("armor.WeaponModifier.Quality.Count", quality.Count)
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
export  function buildArmorContext(zip, groupByDirectory, groupByType) {
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
