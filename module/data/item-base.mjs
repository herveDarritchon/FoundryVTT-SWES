import {
    buildMandatoryIntegerField,
    buildMandatoryStringField,
    buildOptionalHtmlField,
    buildOptionalSchemaField, buildOptionalSetField
} from "../helpers/data/utilities.mjs";

export default class SwesItemBaseData extends foundry.abstract.TypeDataModel {

    static ITEM_TYPE = "Base-Item";

    static defineSchema() {
        return foundry.utils.mergeObject({}, {
            key: buildMandatoryStringField({
                itemType: SwesItemBaseData.ITEM_TYPE,
                key: "key"
            }),
            description: buildOptionalHtmlField({
                initial: "Description",
                itemType: SwesItemBaseData.ITEM_TYPE,
                key: "description"
            }),

            /* Description Tab */
            sources: buildOptionalSetField({
                field: buildOptionalSchemaField({
                    description: buildMandatoryStringField({
                        itemType: SwesItemBaseData.ITEM_TYPE,
                        key: "description"
                    }),
                    page: buildMandatoryIntegerField({
                        itemType: SwesItemBaseData.ITEM_TYPE,
                        key: "page"
                    })
                })
            })
        });
    }
}