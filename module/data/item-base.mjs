export default class SwesItemBase extends foundry.abstract.TypeDataModel {

  optionalBoolean = {required: false, nullable: false};
   requiredInteger = {required: true, nullable: false, integer: true};
   optionalInteger = {required: false, nullable: false, integer: true};
   requiredString = {required: true, blank: false, trim: true, nullable: false};
   optionalString = {required: false, blank: false, trim: true, nullable: false};

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });

    return schema;
  }
}