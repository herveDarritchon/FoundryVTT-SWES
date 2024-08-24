import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";
import {buildMod, buildWeaponModifiers} from "./combat-item-mapper.mjs";



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
                price: OggDudeImporter.mapOptionalNumber(xmlWeapon.Price),
                encumbrance: OggDudeImporter.mapOptionalNumber(xmlWeapon.Encumbrance),
                hp: OggDudeImporter.mapOptionalNumber(xmlWeapon.HP),
                rarity: OggDudeImporter.mapOptionalNumber(xmlWeapon.Rarity),
                type: OggDudeImporter.mapOptionalString(xmlWeapon.Type),
                categories: OggDudeImporter.mapOptionalArray(xmlWeapon?.Categories?.Category, (category) => category),
                eraPricing: OggDudeImporter.mapOptionalArray(xmlWeapon?.EraPricing?.Era, (eraPrice) => {
                    return {
                        name: OggDudeImporter.mapMandatoryString("armor.EraPrice.Name", eraPrice.Name),
                        price: OggDudeImporter.mapMandatoryString("armor.EraPrice.Price", eraPrice.Price),
                        rarity: OggDudeImporter.mapMandatoryString("armor.EraPrice.Rarity", eraPrice.Rarity),
                        restricted: OggDudeImporter.mapOptionalBoolean(eraPrice.Restricted)
                    }
                }),

                skillKey: OggDudeImporter.mapMandatoryString("weapon.SkillKey", xmlWeapon.SkillKey),
                damage: OggDudeImporter.mapOptionalNumber( xmlWeapon.Damage),
                damageAdd: OggDudeImporter.mapOptionalNumber(xmlWeapon.DamageAdd),
                crit: OggDudeImporter.mapOptionalNumber(xmlWeapon.Crit),
                sizeLow: OggDudeImporter.mapOptionalNumber(xmlWeapon.SizeLow),
                sizeHigh: OggDudeImporter.mapOptionalNumber(xmlWeapon.SizeHigh),
                attachCostMult: OggDudeImporter.mapOptionalNumber(xmlWeapon.AttachCostMult),
                range: OggDudeImporter.mapOptionalString(xmlWeapon.Range),
                noMelee: OggDudeImporter.mapOptionalBoolean(xmlWeapon.NoMelee),
                scale: OggDudeImporter.mapOptionalString(xmlWeapon.Scale),
                hands: OggDudeImporter.mapOptionalString(xmlWeapon.Hands),
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
                        return buildMod(mod)
                    }
                ),

                weaponModifiers: OggDudeImporter.mapOptionalArray(xmlWeapon?.WeaponModifiers?.WeaponModifier, (weaponModifier) => {
                    console.log("Weapon Modifier in XML", weaponModifier);
                    return buildWeaponModifiers(weaponModifier)
                }),
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
