import SwesItemBaseData from "./item-base.mjs";
import {
    buildAttributesSchema, buildBaseRequirementSchema, buildStandardRequirementSchema,
    buildRequirementSchemaWithExtraFields,
    buildSkillModifiersSchema,
    buildTalentModifiersSchema,
    buildWeaponModifiersSchema
} from "../helpers/data/schema.mjs";

export default class SwesSpecies extends SwesItemBaseData {

    static LOCALIZATION_PREFIXES = ["SWES.Species"]

    /* -------------------------------------------- */
    /*  Data Schema                                                 */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {

                /* Starting Characteristics Tab */
                startingChars: new fields.SchemaField({
                    brawn: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    agility: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    intellect: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    cunning: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    willpower: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    presence: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    requirement: buildRequirementSchemaWithExtraFields(fields)
                }, {
                    required: true, label: "ITEM.StartingChars.label", hint: "ITEM.StartingChars.hint"
                }),

                /* Starting Attributes Tab */
                startingAttrs: buildAttributesSchema(fields),

                /* Skill Modifiers Tab */
                skillModifiers: buildSkillModifiersSchema(fields),

                /* Talent Modifiers Tab */
                talentModifiers: buildTalentModifiersSchema(fields),

                /* SubSpecies List Tab */
                subSpeciesList: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    skillModifiers: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        rankStart: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                        rankLimit: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.SubSpeciesList.SkillModifiers.label",
                        hint: "ITEM.SubSpeciesList.SkillModifiers.hint"
                    }),
                    talentModifiers: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        rankAdd: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.SubSpeciesList.TalentModifiers.label",
                        hint: "ITEM.SubSpeciesList.TalentModifiers.hint"
                    }),
                    optionChoices: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        options: new fields.SetField(new fields.SchemaField({
                            key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            skillModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                                rankStart: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.SubSpeciesList.OptionChoices.SkillModifiers.label",
                                hint: "ITEM.SubSpeciesList.OptionChoices.SkillModifiers.hint"
                            }),
                        }, {required: false}), {
                            required: false,
                            initial: [],
                            label: "ITEM.SubSpeciesList.OptionChoices.Options.label",
                            hint: "ITEM.SubSpeciesList.OptionChoices.Options.hint"
                        }),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.SubSpeciesList.OptionChoices.label",
                        hint: "ITEM.SubSpeciesList.OptionChoices.hint"
                    }),
                    weaponModifiers: buildWeaponModifiersSchema(fields),
                }), {
                    required: false,
                    initial: [],
                    label: "ITEM.SubSpeciesList.label",
                    hint: "ITEM.SubSpeciesList.hint"
                }),

                /* Option Choices Tab */
                optionChoices: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        name: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        description: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        source: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        sources: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        custom: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        options: new fields.SetField(new fields.SchemaField({
                            key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            skillModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                rankAdd: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                                rankStart: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                                rankLimit: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10

                                }),
                                isCareer: new fields.BooleanField({...(SwesItemBaseData.optionalString), initial: ""}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.SkillModifiers.label",
                                hint: "ITEM.OptionChoices.Options.SkillModifiers.hint"
                            }),
                            dieModifiers: new fields.SetField(new fields.SchemaField({
                                dieModifier: new fields.SchemaField({
                                    skillKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                    advantageCount: new fields.NumberField({
                                        ...(SwesItemBaseData.optionalInteger),
                                        initial: 0,
                                        min: 0
                                    }),
                                    setbackCount: new fields.NumberField({
                                        ...(SwesItemBaseData.optionalInteger), initial: 0, min: 0
                                    }),
                                    successCount: new fields.NumberField({
                                        ...(SwesItemBaseData.optionalInteger), initial: 0, min: 0
                                    }),
                                }, {required: false}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.DieModifiers.label",
                                hint: "ITEM.OptionChoices.Options.DieModifiers.hint"
                            }),
                            startingSkillTraining: new fields.SetField(new fields.SchemaField({
                                skillCount: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                                requirement:  buildBaseRequirementSchema(fields),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.StartingSkillTraining.label",
                                hint: "ITEM.OptionChoices.Options.StartingSkillTraining.hint"
                            }),

                            startingAttributes: new fields.SetField(new fields.SchemaField({
                                experience: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.StartingAttributes.label",
                                hint: "ITEM.OptionChoices.Options.StartingAttributes.hint"
                            }),
                            talentModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                                rankStart: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                                rankAdd: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                                rankLimit: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.TalentModifiers.label",
                                hint: "ITEM.OptionChoices.Options.TalentModifiers.hint"
                            }),
                        }, {required: false}), {
                            required: false,
                            initial: [],
                            label: "ITEM.OptionChoices.Options.label",
                            hint: "ITEM.OptionChoices.Options.hint"
                        }),
                    }, {
                        required: false
                    }),
                    {
                        required: false,
                        initial: [],
                        label: "ITEM.OptionChoices.label",
                        hint: "ITEM.OptionChoices.hint"
                    })
            }
        );
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}