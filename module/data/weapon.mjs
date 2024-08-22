import SwesItemBaseData from "./item-base.mjs";
import SwesCombatItemData from "./combat-item.mjs";

export default class SwesWeapon extends SwesCombatItemData {

    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        schema.skillKey = new fields.StringField({...(SwesItemBaseData.requiredString)});
        schema.damage = new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 20});
        schema.damageAdd = new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0});
        schema.crit = new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0});
        schema.sizeLow = new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0});
        schema.sizeHigh = new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0});
        schema.attachCostMult = new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0});
        schema.range = new fields.StringField({...(SwesItemBaseData.optionalString)});
        schema.noMelee = new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)});
        schema.scale = new fields.StringField({...(SwesItemBaseData.optionalString)});
        schema.hands = new fields.StringField({...(SwesItemBaseData.optionalString)});
        schema.ordnance = new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)});
        schema.vehicleNoReplace = new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)});

        schema.rangeValue= new fields.StringField({...(SwesItemBaseData.optionalString)});

        schema.qualities = new fields.ArrayField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0}),
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