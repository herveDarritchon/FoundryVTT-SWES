import SwesItemBase from "./item-base.mjs";
import SwesCombatItem from "./combat-item.mjs";

export default class SwesArmor extends SwesCombatItem {

    /* -------------------------------------------- */
    /*  Data Schema                                 */
    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {
            defense : new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20}),
            soak : new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20}),

            mods : new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBase.optionalString)}),
                miscDesc: new fields.StringField({...(SwesItemBase.optionalString)}),
                count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
                dieModifiers: new fields.ArrayField(new fields.SchemaField({
                    skillKey: new fields.StringField({...(SwesItemBase.optionalString)}),
                    skillType: new fields.StringField({...(SwesItemBase.optionalString)}),
                    skillChar: new fields.StringField({...(SwesItemBase.optionalString)}),
                    addSetBackCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    advantageCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    boostCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    setbackCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    successCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    threatCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
                    upgradeAbilityCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0,}),
                    upgradeDifficultyCount: new fields.NumberField({
                        ...(SwesItemBase.optionalInteger), min: 0, max: 10
                    })
                }))
            }), {
                required: true, initial: [], label: "ARMOR.Mod.label", hint: "ARMOR.Mod.hint"
            }),

            weaponModifiers : new fields.SchemaField({
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
                }, {required: true, initial: []}), {required: true, initial: []}),
                range: new fields.StringField({...(SwesItemBase.optionalString)}),
                baseMods: new fields.ArrayField(new fields.SchemaField({
                    miscDesc: new fields.StringField({...(SwesItemBase.optionalString)}),
                    count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 100})
                }, {required: false}), {required: true, initial: []})
            })
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}