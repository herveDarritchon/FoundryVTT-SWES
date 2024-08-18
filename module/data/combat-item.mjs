import {SwesItemBase} from "./_module.mjs";

export default class SwesCombatItem extends SwesItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;

        return foundry.utils.mergeObject(super.defineSchema(), {

            key: new fields.StringField({...(SwesItemBase.optionalString), initial: "KEY"}),
            name: new fields.StringField({...(SwesItemBase.requiredString), initial: "Name"}),
            description: new fields.StringField({...(SwesItemBase.requiredString), initial: "Description"}),
            restricted: new fields.BooleanField({...(SwesItemBase.optionalBoolean), initial: false}),
            price: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 1, min: 0}),
            encumbrance: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 50}),
            hp: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20}),
            rarity: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 5, min: 0, max: 10}),
            type: new fields.StringField({...(SwesItemBase.optionalString), initial: "Item"}),

            sources: new fields.ArrayField(new fields.SchemaField({
                description: new fields.StringField({...(SwesItemBase.requiredString), initial: "Description"}),
                page: new fields.NumberField({...(SwesItemBase.requiredInteger), min: 1, initial: 1})
            }), {
                required: false, initial: [], label: "ITEM.Source.label", hint: "ITEM.Source.hint"
            }),

            categories: new fields.ArrayField(
                new fields.StringField({...(SwesItemBase.requiredString)}), {
                    required: false, initial: [], label: "ITEM.Category.label", hint: "ITEM.Category.hint"
                }),

            mods: new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBase.optionalString)}),
                miscDesc: new fields.StringField({...(SwesItemBase.optionalString)}),
                count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
                index: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
                defZone: new fields.StringField({...(SwesItemBase.optionalString)}),
                dieModifiers: new fields.ArrayField(new fields.SchemaField({
                    skillKey: new fields.StringField({...(SwesItemBase.optionalString)}),
                    skillChar: new fields.StringField({...(SwesItemBase.optionalString)}),
                    skillType: new fields.StringField({...(SwesItemBase.optionalString)}),
                    boostCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    advantageCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    threatCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    setbackCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    upgradeAbilityCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    successCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                }), {
                    required: false,
                    initial: [],
                    label: "ITEM.Mod.DieModifiers.label",
                    hint: "ITEM.Mod.DieModifiers.hint"
                })
            }), {
                required: false,
                initial: [],
                label: "ITEM.Mod.label",
                hint: "ITEM.Mod.hint"
            }),

            weaponModifiers: new fields.SchemaField({
                unarmed: new fields.StringField({...(SwesItemBase.optionalString)}),
                unarmedName: new fields.StringField({...(SwesItemBase.optionalString)}),
                skillKey: new fields.StringField({...(SwesItemBase.optionalString)}),
                allSkillKey: new fields.StringField({...(SwesItemBase.optionalString)}),
                damage: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                damageAdd: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                crit: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                critSub: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                rangeValue: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                qualities: new fields.ArrayField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBase.optionalString)}),
                    count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 100})
                }, {
                    required: false,
                    initial: [],
                    label: "ITEM.weaponModifiers.qualities.label",
                    hint: "ITEM.weaponModifiers.qualities.hint"
                }), {required: true, initial: []}),
                range: new fields.StringField({...(SwesItemBase.optionalString)}),
                baseMods: new fields.ArrayField(new fields.SchemaField({
                    miscDesc: new fields.StringField({...(SwesItemBase.optionalString)}),
                    count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 100})
                }, {
                    required: false,
                    initial: [],
                    label: "ITEM.WeaponModifiers.baseMods.label",
                    hint: "ITEM.WeaponModifiers.baseMods.hint"
                }), {
                    required: false,
                    initial: [],
                    label: "ITEM.WeaponModifiers.label",
                    hint: "ITEM.WeaponModifiers.hint"
                })
            }),

            eraPricing: new fields.ArrayField(new fields.SchemaField({
                name: new fields.StringField({...(SwesItemBase.requiredString)}),
                price: new fields.NumberField({...(SwesItemBase.requiredInteger), min: 0}),
                rarity: new fields.NumberField({...(SwesItemBase.requiredInteger), min: 0, max: 10}),
                restricted: new fields.BooleanField({...(SwesItemBase.optionalBoolean), initial: false})
            }, {required: false}), {
                required: true,
                initial: [],
                label: "ITEM.EraPricing.label",
                hint: "ITEM.EraPricing.hint"
            }),
        });
    }
}
