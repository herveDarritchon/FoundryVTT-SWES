import SwesItemBase from "./item-base.mjs";
import SwesCombatItem from "./combat-item.mjs";

export default class SwesWeapon extends SwesCombatItem {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        schema.skillKey = new fields.StringField({...(SwesItemBase.requiredString)});
        schema.damage = new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20});
        schema.damageAdd = new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0});
        schema.crit = new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0});
        schema.sizeLow = new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0});
        schema.sizeHigh = new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0});
        schema.attachCostMult = new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0});
        schema.range = new fields.StringField({...(SwesItemBase.optionalString)});
        schema.noMelee = new fields.BooleanField({...(SwesItemBase.optionalBoolean)});
        schema.scale = new fields.StringField({...(SwesItemBase.optionalString)});
        schema.hands = new fields.StringField({...(SwesItemBase.optionalString)});
        schema.ordnance = new fields.BooleanField({...(SwesItemBase.optionalBoolean)});
        schema.vehicleNoReplace = new fields.BooleanField({...(SwesItemBase.optionalBoolean)});

        schema.categories = new fields.ArrayField(new fields.StringField({...(SwesItemBase.requiredString)}), {
            required: false, initial: [], label: "WEAPON.Category.label", hint: "WEAPON.Category.hint"
        });

        schema.rangeValue= new fields.StringField({...(SwesItemBase.optionalString)});

        schema.qualities = new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBase.optionalString)}),
                count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
            }), {
            required: true, initial: [], label: "WEAPON.Mod.label", hint: "WEAPON.Mod.hint"
        });

        schema.mods = new fields.ArrayField(new fields.SchemaField({
            key: new fields.StringField({...(SwesItemBase.optionalString)}),
            miscDesc: new fields.StringField({...(SwesItemBase.optionalString)}),
            count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
            index: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
            defZone: new fields.StringField({...(SwesItemBase.optionalString)}),
            dieModifiers: new fields.ArrayField(new fields.SchemaField({
                skillKey: new fields.StringField({...(SwesItemBase.optionalString)}),
                boosCount: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
            }))
        }), {
            required: true, initial: [], label: "WEAPON.Mod.label", hint: "WEAPON.Mod.hint"
        });

        schema.weaponModifiers = new fields.SchemaField({
            unarmedName: new fields.StringField({...(SwesItemBase.optionalString)}),
            skillKey: new fields.StringField({...(SwesItemBase.optionalString)}),
            damageAdd: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
            crit: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 10}),
            qualities: new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBase.optionalString)}),
                count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0, max: 100})
            }, {required: true, initial: []}), {required: true, initial: []}),
            range: new fields.StringField({...(SwesItemBase.optionalString)}),
            hands: new fields.StringField({...(SwesItemBase.optionalString)}),
        });



        return schema;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}