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
            key: OggDudeImporter.mapMandatoryString("gear.Key", xmlSpecies.Key),
            description: OggDudeImporter.mapMandatoryString("species.Description", xmlSpecies?.Description),

            startingChars: {
                brawn: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Brawn", xmlSpecies?.StartingChars?.Brawn),
                agility: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Agility", xmlSpecies?.StartingChars?.Agility),
                intellect: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Intellect", xmlSpecies?.StartingChars?.Intellect),
                cunning: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Cunning", xmlSpecies?.StartingChars?.Cunning),
                willpower: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Willpower", xmlSpecies?.StartingChars?.Willpower),
                presence: OggDudeImporter.mapMandatoryNumber("species.StartingChars.Presence", xmlSpecies?.StartingChars?.Presence),
                requirement: {
                    wearingArmor: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.WearingArmor),
                    career: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.Career),
                    specialization: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.Specialization),
                    nonCareer: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.NonCareer),
                    soakAtLeast: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingChars?.Requirement?.SoakAtLeast),
                    wieldingMelee: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.WieldingMelee),
                    wieldingBrawl: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.WieldingBrawl),
                    wieldingLightsaber: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingChars?.Requirement?.WieldingLightsaber)
                }
            },

            /* Starting Attributes Tab */

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
                    wearingArmor: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.WearingArmor),
                    career: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.Career),
                    specialization: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.Specialization),
                    nonCareer: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.NonCareer),
                    soakAtLeast: OggDudeImporter.mapOptionalNumber(xmlSpecies?.StartingAttrs?.Requirement?.SoakAtLeast),
                    wieldingMelee: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.WieldingMelee),
                    wieldingBrawl: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.WieldingBrawl),
                    wieldingLightsaber: OggDudeImporter.mapOptionalBoolean(xmlSpecies?.StartingAttrs?.Requirement?.WieldingLightsaber)
                }
            },

            name: OggDudeImporter.mapMandatoryString("gear.Name", xmlSpecies?.Name),
            sources: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),

            /* Skill Modifiers Tab */

            skillModifiers: OggDudeImporter.mapOptionalArray(
                xmlSpecies?.SkillModifiers?.SkillModifier,
                (skillModifier) => {
                    return {
                        key: OggDudeImporter.mapOptionalString(skillModifier?.Key),
                        subSpeciesKey: OggDudeImporter.mapOptionalString(skillModifier?.SubSpeciesKey),
                        rankStart: OggDudeImporter.mapOptionalNumber(skillModifier?.RankStart),
                        rankAdd: OggDudeImporter.mapOptionalNumber(skillModifier?.RankAdd),
                        rankLimit: OggDudeImporter.mapOptionalNumber(skillModifier?.RankLimit),
                        isCareer: OggDudeImporter.mapOptionalBoolean(skillModifier?.IsCareer),
                        skillType: OggDudeImporter.mapOptionalString(skillModifier?.SkillType),
                        requirement: {
                            wearingArmor: OggDudeImporter.mapOptionalBoolean(skillModifier?.Requirement?.WearingArmor),
                            career: OggDudeImporter.mapOptionalBoolean(skillModifier?.Requirement?.Career),
                            specialization: OggDudeImporter.mapOptionalBoolean(skillModifier?.Requirement?.Specialization),
                            nonCareer: OggDudeImporter.mapOptionalBoolean(skillModifier?.Requirement?.NonCareer),
                            soakAtLeast: OggDudeImporter.mapOptionalNumber(skillModifier?.Requirement?.SoakAtLeast)
                        }
                    }
                }),

            /* Talent Modifiers Tab */

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
                            wearingArmor: OggDudeImporter.mapOptionalBoolean(talentModifier?.Requirement?.WearingArmor),
                            career: OggDudeImporter.mapOptionalBoolean(talentModifier?.Requirement?.Career),
                            specialization: OggDudeImporter.mapOptionalBoolean(talentModifier?.Requirement?.Specialization),
                            nonCareer: OggDudeImporter.mapOptionalBoolean(talentModifier?.Requirement?.NonCareer),
                            soakAtLeast: OggDudeImporter.mapOptionalNumber(talentModifier?.Requirement?.SoakAtLeast)
                        }
                    }
                }),

            /* SubSpecies List Tab */

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
                                                    career: OggDudeImporter.mapOptionalBoolean(skillTraining?.Requirement?.Career),
                                                    specialization: OggDudeImporter.mapOptionalBoolean(skillTraining?.Requirement?.Specialization),
                                                    fromSkillType: OggDudeImporter.mapOptionalBoolean(skillTraining?.Requirement?.FromSkillType),
                                                    skillType: OggDudeImporter.mapOptionalBoolean(skillTraining?.Requirement?.SkillType),
                                                    nonCareer: OggDudeImporter.mapOptionalBoolean(skillTraining?.Requirement?.NonCareer)
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
