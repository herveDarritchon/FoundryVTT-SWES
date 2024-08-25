import SwesItemBaseData from "./item-base.mjs";

export default class SwesCombatItemData extends SwesItemBaseData {

    static LOCALIZATION_PREFIXES = ["SWES.Combat-Item"]

    static defineSchema() {
        const fields = foundry.data.fields;

        return foundry.utils.mergeObject(super.defineSchema(), {

            /* Detail Tab*/
            type: new fields.StringField({...(SwesItemBaseData.optionalString), initial: "Item"}),
            price: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 1, min: 0}),
            restricted: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),

            /* Description Tab */
            sources: new fields.SetField(new fields.SchemaField({
                description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: "Description"}),
                page: new fields.NumberField({...(SwesItemBaseData.requiredInteger), min: 1, initial: 1})
            }), {
                required: false, initial: [], label: "ITEM.Source.label", hint: "ITEM.Source.hint"
            }),

            /* Stats Tab */
            encumbrance: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 50}),
            hp: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 20}),
            rarity: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 5, min: 0, max: 10}),

            categories: new fields.SetField(
                new fields.StringField({
                    ...(SwesItemBaseData.requiredString),
                    label: "SWES.Combat-Item.FIELDS.Category.label",
                    hint: "SWES.Combat-Item.FIELDS.Category.hint"
                }), {
                    required: false,
                    initial: [],
                    label: "SWES.Combat-Item.FIELDS.Categories.label",
                    hint: "SWES.Combat-Item.FIELDS.Categories.hint"
                }),

            /* Mods Tab */
            mods: new fields.SetField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                miscDesc: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0}),
                index: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0}),
                defZone: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                dieModifiers: new fields.SetField(new fields.SchemaField({
                    skillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    skillChar: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    skillType: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    boostCount: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 10}),
                    advantageCount: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 10}),
                    threatCount: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 10}),
                    setbackCount: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 10}),
                    upgradeAbilityCount: new fields.NumberField({
                        ...(SwesItemBaseData.optionalInteger),
                        min: 0,
                        max: 10
                    }),
                    successCount: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 10}),
                }, {required: false}), {
                    required: false,
                    initial: [],
                    label: "ITEM.Mod.DieModifiers.label",
                    hint: "ITEM.Mod.DieModifiers.hint"
                })
            }, {required: false}), {
                required: false,
                initial: [],
                label: "ITEM.Mod.label",
                hint: "ITEM.Mod.hint"
            }),

            /* Weapon Modifiers Tab */
            weaponModifiers: new fields.SetField(new fields.SchemaField({
                unarmed: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)}),
                unarmedName: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                skillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                allSkillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                damage: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                damageAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                crit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                critSub: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                rangeValue: new fields.NumberField({
                    ...(SwesItemBaseData.optionalInteger),
                    initial: 0,
                    min: 0,
                    max: 10
                }),
                qualities: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 100})
                }, {required: false}), {required: true, initial: []}),
                range: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                baseMods: new fields.SetField(new fields.SchemaField({
                    miscDesc: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 100})
                }, {required: false}), {
                    required: false,
                    initial: [],
                    label: "ITEM.WeaponModifiers.label",
                    hint: "ITEM.WeaponModifiers.hint"
                })
            }), {
                required: false,
                initial: [],
                label: "ITEM.Mod.label",
                hint: "ITEM.Mod.hint"
            }),

            /* Era Pricing Tab */
            eraPricing: new fields.SetField(new fields.SchemaField({
                name: new fields.StringField({...(SwesItemBaseData.requiredString)}),
                price: new fields.NumberField({...(SwesItemBaseData.requiredInteger), min: 0}),
                rarity: new fields.NumberField({...(SwesItemBaseData.requiredInteger), min: 0, max: 10}),
                restricted: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false})
            }, {required: false}), {
                required: true,
                initial: [],
                label: "ITEM.EraPricing.label",
                hint: "ITEM.EraPricing.hint"
            }),
        });
    }
}
