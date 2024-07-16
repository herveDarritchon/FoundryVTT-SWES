export default class SwesItemBase extends foundry.abstract.TypeDataModel {

    static optionalBoolean = {required: false, nullable: false};
    static  requiredInteger = {required: true, nullable: false, integer: true};
    static optionalInteger = {required: false, nullable: false, integer: true};
    static requiredString = {required: true, blank: false, trim: true, nullable: false};
    static optionalString = {required: false, blank: false, trim: true, nullable: false};

    static defineSchema() {
        const fields = foundry.data.fields;

        return {};
    }
}