import SwesItemBase from "./item-base.mjs";

export default class SwesArmor extends SwesItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const optionalBoolean = {required: false, nullable: false};
        const requiredInteger = {required: true, nullable: false, integer: true};
        const optionalInteger = {required: false, nullable: false, integer: true};
        const requiredString = {required: true, blank: false, trim: true, nullable: false};
        const optionalString = {required: false, blank: false, trim: true, nullable: false};
        const schema = super.defineSchema();

        schema.key = new fields.StringField({...optionalString, initial: "KEY"});
        schema.name = new fields.StringField({...requiredString, initial: "Name"});
        schema.description = new fields.StringField({...requiredString, initial: "Description"});
        schema.sources = new fields.ArrayField(new fields.SchemaField({
            description: new fields.StringField({...requiredString, initial: "Description"}),
            page: new fields.NumberField({...requiredInteger, min: 1, initial: 1})
        }), {
            required: true, initial: [], label: "ARMOR.Source.label", hint: "ARMOR.Source.hint"
        });

        schema.defense = new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 20});
        schema.soak = new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 20});
        schema.price = new fields.NumberField({...requiredInteger, initial: 1, min: 0});
        schema.encumbrance = new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 50});
        schema.hp = new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 20});
        schema.rarity = new fields.NumberField({...requiredInteger, initial: 5, min: 0, max: 10});
        schema.categories = new fields.ArrayField(new fields.StringField({...requiredString}), {
            required: false, initial: [], label: "ARMOR.Category.label", hint: "ARMOR.Category.hint"
        });
        schema.mods = new fields.ArrayField(new fields.SchemaField({
            key: new fields.StringField({...optionalString}),
            miscDesc: new fields.StringField({...optionalString}),
            count: new fields.NumberField({...optionalInteger, min: 0}),
            dieModifiers: new fields.ArrayField(new fields.SchemaField({
                skillKey: new fields.StringField({...optionalString}),
                skillType: new fields.StringField({...optionalString}),
                skillChar: new fields.StringField({...optionalString}),
                addSetBackCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                advantageCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                boostCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                setbackCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                successCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                threatCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                upgradeAbilityCount: new fields.NumberField({...optionalInteger, min: 0,}),
                upgradeDifficultyCount: new fields.NumberField({
                    ...optionalInteger, min: 0, max: 10
                })
            }))
        }), {
            required: true, initial: [], label: "ARMOR.Mod.label", hint: "ARMOR.Mod.hint"
        });
        schema.weaponModifiers = new fields.ArrayField(new fields.SchemaField({
            unarmed: new fields.BooleanField({...optionalBoolean}),
            skillKey: new fields.StringField({...optionalString}),
            damage: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
            damageAdd: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
            crit: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
            critSub: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
            rangeValue: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
            qualities: new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...optionalString}),
                count: new fields.NumberField({...optionalInteger, min: 0, max: 100})
            }, {required: true, initial: []}), {required: true, initial: []}),
            range: new fields.StringField({...optionalString}),
            baseMods: new fields.ArrayField(new fields.SchemaField({
                miscDesc: new fields.StringField({...optionalString}),
                count: new fields.NumberField({...optionalInteger, min: 0, max: 100})
            }, {required: false}), {required: true, initial: []})
        }), {required: true, initial: []});
        schema.eraPricing = new fields.ArrayField(new fields.SchemaField({
            name: new fields.StringField({...requiredString}),
            price: new fields.NumberField({...requiredInteger, min: 0}),
            rarity: new fields.NumberField({...requiredInteger, min: 0, max: 10}),
            restricted: new fields.BooleanField({...optionalBoolean, initial: false})
        }, {required: false}), {required: true, initial: []})

        return schema;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}