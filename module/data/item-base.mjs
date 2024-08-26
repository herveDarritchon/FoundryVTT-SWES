export default class SwesItemBaseData extends foundry.abstract.TypeDataModel {

    static optionalBoolean = {required: false, nullable: false};
    static  requiredInteger = {required: true, nullable: false, integer: true};
    static optionalInteger = {required: false, nullable: false, integer: true};
    static requiredString = {required: true, blank: false, trim: true, nullable: false};
    static optionalString = {required: false, blank: true, trim: true, nullable: false};

    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject({}, {
            key: new fields.StringField({...(SwesItemBaseData.optionalString), initial: "KEY"}),
            description: new fields.HTMLField({required: false, blank: true, initial: "", textSearch: true}),

            /* Description Tab */
            sources: new fields.SetField(new fields.SchemaField({
                description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: "Description"}),
                page: new fields.NumberField({...(SwesItemBaseData.requiredInteger), min: 1, initial: 1})
            }), {
                required: false, initial: [], label: "ITEM.Source.label", hint: "ITEM.Source.hint"
            }),
        });
    }
}