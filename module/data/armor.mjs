import SwesItemBase from "./item-base.mjs";

export default class SwesArmor extends SwesItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        schema.key = new fields.StringField({...(this.optionalString), initial: "KEY"});
        schema.name = new fields.StringField({...(this.requiredString), initial: "Name"});
        schema.description = new fields.StringField({...(this.requiredString), initial: "Description"});
        schema.sources = new fields.ArrayField(new fields.SchemaField({
            description: new fields.StringField({...(this.requiredString), initial: "Description"}),
            page: new fields.NumberField({...(this.requiredInteger), min: 1, initial: 1})
        }), {
            required: true, initial: [], label: "ARMOR.Source.label", hint: "ARMOR.Source.hint"
        });

        schema.defense = new fields.NumberField({...(this.requiredInteger), initial: 0, min: 0, max: 20});
        schema.soak = new fields.NumberField({...(this.requiredInteger), initial: 0, min: 0, max: 20});
        schema.price = new fields.NumberField({...(this.requiredInteger), initial: 1, min: 0});
        schema.encumbrance = new fields.NumberField({...(this.requiredInteger), initial: 0, min: 0, max: 50});
        schema.hp = new fields.NumberField({...(this.requiredInteger), initial: 0, min: 0, max: 20});
        schema.rarity = new fields.NumberField({...(this.requiredInteger), initial: 5, min: 0, max: 10});
        schema.categories = new fields.ArrayField(new fields.StringField({...(this.requiredString)}), {
            required: false, initial: [], label: "ARMOR.Category.label", hint: "ARMOR.Category.hint"
        });
        schema.mods = new fields.ArrayField(new fields.SchemaField({
            key: new fields.StringField({...(this.optionalString)}),
            miscDesc: new fields.StringField({...(this.optionalString)}),
            count: new fields.NumberField({...(this.optionalInteger), min: 0}),
            dieModifiers: new fields.ArrayField(new fields.SchemaField({
                skillKey: new fields.StringField({...(this.optionalString)}),
                skillType: new fields.StringField({...(this.optionalString)}),
                skillChar: new fields.StringField({...(this.optionalString)}),
                addSetBackCount: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
                advantageCount: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
                boostCount: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
                setbackCount: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
                successCount: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
                threatCount: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
                upgradeAbilityCount: new fields.NumberField({...(this.optionalInteger), min: 0,}),
                upgradeDifficultyCount: new fields.NumberField({
                    ...(this.optionalInteger), min: 0, max: 10
                })
            }))
        }), {
            required: true, initial: [], label: "ARMOR.Mod.label", hint: "ARMOR.Mod.hint"
        });
        schema.weaponModifiers = new fields.ArrayField(new fields.SchemaField({
            unarmed: new fields.BooleanField({...(this.optionalBoolean)}),
            skillKey: new fields.StringField({...(this.optionalString)}),
            damage: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
            damageAdd: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
            crit: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
            critSub: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
            rangeValue: new fields.NumberField({...(this.optionalInteger), min: 0, max: 10}),
            qualities: new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(this.optionalString)}),
                count: new fields.NumberField({...(this.optionalInteger), min: 0, max: 100})
            }, {required: true, initial: []}), {required: true, initial: []}),
            range: new fields.StringField({...(this.optionalString)}),
            baseMods: new fields.ArrayField(new fields.SchemaField({
                miscDesc: new fields.StringField({...(this.optionalString)}),
                count: new fields.NumberField({...(this.optionalInteger), min: 0, max: 100})
            }, {required: false}), {required: true, initial: []})
        }), {required: true, initial: []});
        schema.eraPricing = new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({...(this.requiredString)}),
            price: new fields.NumberField({...(this.requiredInteger), min: 0}),
            rarity: new fields.NumberField({...(this.requiredInteger), min: 0, max: 10}),
            restricted: new fields.BooleanField({...(this.optionalBoolean), initial: false})
        }, {required: false}), {required: true, initial: []})

        return schema;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}