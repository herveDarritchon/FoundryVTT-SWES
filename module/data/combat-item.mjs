import {SwesItemBase} from "./_module.mjs";

export default class SwesCombatItem extends SwesItemBase {

    static defineSchema() {
        const fields = foundry.data.fields;

        return foundry.utils.mergeObject(super.defineSchema(), {
            key: new fields.StringField({...(SwesItemBase.optionalString), initial: "KEY"}),
            name: new fields.StringField({...(SwesItemBase.requiredString), initial: "Name"}),
            description: new fields.StringField({...(SwesItemBase.requiredString), initial: "Description"}),
            restricted: new fields.BooleanField({...(SwesItemBase.optionalBoolean), initial: false}),

            sources: new fields.ArrayField(new fields.SchemaField({
                description: new fields.StringField({...(SwesItemBase.requiredString), initial: "Description"}),
                page: new fields.NumberField({...(SwesItemBase.requiredInteger), min: 1, initial: 1})
            }), {
                required: true, initial: [], label: "ITEM.Source.label", hint: "ITEM.Source.hint"
            }),

            price: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 1, min: 0}),
            encumbrance: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 50}),
            hp: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20}),
            rarity: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 5, min: 0, max: 10}),
            type: new fields.StringField({...(SwesItemBase.requiredString), initial: "Item"}),

            categories: new fields.ArrayField(
                new fields.StringField({...(SwesItemBase.requiredString)}), {
                    required: false, initial: [], label: "ARMOR.Category.label", hint: "ARMOR.Category.hint"
                }),

            eraPricing: new fields.ArrayField(new fields.SchemaField({
                name: new fields.StringField({...(SwesItemBase.requiredString)}),
                price: new fields.NumberField({...(SwesItemBase.requiredInteger), min: 0}),
                rarity: new fields.NumberField({...(SwesItemBase.requiredInteger), min: 0, max: 10}),
                restricted: new fields.BooleanField({...(SwesItemBase.optionalBoolean), initial: false})
            }, {required: false}), {required: true, initial: []}),
        });
    }
}