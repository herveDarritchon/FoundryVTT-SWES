import SwesCombatItemData from "./combat-item.mjs";
import {
    buildMandatoryIntegerField,
    buildMandatoryStringField,
    buildOptionalBooleanField,
    buildOptionalIntegerField,
    buildOptionalSchemaField,
    buildOptionalSetField,
    buildOptionalStringField
} from "../helpers/data/utilities.mjs";

export default class SwesWeapon extends SwesCombatItemData {
    static ITEM_TYPE = "Weapon-Item";

    static defineSchema() {
        return foundry.utils.mergeObject(super.defineSchema(), {
            skillKey: buildMandatoryStringField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "skill-key"
            }),
            damage: buildMandatoryIntegerField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "damage",
                max: 20
            }),
            damageAdd: buildMandatoryIntegerField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "damage-add"
            }),
            crit: buildMandatoryIntegerField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "crit"
            }),
            sizeLow: buildMandatoryIntegerField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "size-low"
            }),
            sizeHigh: buildMandatoryIntegerField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "size-high"
            }),
            attachCostMult: buildMandatoryIntegerField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "attach-cost-mult"
            }),
            range: buildOptionalStringField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "range"
            }),
            noMelee: buildOptionalBooleanField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "no-melee"
            }),
            scale: buildOptionalStringField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "scale"
            }),
            hands: buildOptionalStringField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "hands"
            }),
            ordnance: buildOptionalBooleanField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "ordnance"
            }),
            vehicleNoReplace: buildOptionalBooleanField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "vehicle-no-replace"
            }),
            rangeValue: buildMandatoryStringField({
                itemType: SwesWeapon.ITEM_TYPE,
                key: "range-value"
            }),
            qualities: buildOptionalSetField({
                field: buildOptionalSchemaField({
                    key: buildOptionalStringField({
                        itemType: SwesWeapon.ITEM_TYPE,
                        key: "qualities.key"
                    }),
                    count: buildOptionalIntegerField({
                        itemType: SwesWeapon.ITEM_TYPE,
                        key: "qualities.count"
                    })
                })
            })
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}