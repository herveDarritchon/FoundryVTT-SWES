import SwesItemBaseData from "./item-base.mjs";
import {buildWeaponModifiersSchemaWithExtraSchema} from "../helpers/data/itemSchema.mjs";
import {
    buildMandatoryIntegerField,
    buildMandatoryStringField,
    buildOptionalBooleanField,
    buildOptionalIntegerField,
    buildOptionalSchemaField,
    buildOptionalSetField,
    buildOptionalStringField
} from "../helpers/data/utilities.mjs";

export default class SwesCombatItemData extends SwesItemBaseData {

    static ITEM_TYPE = "Combat-Item";
    static DEFAULT_TYPE = "item";
    static LOCALIZATION_PREFIXES = ["SWES.Combat-Item"]

    static defineSchema() {
        const fields = foundry.data.fields;

        return foundry.utils.mergeObject(super.defineSchema(), {

            /* Detail Tab*/
            type: buildOptionalStringField({
                initial: SwesCombatItemData.DEFAULT_TYPE,
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "type"
            }),
            price: buildMandatoryIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "price",
                initial: 500,
                max: 1000000
            }),
            restricted: buildOptionalBooleanField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "restricted"
            }),

            /* Description Tab */

            /* Stats Tab */
            encumbrance: buildMandatoryIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "encumbrance",
                initial: 2,
                max: 50
            }),
            hp: buildMandatoryIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "hp",
                initial: 1,
                max: 20
            }),
            rarity: buildMandatoryIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "rarity",
                initial: 5,
                max: 10
            }),

            categories: buildOptionalSetField({
                field: buildOptionalStringField({
                    itemType: SwesCombatItemData.ITEM_TYPE,
                    key: "category"
                })
            }),

            /* Mods Tab */
            mods: buildOptionalSetField({
                field: buildOptionalSchemaField({
                    key: buildOptionalStringField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "mods.key"
                    }),
                    miscDesc: buildOptionalStringField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "mods.misc-desc"
                    }),
                    count: buildOptionalIntegerField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "mods.count",
                    }),
                    index: buildOptionalIntegerField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "mods.index",
                    }),
                    defZone: buildOptionalStringField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "mods.def-zone"
                    }),
                    dieModifiers: buildOptionalSetField({
                        field: buildOptionalSchemaField({
                            skillKey: buildOptionalStringField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.skill-key"
                            }),
                            skillChar: buildOptionalStringField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.skill-char"
                            }),
                            skillType: buildOptionalStringField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.skill-type"
                            }),
                            boostCount: buildOptionalIntegerField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.boost-count"
                            }),
                            advantageCount: buildOptionalIntegerField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.advantage-count"
                            }),
                            threatCount: buildOptionalIntegerField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.threat-count"
                            }),
                            setbackCount: buildOptionalIntegerField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.setback-count"
                            }),
                            upgradeAbilityCount: buildOptionalIntegerField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.upgrade-ability-count"
                            }),
                            successCount: buildOptionalIntegerField({
                                itemType: SwesCombatItemData.ITEM_TYPE,
                                key: "mods.die-modifiers.success-count"
                            }),
                        })
                    })
                })
            }),

            /* Weapon Modifiers Tab */
            weaponModifiers: buildWeaponModifiersSchemaWithExtraSchema(fields),

            /* Era Pricing Tab */
            eraPricing: buildOptionalSetField({
                field: buildOptionalSchemaField({
                    name: buildMandatoryStringField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "era-pricing.name"
                    }),
                    price: buildMandatoryIntegerField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "era-pricing.price",
                        min: 0
                    }),
                    rarity: buildMandatoryIntegerField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "era-pricing.rarity",
                        min: 0,
                        max: 10
                    }),
                    restricted: buildOptionalBooleanField({
                        itemType: SwesCombatItemData.ITEM_TYPE,
                        key: "era-pricing.restricted"
                    })
                })
            })

        });
    }
}
