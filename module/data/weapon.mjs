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

        schema.rangeValue= new fields.StringField({...(SwesItemBase.optionalString)});

        schema.qualities = new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBase.optionalString)}),
                count: new fields.NumberField({...(SwesItemBase.optionalInteger), min: 0}),
            }), {
            required: true, initial: [], label: "WEAPON.Mod.label", hint: "WEAPON.Mod.hint"
        });

        return schema;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}