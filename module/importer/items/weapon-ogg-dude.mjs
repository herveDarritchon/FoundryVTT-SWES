import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";

/**
 * Weapon Array Mapper : Map the Weapon XML data to the Swes Weapon object array.
 * @param weapons {Array} The Weapons data from the XML file.
 * @returns {Array} The Swes Weapon object array.
 * @public
 * @function
 * @name weaponMapper
 */
export function weaponMapper(weapons) {
    return weapons.map((xmlWeapon) => {
            return {
                key: OggDudeImporter.mapMandatoryString("weapon.Key", xmlWeapon.Key),
                name: OggDudeImporter.mapMandatoryString("weapon.Name", xmlWeapon.Name),
                description: OggDudeImporter.mapMandatoryString("weapon.Description", xmlWeapon.Description),
                restricted: OggDudeImporter.mapOptionalBoolean(xmlWeapon.Restricted),
                sources: OggDudeImporter.mapOptionalArray(
                    xmlWeapon?.Sources?.Source,
                    (source) => {
                        return {description: source._, page: source.Page}
                    }),
                price: OggDudeImporter.mapMandatoryNumber("weapon.Price", xmlWeapon.Price),
                encumbrance: OggDudeImporter.mapMandatoryNumber("weapon.Encumbrance", xmlWeapon.Encumbrance),
                hp: OggDudeImporter.mapMandatoryNumber("weapon.HP", xmlWeapon.HP),
                rarity: OggDudeImporter.mapMandatoryNumber("weapon.Rarity", xmlWeapon.Rarity),
                type: OggDudeImporter.mapMandatoryString("weapon.Type", xmlWeapon.Type),
                categories: OggDudeImporter.mapOptionalArray(xmlWeapon?.Categories?.Category, (category) => category),
                eraPricing: OggDudeImporter.mapOptionalArray(xmlWeapon?.EraPricing?.Era, (eraPrice) => {
                    return {
                        name: OggDudeImporter.mapMandatoryString("armor.EraPrice.Name", eraPrice.Name),
                        price: OggDudeImporter.mapMandatoryString("armor.EraPrice.Price", eraPrice.Price),
                        rarity: OggDudeImporter.mapMandatoryString("armor.EraPrice.Rarity", eraPrice.Rarity),
                        restricted: OggDudeImporter.mapMandatoryBoolean("armor.EraPrice.Restricted", eraPrice.Restricted)
                    }
                }),

                skillKey: OggDudeImporter.mapMandatoryString("weapon.SkillKey", xmlWeapon.SkillKey),
                damage: OggDudeImporter.mapMandatoryNumber("weapon.Damage", xmlWeapon.Damage),
                damageAdd: OggDudeImporter.mapMandatoryNumber("weapon.DamageAdd", xmlWeapon.DamageAdd),
                crit: OggDudeImporter.mapMandatoryNumber("weapon.Crit", xmlWeapon.Crit),
                sizeLow: OggDudeImporter.mapMandatoryNumber("weapon.SizeLow", xmlWeapon.SizeLow),
                sizeHigh: OggDudeImporter.mapMandatoryNumber("weapon.SizeHigh", xmlWeapon.SizeHigh),
                attachCostMult: OggDudeImporter.mapMandatoryNumber("weapon.AttachCostMult", xmlWeapon.AttachCostMult),
                range: OggDudeImporter.mapOptionalString(xmlWeapon.Range),
                noMelee: OggDudeImporter.mapOptionalBoolean(xmlWeapon.NoMelee),
                scale: OggDudeImporter.mapOptionalString( xmlWeapon.Scale),
                hands: OggDudeImporter.mapOptionalString( xmlWeapon.Hands),
                ordnance: OggDudeImporter.mapOptionalBoolean(xmlWeapon.Ordnance),
                vehicleNoReplace: OggDudeImporter.mapOptionalBoolean(xmlWeapon.VehicleNoReplace),
                rangeValue: OggDudeImporter.mapOptionalString(xmlWeapon?.RangeValue),
                qualities: OggDudeImporter.mapOptionalArray(
                    xmlWeapon?.Qualities?.Quality,
                    (quality) => {
                        return {
                            key: OggDudeImporter.mapMandatoryString("weapon.Characteristic.Quality.Key", quality.Key),
                            count: OggDudeImporter.mapOptionalNumber(quality.Count),
                        }
                    }),
                mods: OggDudeImporter.mapOptionalArray(
                    xmlWeapon?.BaseMods?.Mod,
                    (mod) => {
                        return {
                            key: OggDudeImporter.mapOptionalString(mod.Key),
                            miscDesc: OggDudeImporter.mapOptionalString(mod.MiscDesc),
                            count: OggDudeImporter.mapOptionalNumber(mod.Count),
                            index: OggDudeImporter.mapOptionalNumber(mod.Index),
                            defZone: OggDudeImporter.mapOptionalString(mod.DefZone),
                            dieModifiers: OggDudeImporter.mapOptionalArray(
                                mod?.DieModifiers?.DieModifier,
                                (dieModifier) => {
                                    return {
                                        skillKey: OggDudeImporter.mapOptionalString(dieModifier.SkillKey),
                                        boosCount: OggDudeImporter.mapOptionalNumber(dieModifier.BoosCount)
                                    }
                                }
                            )
                        }
                    }
                ),
                weaponModifiers: {
                    unarmed: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.Unarmed", xmlWeapon?.WeaponModifiers?.WeaponModifier?.Unarmed),
                    unarmedName: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.UnarmedName", xmlWeapon?.WeaponModifiers?.WeaponModifier?.UnarmedName),
                    skillKey: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.SkillKey", xmlWeapon?.WeaponModifiers?.WeaponModifier?.SkillKey),
                    allSkillKey: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.AllSkillKey", xmlWeapon?.WeaponModifiers?.WeaponModifier?.AllSkillKey),
                    damage: OggDudeImporter.mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Damage),
                    damageAdd: OggDudeImporter.mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.DamageAdd),
                    crit: OggDudeImporter.mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Crit),
                    critSub: OggDudeImporter.mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.CritSub),
                    rangeValue: OggDudeImporter.mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.RangeValue),
                    qualities: OggDudeImporter.mapOptionalArray(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Qualities?.Quality, (quality) => {
                        return {
                            key: OggDudeImporter.mapMandatoryString("gear.WeaponModifier.Quality.Key", quality.Key),
                            count: OggDudeImporter.mapMandatoryNumber("gear.WeaponModifier.Quality.Count", quality.Count)
                        }
                    }),
                }
            }
        }
    );
}

/**
 * Create the Weapon Context for the OggDude Data Importer.
 * @param zip
 * @param groupByDirectory
 * @param groupByType
 * @returns {{zip: {elementFileName: string, directories, content}, image: {images: (string|((buffer: Buffer, options?: ansiEscapes.ImageOptions) => string)|number|[OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|OggDudeContextImage|*), criteria: string, systemPath: string, worldPath: string}, folder: {name: string, type: string}, element: {jsonCriteria: string, mapper: *, type: string}}}
 * @public
 * @function
 */
export function buildWeaponContext(zip, groupByDirectory, groupByType) {
    return {
        zip: {
            elementFileName: "Weapons.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Weapon",
            worldPath: buildArmorImgWorldPath("weapons"),
            systemPath: buildItemImgSystemPath("weapon.svg"),
            images: groupByType.image
        },
        folder: {
            name: 'Swes - Weapons',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Weapons.Weapon',
            mapper: weaponMapper,
            type: 'weapon'
        }
    };
}
