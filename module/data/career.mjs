import SwesItemBaseData from "./item-base.mjs";
import {buildStandardRequirementSchema} from "../helpers/data/itemSchema.mjs";
import {
    buildMandatoryStringField,
    buildOptionalIntegerField,
    buildOptionalSchemaField,
    buildOptionalSetField
} from "../helpers/data/utilities.mjs";

export default class SwesCareer extends SwesItemBaseData {

    static ITEM_TYPE = "Career-Item";
    static LOCALIZATION_PREFIXES = ["SWES.Career"]

    /* -------------------------------------------- */
    /*  Data Schema                                                 */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;

        return foundry.utils.mergeObject(super.defineSchema(), {
            careerSkills: buildOptionalSetField({
                field: buildMandatoryStringField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "career-skills"
                })

            }),
            careerSpecializations: buildOptionalSetField({
                field: buildMandatoryStringField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "career-specializations"
                })
            }),
            attributes: buildOptionalSchemaField({
                woundThreshold: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.wound-threshold",
                    max: 20
                }),
                strainThreshold: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.strain-threshold",
                    max: 20
                }),
                defenseRanged: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.defense-ranged"
                }),
                defenseMelee: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.defense-melee"
                }),
                soakValue: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.soak-value"
                }),
                experience: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.experience",
                    max: 150
                }),
                forceRating: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.force-rating"
                }),
                encumbranceBonus: buildOptionalIntegerField({
                    itemType: SwesCareer.ITEM_TYPE,
                    key: "attributes.encumbrance-bonus"
                }),
                requirement: buildStandardRequirementSchema(fields),
            }),
            freeRanks: buildOptionalIntegerField({
                itemType: SwesCareer.ITEM_TYPE,
                key: "attributes.free-ranks"
            })
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}