import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";
import OggDudeDataElement from "../../settings/models/OggDudeDataElement.mjs";

/**
 * Species Array Mapper : Map the Species XML data to the SwesArmor object array.
 * @param species {Array} The Species data from the XML file.
 * @returns {Array} The SwesSpecies object array.
 * @public
 * @function
 * @name speciesMapper
 */
export function speciesMapper(species) {
    return species.map((xmlSpecies) => {
        return {
            /* Starting Characteristics Tab */

            /*
            startingChars: new fields.SchemaField({
                brawn: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                agility: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                intellect: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                cunning: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                willpower: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                presence: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                requirement: new fields.SchemaField({
                    wearingArmor: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    career: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    specialization: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    nonCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    soakAtLeast: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    wieldingMelee: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    wieldingBrawl: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    wieldingLightsaber: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                }, {
                    required: false,
                    label: "ITEM.StartingChars.Requirement.label",
                    hint: "ITEM.StartingChars.Requirement.hint"
                })
            }, {
                required: true, label: "ITEM.StartingChars.label", hint: "ITEM.StartingChars.hint"
            }),
            */
            startingChars: {
                brawn: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Brawn", xmlSpecies?.StartingChars?.Brawn),
                agility: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Agility", xmlSpecies?.StartingChars?.Agility),
                intellect: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Intellect", xmlSpecies?.StartingChars?.Intellect),
                cunning: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Cunning", xmlSpecies?.StartingChars?.Cunning),
                willpower: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Willpower", xmlSpecies?.StartingChars?.Willpower),
                presence: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Presence", xmlSpecies?.StartingChars?.Presence),
                requirement: {
                    wearingArmor: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.WearingArmor),
                    career: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.Career),
                    specialization: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.Specialization),
                    nonCareer: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.NonCareer),
                    soakAtLeast: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingChars?.Requirement?.SoakAtLeast),
                    wieldingMelee: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.WieldingMelee),
                    wieldingBrawl: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.WieldingBrawl),
                    wieldingLightsaber: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingChars?.Requirement?.WieldingLightsaber)
                }
            },

            /* Starting Attributes Tab */

            /*
                            startingAttrs: new fields.SchemaField({
                    woundThreshold: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    strainThreshold: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    defenseRanged: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    defenseMelee: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    soakValue: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    experience: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    forceRating: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    encumbranceBonus: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    requirement: new fields.SchemaField({
                        wearingArmor: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        career: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        specialization: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        nonCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        soakAtLeast: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                        wieldingMelee: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        wieldingBrawl: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        wieldingLightsaber: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    }, {
                        required: false,
                        label: "ITEM.StartingAttrs.Requirement.label",
                        hint: "ITEM.StartingAttrs.Requirement.hint"
                    })
                }, {
                    required: true, label: "ITEM.StartingAttrs.label", hint: "ITEM.StartingAttrs.hint"
                })
             */

            startingAttrs: {
                woundThreshold: OggDudeImporter.mapMandatoryNumber("species.StartingAttrs.WoundThreshold", xmlSpecies?.StartingAttrs?.WoundThreshold),
                strainThreshold: OggDudeImporter.mapMandatoryNumber("species.StartingAttrs.StrainThreshold", xmlSpecies?.StartingAttrs?.StrainThreshold),
                defenseRanged: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.DefenseRanged),
                defenseMelee: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.DefenseMelee),
                soakValue: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.SoakValue),
                experience: OggDudeImporter.mapMandatoryNumber("species.StartingAttrs.Experience", xmlSpecies?.StartingAttrs?.Experience),
                forceRating: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.ForceRating),
                encumbranceBonus: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.EncumbranceBonus),
                requirement: {
                    wearingArmor: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.WearingArmor),
                    career: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.Career),
                    specialization: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.Specialization),
                    nonCareer: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.NonCareer),
                    soakAtLeast: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.Requirement?.SoakAtLeast),
                    wieldingMelee: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.WieldingMelee),
                    wieldingBrawl: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.WieldingBrawl),
                    wieldingLightsaber: OggDudeImporter.mapOptionalString(xmlSpecies?.StartingAttrs?.Requirement?.WieldingLightsaber)
                }
            },

            name: OggDudeImporter.mapMandatoryString("gear.Name", xmlSpecies?.Name),
            sources: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),

            /* Skill Modifiers Tab */

            /*
            skillModifiers: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    subSpeciesKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    rankStart: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    rankAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    rankLimit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    isCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    skillType: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    requirement: new fields.SchemaField({
                        wearingArmor: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        career: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        specialization: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        nonCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        soakAtLeast: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    }, {
                        required: false,
                        label: "ITEM.SkillModifiers.Requirement.label",
                        hint: "ITEM.SkillModifiers.Requirement.hint"
                    })
                }, {
                    required: false, initial: [], label: "ITEM.SkillModifiers.label", hint: "ITEM.SkillModifiers.hint"
                }),
                {
                    required: false,
                    initial: [],
                    label: "SWES.Combat-Item.FIELDS.Categories.label",
                    hint: "SWES.Combat-Item.FIELDS.Categories.hint"
                }),
             */

            skillModifiers: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.SkillModifiers?.SkillModifier,
                (skillModifier) => {
                    return {
                        key: OggDudeImporter.mapOptionalString(skillModifier?.Key),
                        subSpeciesKey: OggDudeImporter.mapOptionalString(skillModifier?.SubSpeciesKey),
                        rankStart: OggDudeImporter.mapOptionalNumber(skillModifier?.RankStart),
                        rankAdd: OggDudeImporter.mapOptionalNumber(skillModifier?.RankAdd),
                        rankLimit: OggDudeImporter.mapOptionalNumber(skillModifier?.RankLimit),
                        isCareer: OggDudeImporter.mapOptionalString(skillModifier?.IsCareer),
                        skillType: OggDudeImporter.mapOptionalString(skillModifier?.SkillType),
                        requirement: {
                            wearingArmor: OggDudeImporter.mapOptionalString(skillModifier?.Requirement?.WearingArmor),
                            career: OggDudeImporter.mapOptionalString(skillModifier?.Requirement?.Career),
                            specialization: OggDudeImporter.mapOptionalString(skillModifier?.Requirement?.Specialization),
                            nonCareer: OggDudeImporter.mapOptionalString(skillModifier?.Requirement?.NonCareer),
                            soakAtLeast: OggDudeImporter.mapOptionalNumber(skillModifier?.Requirement?.SoakAtLeast)
                        }
                    }
                }),

            /* Talent Modifiers Tab */

            /*
            talentModifiers: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    subSpeciesKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                    rankStart: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    rankAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    rankLimit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    requirement: new fields.SchemaField({
                        wearingArmor: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        career: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        specialization: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        nonCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        soakAtLeast: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    }, {
                        required: false,
                        label: "ITEM.TalentModifiers.Requirement.label",
                        hint: "ITEM.TalentModifiers.Requirement.hint"
                    })
                }, {
                    required: false, initial: [], label: "ITEM.TalentModifiers.label", hint: "ITEM.TalentModifiers.hint"
                }),
                {
                    required: false,
                    initial: [],
                    label: "SWES.Combat-Item.FIELDS.Categories.label",
                    hint: "SWES.Combat-Item.FIELDS.Categories.hint"
                }),
             */

            talentModifiers: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.TalentModifiers?.TalentModifier,
                (talentModifier) => {
                    return {
                        key: OggDudeImporter.mapMandatoryString("species.TalentModifiers.TalentModifier.Key", talentModifier?.Key),
                        subSpeciesKey: OggDudeImporter.mapOptionalString(talentModifier?.SubSpeciesKey),
                        rankStart: OggDudeImporter.mapOptionalNumber(talentModifier?.RankStart),
                        rankAdd: OggDudeImporter.mapOptionalNumber(talentModifier?.RankAdd),
                        rankLimit: OggDudeImporter.mapOptionalNumber(talentModifier?.RankLimit),
                        requirement: {
                            wearingArmor: OggDudeImporter.mapOptionalString(talentModifier?.Requirement?.WearingArmor),
                            career: OggDudeImporter.mapOptionalString(talentModifier?.Requirement?.Career),
                            specialization: OggDudeImporter.mapOptionalString(talentModifier?.Requirement?.Specialization),
                            nonCareer: OggDudeImporter.mapOptionalString(talentModifier?.Requirement?.NonCareer),
                            soakAtLeast: OggDudeImporter.mapOptionalNumber(talentModifier?.Requirement?.SoakAtLeast)
                        }
                    }
                }),

            /* SubSpecies List Tab */

            /*
            subSpeciesList: new fields.SetField(new fields.SchemaField({
                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                skillModifiers: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    rankStart: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                    rankLimit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                }, {required: false}), {
                    required: false,
                    initial: [],
                    label: "ITEM.SubSpeciesList.SkillModifiers.label",
                    hint: "ITEM.SubSpeciesList.SkillModifiers.hint"
                }),
                talentModifiers: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    rankAdd: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
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
                                min: 0
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
                weaponModifiers: new fields.SetField(new fields.SchemaField({
                    unarmed: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)}),
                    unarmedName: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    skillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    allSkillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                    damage: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    damageAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    crit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    critSub: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    rangeValue: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0}),
                    qualities: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                        count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 100})
                    }, {required: false}), {required: true, initial: []}),
                }, {required: false}), {
                    required: false,
                    initial: [],
                    label: "ITEM.WeaponModifiers.label",
                    hint: "ITEM.WeaponModifiers.hint"
                }),
            }), {
                required: false,
                initial: [],
                label: "ITEM.SubSpeciesList.label",
                hint: "ITEM.SubSpeciesList.hint"
            }),

            */

            subSpeciesList: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.SubSpeciesList?.SubSpecies,
                (subSpecies) => {
                    return {
                        key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.Key", subSpecies?.Key),
                        name: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.Name", subSpecies?.Name),
                        description: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.Description", subSpecies?.Description),
                        skillModifiers: OggDudeImporter.mapOptionalArray(
                            subSpecies?.SkillModifiers?.SkillModifier,
                            (skillModifier) => {
                                return {
                                    key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.SkillModifiers.SkillModifier.Key", skillModifier?.Key),
                                    rankStart: OggDudeImporter.mapOptionalNumber(skillModifier?.RankStart),
                                    rankLimit: OggDudeImporter.mapOptionalNumber(skillModifier?.RankLimit)
                                }
                            }),
                        talentModifiers: OggDudeImporter.mapOptionalArray(
                            subSpecies?.TalentModifiers?.TalentModifier,
                            (talentModifier) => {
                                return {
                                    key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.TalentModifiers.TalentModifier.Key", talentModifier?.Key),
                                    rankAdd: OggDudeImporter.mapOptionalNumber(talentModifier?.RankAdd)
                                }
                            }),
                        optionChoices: OggDudeImporter.mapOptionalArray(
                            subSpecies?.OptionChoices?.OptionChoice,
                            (optionChoice) => {
                                return {
                                    key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Key", optionChoice?.Key),
                                    name: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Name", optionChoice?.Name),
                                    options: OggDudeImporter.mapOptionalArray(
                                        optionChoice?.Options?.Option,
                                        (option) => {
                                            return {
                                                key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.Key", option?.Key),
                                                name: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.name", option?.Name),
                                                description: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.Description", option?.Description),
                                                skillModifiers: OggDudeImporter.mapOptionalArray(
                                                    option?.SkillModifiers?.SkillModifier,
                                                    (skillModifier) => {
                                                        return {
                                                            key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.SkillModifiers.SkillModifier.Key", skillModifier?.Key),
                                                            rankStart: OggDudeImporter.mapOptionalNumber(skillModifier?.RankStart)
                                                        }
                                                    })


                                            }
                                        })
                                }
                            }),
                        weaponModifiers: OggDudeImporter.mapOptionalArray(
                            subSpecies?.WeaponModifiers?.WeaponModifier,
                            (weaponModifier) => {
                                return {
                                    unarmed: OggDudeImporter.mapOptionalBoolean(weaponModifier?.Unarmed),
                                    unarmedName: OggDudeImporter.mapOptionalString(weaponModifier?.UnarmedName),
                                    skillKey: OggDudeImporter.mapOptionalString(weaponModifier?.SkillKey),
                                    allSkillKey: OggDudeImporter.mapOptionalString(weaponModifier?.AllSkillKey),
                                    damage: OggDudeImporter.mapOptionalNumber(weaponModifier?.Damage),
                                    damageAdd: OggDudeImporter.mapOptionalNumber(weaponModifier?.DamageAdd),
                                    crit: OggDudeImporter.mapOptionalNumber(weaponModifier?.Crit),
                                    critSub: OggDudeImporter.mapOptionalNumber(weaponModifier?.CritSub),
                                    rangeValue: OggDudeImporter.mapOptionalNumber(weaponModifier?.RangeValue),
                                    qualities: OggDudeImporter.mapOptionalArray(
                                        weaponModifier?.Qualities?.Quality,
                                        (quality) => {
                                            return {
                                                key: OggDudeImporter.mapOptionalString(quality?.Key),
                                                count: OggDudeImporter.mapMandatoryNumber("species.SubSpeciesList.SubSpecies.WeaponModifiers.WeaponModifier.Qualities.Quality.Count", quality?.Count)
                                            }
                                        })
                                }
                            })
                    }
                }),

            /* Option Choices Tab */

            /*
            optionChoices: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        description: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        source: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        sources: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        custom: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        options: new fields.SetField(new fields.SchemaField({
                            key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            skillModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                                rankAdd: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0
                                }),
                                rankStart: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0
                                }),
                                rankLimit: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0
                                }),
                                isCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.SkillModifiers.label",
                                hint: "ITEM.OptionChoices.Options.SkillModifiers.hint"
                            }),
                            dieModifiers: new fields.SetField(new fields.SchemaField({
                                dieModifier: new fields.SchemaField({
                                    skillKey: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
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
                                skillTraining: new fields.SchemaField({
                                    skillCount: new fields.NumberField({
                                        ...(SwesItemBaseData.requiredInteger),
                                        initial: 0,
                                        min: 0
                                    }),
                                    requirement: new fields.SchemaField({
                                        career: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                        specialization: new fields.StringField({
                                            ...(SwesItemBaseData.optionalString),
                                            initial: ""
                                        }),
                                        fromSkillType: new fields.StringField({
                                            ...(SwesItemBaseData.optionalString),
                                            initial: ""
                                        }),
                                        skillType: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                        nonCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                    }, {required: false}),
                                }, {required: false}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.StartingSkillTraining.label",
                                hint: "ITEM.OptionChoices.Options.StartingSkillTraining.hint"
                            }),
                            startingAttributes: new fields.SetField(new fields.SchemaField({
                                experience: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.StartingAttributes.label",
                                hint: "ITEM.OptionChoices.Options.StartingAttributes.hint"
                            }),
                            talentModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                                rankStart: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                                rankAdd: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                                rankLimit: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
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
             */

            optionChoices: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.OptionChoices?.OptionChoice,
                (optionChoice) => {
                    return {
                        key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Key", optionChoice?.Key),
                        name: OggDudeImporter.mapOptionalString(optionChoice?.Name),
                        description: OggDudeImporter.mapOptionalString(optionChoice?.Description),
                        source: OggDudeImporter.mapOptionalString(optionChoice?.Source),
                        sources: OggDudeImporter.mapOptionalString(optionChoice?.Sources),
                        custom: OggDudeImporter.mapOptionalString(optionChoice?.Custom),
                        options: OggDudeImporter.mapOptionalArray(
                            optionChoice?.Options?.Option,
                            (option) => {
                                return {
                                    key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.Key", option?.Key),
                                    name: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.Name", option?.Name),
                                    description: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.Description", option?.Description),
                                    skillModifiers: OggDudeImporter.mapOptionalArray(
                                        option?.SkillModifiers?.SkillModifier,
                                        (skillModifier) => {
                                            return {
                                                key: OggDudeImporter.mapOptionalString(skillModifier?.Key),
                                                rankAdd: OggDudeImporter.mapOptionalNumber(skillModifier?.RankAdd),
                                                rankStart: OggDudeImporter.mapOptionalNumber(skillModifier?.RankStart),
                                                rankLimit: OggDudeImporter.mapOptionalNumber(skillModifier?.RankLimit),
                                                isCareer: OggDudeImporter.mapOptionalString(skillModifier?.IsCareer)
                                            }
                                        }),
                                    dieModifiers: OggDudeImporter.mapOptionalArray(
                                        option?.DieModifiers?.DieModifier,
                                        (dieModifier) => {
                                            return {
                                                skillKey: OggDudeImporter.mapOptionalString(dieModifier?.SkillKey),
                                                advantageCount: OggDudeImporter.mapOptionalNumber(dieModifier?.AdvantageCount),
                                                setbackCount: OggDudeImporter.mapOptionalNumber(dieModifier?.SetbackCount),
                                                successCount: OggDudeImporter.mapOptionalNumber(dieModifier?.SuccessCount)
                                            }
                                        }),
                                    startingSkillTraining: OggDudeImporter.mapOptionalArray(
                                        option?.StartingSkillTraining?.SkillTraining,
                                        (skillTraining) => {
                                            return {
                                                skillCount: OggDudeImporter.mapMandatoryNumber("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.StartingSkillTraining.SkillTraining.SkillCount", skillTraining.SkillCount),
                                                requirement: {
                                                    career: OggDudeImporter.mapOptionalString(skillTraining?.Requirement?.Career),
                                                    specialization: OggDudeImporter.mapOptionalString(skillTraining?.Requirement?.Specialization),
                                                    fromSkillType: OggDudeImporter.mapOptionalString(skillTraining?.Requirement?.FromSkillType),
                                                    skillType: OggDudeImporter.mapOptionalString(skillTraining?.Requirement?.SkillType),
                                                    nonCareer: OggDudeImporter.mapOptionalString(skillTraining?.Requirement?.NonCareer)
                                                }
                                            }
                                        }),
                                    startingAttributes: OggDudeImporter.mapOptionalArray(
                                        option?.StartingAttributes?.StartingAttribute,
                                        (startingAttribute) => {
                                            return {
                                                experience: OggDudeImporter.mapMandatoryNumber("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.StartingAttributes.StartingAttribute.Experience", startingAttribute?.Experience)
                                            }
                                        }),
                                    talentModifiers: OggDudeImporter.mapOptionalArray(
                                        option?.TalentModifiers?.TalentModifier,
                                        (talentModifier) => {
                                            return {
                                                key: OggDudeImporter.mapMandatoryString("species.SubSpeciesList.SubSpecies.OptionChoices.OptionChoice.Options.Option.TalentModifiers.TalentModifier.Key", talentModifier?.Key),
                                                rankStart: OggDudeImporter.mapOptionalNumber(talentModifier?.RankStart),
                                                rankAdd: OggDudeImporter.mapOptionalNumber(talentModifier?.RankAdd),
                                                rankLimit: OggDudeImporter.mapOptionalNumber(talentModifier?.RankLimit)
                                            }
                                        })
                                }
                            })
                    }
                })
        }
    });
}


/**
 * Create the Species Context for the OggDude Data Import
 * @param zip
 * @param groupByDirectory
 * @param groupByType
 * @returns {{zip: {elementFileName: string, directories, content}, image: {images: (string|((buffer: Buffer, options?: ansiEscapes.ImageOptions) => string)|number|[OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|[OggDudeDataElement,OggDudeDataElement]|OggDudeContextImage|*), criteria: string, systemPath: string, worldPath: string}, folder: {name: string, type: string}, element: {jsonCriteria: string, mapper: *, type: string}}}
 * @public
 * @function
 */
export async function buildSpeciesContext(zip, groupByDirectory, groupByType) {

    console.debug("Building Species with Zip, GroupByDirectory, GroupByType", zip, groupByDirectory, groupByType);

    return {
        jsonData: await OggDudeDataElement.buildJsonDataFromDirectory(zip, groupByType.xml, "Species", "Species"),
        zip: {
            folderName: "Species",
            elementFileName: "*.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/SpeciesImages",
            worldPath: buildArmorImgWorldPath("species"),
            systemPath: buildItemImgSystemPath("species.svg"),
            images: groupByType.image,
            prefix: ''
        },
        folder: {
            name: 'Swes - Species',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Species.Species',
            mapper: speciesMapper,
            type: 'species'
        }
    };
}
