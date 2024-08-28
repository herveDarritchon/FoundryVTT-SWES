import SwesItemBaseData from "./item-base.mjs";
import {buildStandardRequirementSchema} from "../helpers/data/schema.mjs";

export default class SwesCareer extends SwesItemBaseData {

    static LOCALIZATION_PREFIXES = ["SWES.Career"]

    /* -------------------------------------------- */
    /*  Data Schema                                                 */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;

        return foundry.utils.mergeObject(super.defineSchema(), {
                careerSkills: new fields.SetField(
                    new fields.StringField({
                        ...(SwesItemBaseData.requiredString)
                    }), {
                        required: false,
                        initial: [],
                        label: "SWES.Career-Item.FIELDS.career-skills.label",
                        hint: "SWES.Career-Item.FIELDS.career-skills.hint",
                        placeholder: "SWES.Career-Item.FIELDS.career-skills.placeholder"
                    }),
                careerSpecializations:
                    new fields.SetField(
                        new fields.StringField({
                            ...(SwesItemBaseData.requiredString)
                        }), {
                            required: false,
                            initial: [],
                            label: "SWES.Career-Item.FIELDS.career-specializations.label",
                            hint: "SWES.Career-Item.FIELDS.career-specializations.hint",
                            placeholder: "SWES.Career-Item.FIELDS.career-specializations.placeholder"
                        }),
                attributes:
                    new fields.SchemaField({
                        woundThreshold: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 20,
                            label: "SWES.Career-Item.FIELDS.attributes.wound-threshold.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.wound-threshold.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.wound-threshold.placeholder"
                        }),
                        strainThreshold: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 20,
                            label: "SWES.Career-Item.FIELDS.attributes.strain-threshold.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.strain-threshold.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.strain-threshold.placeholder"
                        }),
                        defenseRanged: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.defense-ranged.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.defense-ranged.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.defense-ranged.placeholder"
                        }),
                        defenseMelee: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.defense-melee.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.defense-melee.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.defense-melee.placeholder"
                        }),
                        soakValue: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.soak-value.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.soak-value.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.soak-value.placeholder"
                        }),
                        experience: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: -50,
                            max: 150,
                            label: "SWES.Career-Item.FIELDS.attributes.experience.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.experience.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.experience.placeholder"
                        }),
                        forceRating: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.force-rating.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.force-rating.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.force-rating.placeholder"
                        }),
                        encumbranceBonus: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.encumbrance-bonus.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.encumbrance-bonus.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.encumbrance-bonus.placeholder"
                        }),
                        requirement: buildStandardRequirementSchema(fields)
                    }, {
                        required: true
                    }),
                freeRanks:
                    new fields.NumberField({
                        ...(SwesItemBaseData.optionalInteger),
                        initial: 0,
                        min: 0,
                        max: 10,
                        label: "SWES.Career-Item.FIELDS.free-ranks.label",
                        hint: "SWES.Career-Item.FIELDS.free-ranks.hint",
                        placeholder: "SWES.Career-Item.FIELDS.free-ranks.placeholder"
                    })
            }
        )
            ;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}