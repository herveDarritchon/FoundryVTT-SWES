/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";
import {buildArmorImgWorldPath, buildItemImgSystemPath} from "./directories.mjs";

/**
 * Map a String value, if it is not present, return an empty string.
 * @param label {string} The label of the element.
 * @param value {string} The value of the element.
 * @returns {string} The mapped value of the element.
 * @private
 * @function
 * @name _mapMandatoryString
 * @memberof OggDudeDataImporter
 */
function _mapMandatoryString(label, value) {
    if (value == null || typeof value !== "string") {
        console.warn(`Value ${label} is mandatory !`);
        return "";
    }
    return value;
}

/**
 * Map an optional String value, if it is not present, return an empty string.
 * @param value {string} The value of the element.
 * @returns {string} The mapped value of the element.
 * @private
 * @function
 * @name _mapOptionalString
 * @memberof OggDudeDataImporter
 */
function _mapOptionalString(value) {
    return typeof value === "string" ? value : "";
}

/**
 * Map a String value to a Number, if it is not present, return 0.
 * @param label {string} The label of the element.
 * @param value {string} The value of the element.
 * @returns {number} The mapped value of the element.
 * @private
 * @function
 * @name _mapMandatoryNumber
 * @memberof OggDudeDataImporter
 */
function _mapMandatoryNumber(label, value) {
    if (value == null || typeof value !== "string") {
        console.warn(`Value ${label} is mandatory !`);
        return 0;
    }
    return parseInt(value) || 0;
}

/**
 * Map an optional Number value, if it is not present, return 0.
 * @param value {string} The value of the element.
 * @returns {number|number} The mapped value of the element.
 * @private
 * @function
 * @name _mapOptionalNumber
 * @memberof OggDudeDataImporter
 */
function _mapOptionalNumber(value) {
    return parseInt(value) || 0;
}

/**
 * Map a Boolean value, if it is not present, return false.
 * @param label {string} The label of the element.
 * @param value {string} The value of the element.
 * @returns {boolean} The mapped value of the element.
 * @private
 * @function
 * @name _mapMandatoryBoolean
 * @memberof OggDudeDataImporter
 */
function _mapMandatoryBoolean(label, value) {
    if (value == null || typeof value !== "string") {
        console.warn(`Value ${label} is mandatory !`);
        return false;
    }
    return (value === 'true');
}

/**
 *  Map a Boolean value, if it is not present, return false.
 * @param value {string} The value of the element.
 * @returns {boolean} The mapped value of the element.
 * @private
 * @function
 * @name _mapOptionalBoolean
 * @memberof OggDudeDataImporter
 */
function _mapOptionalBoolean(value) {
    return (value === 'true');
}

/**
 * Map an optional array value, if it is not present, return an empty array.
 * @param value {Array} The value of the element.
 * @param mapper {function} The function to map the value.
 * @returns {*[]} The mapped value of the element as an array.
 * @private
 * @function
 * @name _mapOptionalArray
 * @memberof OggDudeDataImporter
 */
function _mapOptionalArray(value, mapper) {
    if (value && Array.isArray(value)) {
        return value.map((v) => {
            return mapper(v)
        });
    }
    if (typeof value === "object" && value !== {}) {
        return [mapper(value)];
    }
    return [];
}

/**
 * Armor Array Mapper : Map the Weapon XML data to the Swes Weapon object array.
 * @param weapons {Array} The Weapons data from the XML file.
 * @returns {Array} The Swes Weapon object array.
 * @private
 * @function
 * @name _weaponMapper
 * @memberof OggDudeDataImporter
 */
function _weaponMapper(weapons) {
    return weapons.map((xmlWeapon) => {
            return {
                key: _mapMandatoryString("weapon.Key", xmlWeapon.Key),
                name: _mapMandatoryString("weapon.Name", xmlWeapon.Name),
                description: _mapMandatoryString("weapon.Description", xmlWeapon.Description),
                restricted: _mapOptionalBoolean(xmlWeapon.Restricted),
                sources: _mapOptionalArray(
                    xmlWeapon?.Sources?.Source,
                    (source) => {
                        return {description: source._, page: source.Page}
                    }),
                price: _mapMandatoryNumber("weapon.Price", xmlWeapon.Price),
                encumbrance: _mapMandatoryNumber("weapon.Encumbrance", xmlWeapon.Encumbrance),
                hp: _mapMandatoryNumber("weapon.HP", xmlWeapon.HP),
                rarity: _mapMandatoryNumber("weapon.Rarity", xmlWeapon.Rarity),
                type: _mapMandatoryString("weapon.Type", xmlWeapon.Type),
                categories: _mapOptionalArray(xmlWeapon?.Categories?.Category, (category) => category),
                eraPricing: _mapOptionalArray(xmlWeapon?.EraPricing?.Era, (eraPrice) => {
                    return {
                        name: _mapMandatoryString("armor.EraPrice.Name", eraPrice.Name),
                        price: _mapMandatoryString("armor.EraPrice.Price", eraPrice.Price),
                        rarity: _mapMandatoryString("armor.EraPrice.Rarity", eraPrice.Rarity),
                        restricted: _mapMandatoryBoolean("armor.EraPrice.Restricted", eraPrice.Restricted)
                    }
                }),

                skillKey: _mapMandatoryString("weapon.SkillKey", xmlWeapon.SkillKey),
                damage: _mapMandatoryNumber("weapon.Damage", xmlWeapon.Damage),
                damageAdd: _mapMandatoryNumber("weapon.DamageAdd", xmlWeapon.DamageAdd),
                crit: _mapMandatoryNumber("weapon.Crit", xmlWeapon.Crit),
                sizeLow: _mapMandatoryNumber("weapon.SizeLow", xmlWeapon.SizeLow),
                sizeHigh: _mapMandatoryNumber("weapon.SizeHigh", xmlWeapon.SizeHigh),
                attachCostMult: _mapMandatoryNumber("weapon.AttachCostMult", xmlWeapon.AttachCostMult),
                range: _mapOptionalString("weapon.Range", xmlWeapon.Range),
                noMelee: _mapOptionalBoolean(xmlWeapon.NoMelee),
                scale: _mapOptionalString("weapon.Scale", xmlWeapon.Scale),
                hands: _mapOptionalString("weapon.Hands", xmlWeapon.Hands),
                ordnance: _mapOptionalBoolean(xmlWeapon.Ordnance),
                vehicleNoReplace: _mapOptionalBoolean(xmlWeapon.VehicleNoReplace),
                rangeValue: _mapOptionalString(xmlWeapon?.RangeValue),
                qualities: _mapOptionalArray(
                    xmlWeapon?.Qualities?.Quality,
                    (quality) => {
                        return {
                            key: _mapMandatoryString("weapon.Characteristic.Quality.Key", quality.Key),
                            count: _mapOptionalNumber(quality.Count),
                        }
                    }),
                mods: _mapOptionalArray(
                    xmlWeapon?.BaseMods?.Mod,
                    (mod) => {
                        return {
                            key: _mapOptionalString(mod.Key),
                            miscDesc: _mapOptionalString(mod.MiscDesc),
                            count: _mapOptionalNumber(mod.Count),
                            index: _mapOptionalNumber(mod.Index),
                            defZone: _mapOptionalString(mod.DefZone),
                            dieModifiers: _mapOptionalArray(
                                mod?.DieModifiers?.DieModifier,
                                (dieModifier) => {
                                    return {
                                        skillKey: _mapOptionalString(dieModifier.SkillKey),
                                        boosCount: _mapOptionalNumber(dieModifier.BoosCount)
                                    }
                                }
                            )
                        }
                    }
                ),
                weaponModifiers: {
                    skillKey: _mapOptionalString(xmlWeapon?.WeaponModifiers?.WeaponModifier?.SkillKey),
                    damageAdd: _mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.DamageAdd),
                    crit: _mapOptionalNumber(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Crit),
                    rangeValue: _mapOptionalString(xmlWeapon?.WeaponModifiers?.WeaponModifier?.RangeValue),
                    unarmedName: _mapOptionalString(xmlWeapon?.WeaponModifiers?.WeaponModifier?.UnarmedName),
                    qualities: _mapOptionalArray(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Qualities?.Quality, (quality) => {
                        return {
                            key: _mapOptionalString(quality.Key),
                            count: _mapOptionalNumber(quality.Count)
                        }
                    }),
                    range: _mapOptionalString(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Range),
                    hands: _mapOptionalString(xmlWeapon?.WeaponModifiers?.WeaponModifier?.Hands)
                }
            }
        }
    )
        ;
}

/**
 * Armor Array Mapper : Map the Armor XML data to the SwesArmor object array.
 * @param armors {Array} The Armors data from the XML file.
 * @returns {Array} The SwesArmor object array.
 * @private
 * @function
 * @name _armorMapper
 * @memberof OggDudeDataImporter
 */
function _armorMapper(armors) {
    return armors.map((xmlArmor) => {
        return {
            name: _mapMandatoryString("armor.Name", xmlArmor.Name),
            key: _mapMandatoryString("armor.Key", xmlArmor.Key),
            description: _mapMandatoryString("armor.Description", xmlArmor.Description),
            soak: _mapMandatoryNumber("armor.Soak", xmlArmor.Soak),
            defense: _mapMandatoryNumber("armor.Defense", xmlArmor.Defense),
            encumbrance: _mapMandatoryNumber("armor.Encumbrance", xmlArmor.Encumbrance),
            price: _mapMandatoryNumber("armor.Price", xmlArmor.Price),
            rarity: _mapMandatoryNumber("armor.Rarity", xmlArmor.Rarity),
            HP: _mapMandatoryNumber("armor.HP", xmlArmor.HP),
            restricted: _mapOptionalBoolean("armor.Restricted", xmlArmor.Restricted),
            sources: _mapOptionalArray(
                xmlArmor?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: _mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),
            mods: _mapOptionalArray(xmlArmor?.BaseMods?.Mod, (mod) => {
                return {
                    miscDesc: _mapMandatoryString("armor.Mod.MiscDesc", mod.MiscDesc),
                    key: _mapOptionalString("armor.Mod.Key", mod.Key),
                    count: _mapOptionalNumber("armor.Mod.Count", mod.Count),
                    dieModifiers: _mapOptionalArray(mod?.DieModifiers?.DieModifier, (dieModifier) => {
                        return {
                            skillKey: _mapMandatoryString("armor.Mod.Die,Modifier.SkillKey", dieModifier.SkillKey),
                            skillType: _mapMandatoryString("armor.Mod.Die,Modifier.SkillType", dieModifier.SkillType),
                            skillChar: _mapMandatoryString("armor.Mod.Die,Modifier.SkillChar", dieModifier.SkillChar),
                            addSetBackCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.AddSetBackCount", dieModifier.AddSetBackCount),
                            advantageCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.AdvantageCount", dieModifier.AdvantageCount),
                            boostCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.BoostCount", dieModifier.BoostCount),
                            setbackCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.SetbackCount", dieModifier.SetbackCount),
                            successCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.SuccessCount", dieModifier.SuccessCount),
                            threatCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.ThreatCount", dieModifier.ThreatCount),
                            upgradeAbilityCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.UpgradeAbilityCount", dieModifier.UpgradeAbilityCount),
                            upgradeDifficultyCount: _mapMandatoryNumber("armor.Mod.Die,Modifier.UpgradeDifficultyCount", dieModifier.UpgradeDifficultyCount)
                        }
                    }),
                }
            }),
            weaponModifiers: {
                unarmed: _mapMandatoryString("armor.WeaponModifier.Unarmed", xmlArmor?.WeaponModifiers?.WeaponModifier?.Unarmed),
                unarmedName: _mapMandatoryString("armor.WeaponModifier.UnarmedName", xmlArmor?.WeaponModifiers?.WeaponModifier?.UnarmedName),
                skillKey: _mapMandatoryString("armor.WeaponModifier.SkillKey", xmlArmor?.WeaponModifiers?.WeaponModifier?.SkillKey),
                allSkillKey: _mapMandatoryString("armor.WeaponModifier.AllSkillKey", xmlArmor?.WeaponModifiers?.WeaponModifier?.AllSkillKey),
                damage: _mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.Damage),
                damageAdd: _mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.DamageAdd),
                crit: _mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.Crit),
                critSub: _mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.CritSub),
                rangeValue: _mapOptionalNumber(xmlArmor?.WeaponModifiers?.WeaponModifier?.RangeValue),
                qualities: _mapOptionalArray(xmlArmor?.WeaponModifiers?.WeaponModifier?.Qualities?.Quality, (quality) => {
                    return {
                        key: _mapMandatoryString("armor.WeaponModifier.Quality.Key", quality.Key),
                        count: _mapMandatoryNumber("armor.WeaponModifier.Quality.Count", quality.Count)
                    }
                }),
            },
            eraPricing: _mapOptionalArray(xmlArmor?.EraPricing?.Era, (eraPrice) => {
                return {
                    name: _mapMandatoryString("armor.EraPrice.Name", eraPrice.Name),
                    price: _mapMandatoryString("armor.EraPrice.Price", eraPrice.Price),
                    rarity: _mapMandatoryString("armor.EraPrice.Rarity", eraPrice.Rarity),
                    restricted: _mapMandatoryBoolean("armor.EraPrice.Restricted", eraPrice.Restricted)
                }
            })

        }
    });
}

/**
 * Process the Armor data from the imported file. The process is as follows:
 * 1. Load the zip file
 * 2. Load the data elements from the zip
 * 3.1 Group the data elements by type
 * 3.2 Group the data elements by directory
 * 4. Get the Armor file from the Data directory
 * 5. Get the Armor data from the Armor file
 * 6. Create the folder in the Item tab
 * 7. Upload the images to the server
 * 8. Parse the XML data
 * 9. Create the folder
 * 10. Store the Armor Items
 * @param importedFile {File} The imported file.
 * @returns {Promise<void>} A Promise that resolves when the Armor data has been processed.
 * @async
 * @private
 * @function
 * @name _processArmorData
 * @memberof OggDudeDataImporter
 */
async function _processArmorData(importedFile) {

    /* --------------------------------------------- GÉNÉRIQUE ------------------------------------------------------------------- */

    // Step 1: Load the zip file
    const zip = await new OggDudeImporter().load(importedFile);

    // Step 2: Load the data elements from the zip
    let allDataElements = OggDudeDataElement.from(zip);

    // Step 3.1: Group the data elements by directory
    let groupByDirectory = OggDudeDataElement.groupByDirectory(allDataElements);
    console.debug("Group By Directory:", groupByDirectory);

    // Step 3.2: Group the data elements by type
    let groupByType = OggDudeDataElement.groupByType(allDataElements);
    console.debug("Group By Type:", groupByType);

    /* --------------------------------------------- SPÉCIFIQUE ------------------------------------------------------------------- */

    /**
     *  Construct the Armor Item Context
     * @type {OggDudeElementContext} The Armor Context of the element to be stored
     */
    const armorContext = {
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
            mapper: _armorMapper,
            type: 'armor'
        }
    }

    await OggDudeDataElement.processElements(armorContext);

    /**
     *  Construct the Weapon Item Context
     * @type {OggDudeElementContext} The  Weapon Context of the element to be stored
     */
    const weaponContext = {
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
            mapper: _weaponMapper,
            type: 'weapon'
        }
    }

    await OggDudeDataElement.processElements(weaponContext);

    /* ------------------------------------------------------------------------------------------------------------------------------------ */


}

/**
 * An application for processing OggDude data file. This application is used to import data from OggDude's generator.
 * @extends {FormApplication}
 */
export class OggDudeDataImporter extends FormApplication {

    /**
     * An application for processing OggDude data file.
     * @param {NewDataFile} [object]  The default settings for new font definition creation.
     * @param {object} [options]            Additional options to configure behaviour.
     */
    constructor(object = {}, options = {}) {
        foundry.utils.mergeObject(object, {
            src: "",
        });
        super(object, options);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: game.i18n.localize('SETTINGS.OggDudeDataImporter.loadWindow.menuLabel'),
            id: 'swesSettings',
            template: 'systems/swes/templates/settings/oggDudeDataImporter.hbs',
            popOut: true,
            icon: 'fas fa-cogs',
            width: 400,
            height: "auto",
            closeOnSubmit: false,
            submitOnChange: true
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    activateListeners(html) {
        super.activateListeners(html);

        html.find(".load-button.control").click(this._onloadButtonClick.bind(this));

    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _updateObject(event, formData) {
        foundry.utils.mergeObject(this.object, formData);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async close(options = {}) {
        await super.close(options);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _onChangeInput(event) {
        return super._onChangeInput(event);
    }

    /* -------------------------------------------- */

    /**
     *
     * @param {Event} event  The originating click event
     * @private
     */
    async _onloadButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = $("form.oggDude-data-importer")[0];
        const importedFile = form['zip-file'].files[0];

        await _processArmorData(importedFile);

        await this.close({});
    }
}
