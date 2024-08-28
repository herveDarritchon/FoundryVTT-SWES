import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";
import OggDudeDataElement from "../../settings/models/OggDudeDataElement.mjs";

/**
 * Species Array Mapper : Map the Species XML data to the SwesArmor object array.
 * @param careers {Array} The Species data from the XML file.
 * @returns {Array} The SwesSpecies object array.
 * @public
 * @function
 * @name speciesMapper
 */
export function careerMapper(careers) {
    return careers.map((xmlCareer) => {
        console.debug("[CareerMapper] Mapping Career to FVTT Item Object", xmlCareer);
        return {
            /*
return foundry.utils.mergeObject(super.defineSchema(), {
            careerSkills: new fields.ArrayField({
                key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                required: false,
                initial: [],
                label: "SWES.Career.CareerSkills.label",
                hint: "SWES.Career.CareerSkills.hint"
            }),
            specializations: new fields.ArrayField({
                key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                required: false,
                initial: [],
                label: "SWES.Career.Specializations.label",
                hint: "SWES.Career.Specializations.hint"
            }),
            attributes: new fields.SchemaField({
                woundThreshold: new fields.NumberField({
                    ...(SwesItemBaseData.requiredInteger),
                    initial: 0,
                    min: 0,
                    max: 20
                }),
                strainThreshold: new fields.NumberField({
                    ...(SwesItemBaseData.requiredInteger),
                    initial: 0,
                    min: 0,
                    max: 20
                }),
                defenseRanged: new fields.NumberField({
                    ...(SwesItemBaseData.optionalInteger),
                    initial: 0,
                    min: 0,
                    max: 10
                }),
                defenseMelee: new fields.NumberField({
                    ...(SwesItemBaseData.optionalInteger),
                    initial: 0,
                    min: 0,
                    max: 10
                }),
                soakValue: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                experience: new fields.NumberField({
                    ...(SwesItemBaseData.requiredInteger),
                    initial: 0,
                    min: -50,
                    max: 150
                }),
                forceRating: new fields.NumberField({
                    ...(SwesItemBaseData.optionalInteger),
                    initial: 0,
                    min: 0,
                    max: 10
                }),
                encumbranceBonus: new fields.NumberField({
                    ...(SwesItemBaseData.optionalInteger),
                    initial: 0,
                    min: 0,
                    max: 10
                }),
                requirement: new fields.SchemaField({
                    wearingArmor: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                    career: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                    specialization: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                    nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                    soakAtLeast: new fields.NumberField({
                        ...(SwesItemBaseData.requiredInteger),
                        initial: 0,
                        min: 0,
                        max: 10
                    })
                }, {
                    required: false,
                    label: "ITEM.StartingAttrs.Requirement.label",
                    hint: "ITEM.StartingAttrs.Requirement.hint"
                })
            }, {
                required: true, label: "ITEM.StartingAttrs.label", hint: "ITEM.StartingAttrs.hint"
            }),
            freeRanks: new fields.NumberField({
                ...(SwesItemBaseData.optionalInteger),
                initial: 0,
                min: 0,
                max: 10
            })
        }
    );
 */


            name: OggDudeImporter.mapMandatoryString("armor.Name", xmlCareer.Name),
            key: OggDudeImporter.mapMandatoryString("armor.Key", xmlCareer.Key),

            /* Starting Description Tab */
            description: OggDudeImporter.mapMandatoryString("careers.Description", xmlCareer?.Description),

            sources: OggDudeImporter.mapOptionalArray(
                xmlCareer?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),

            /* Starting Career Skills Tab */
            careerSkills: OggDudeImporter.mapOptionalArray(xmlCareer?.CareerSkills, (skill) => skill.Key),

            /* Starting Career Skills Tab */
            careerSpecializations: OggDudeImporter.mapOptionalArray(xmlCareer?.Specializations, (specialization) => specialization.Key),

            /* Starting Career Attributes Tab */
            attributes: {
                woundThreshold: OggDudeImporter.mapMandatoryNumber("careers.WoundThreshold", xmlCareer?.WoundThreshold),
                strainThreshold: OggDudeImporter.mapMandatoryNumber("careers.StrainThreshold", xmlCareer?.StrainThreshold),
                defenseRanged: OggDudeImporter.mapOptionalNumber(xmlCareer?.DefenseRanged),
                defenseMelee: OggDudeImporter.mapOptionalNumber(xmlCareer?.DefenseMelee),
                soakValue: OggDudeImporter.mapOptionalNumber(xmlCareer?.SoakValue),
                experience: OggDudeImporter.mapMandatoryNumber("careers.Experience", xmlCareer?.Experience),
                forceRating: OggDudeImporter.mapOptionalNumber(xmlCareer?.ForceRating),
                encumbranceBonus: OggDudeImporter.mapOptionalNumber(xmlCareer?.EncumbranceBonus),
                requirement: {
                    wearingArmor: OggDudeImporter.mapOptionalBoolean(xmlCareer?.Requirement?.WearingArmor),
                    career: OggDudeImporter.mapOptionalBoolean(xmlCareer?.Requirement?.Career),
                    specialization: OggDudeImporter.mapOptionalBoolean(xmlCareer?.Requirement?.Specialization),
                    nonCareer: OggDudeImporter.mapOptionalBoolean(xmlCareer?.Requirement?.NonCareer),
                    soakAtLeast: OggDudeImporter.mapMandatoryNumber("careers.Requirement.SoakAtLeast", xmlCareer?.Requirement?.SoakAtLeast)
                }
            },
            freeRanks: OggDudeImporter.mapOptionalNumber(xmlCareer?.FreeRanks)
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
export async function buildCareerContext(zip, groupByDirectory, groupByType) {

    console.debug("Building Career with Zip, GroupByDirectory, GroupByType", zip, groupByDirectory, groupByType);

    return {
        jsonData: await OggDudeDataElement.buildJsonDataFromDirectory(zip, groupByType.xml, "Careers", "Career"),
        zip: {
            folderName: "Career",
            elementFileName: "*.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            worldPath: buildArmorImgWorldPath("careers"),
            systemPath: buildItemImgSystemPath("career.svg"),
            images: groupByType.image,
            prefix: ''
        },
        folder: {
            name: 'Swes - Careers',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Careers.Career',
            mapper: careerMapper,
            type: 'career'
        }
    };
}
