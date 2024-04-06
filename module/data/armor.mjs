import swesItemBase from "./item-base.mjs";

export default class swesArmor extends swesItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;
        const optionalBoolean = {required: false, nullable: false};
        const requiredInteger = {required: true, nullable: false, integer: true};
        const optionalInteger = {required: false, nullable: false, integer: true};
        const requiredString = {required: true, blank: false, trim: true, nullable: false};
        const optionalString = {required: false, blank: false, trim: true, nullable: false};
        const schema = super.defineSchema();

        schema.key = new fields.StringField({...requiredString, initial: "KEY"});
        schema.name = new fields.StringField({...requiredString, initial: "Name"});
        schema.description = new fields.StringField({...requiredString, initial: "Description"});
        schema.sources = new fields.ArrayField(
            new fields.SchemaField({
                description: new fields.StringField({...requiredString, initial: "Description"}),
                page: new fields.NumberField({...requiredInteger, min: 1, initial: 1})
            }),
            {
                required: true,
                initial: [],
                label: "ARMOR.Source.label",
                hint: "ARMOR.Source.hint"
            }
        );

        return schema;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}