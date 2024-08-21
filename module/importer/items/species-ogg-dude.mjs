import {buildArmorImgWorldPath, buildItemImgSystemPath} from "../../settings/directories.mjs";
import OggDudeImporter from "../oggDude.mjs";
import {buildMod, buildWeaponModifiers} from "./combat-item-mapper.mjs";

/**
 * Species Array Mapper : Map the Species XML data to the SwesArmor object array.
 * @param species {Array} The Species data from the XML file.
 * @returns {Array} The SwesSpecies object array.
 * @public
 * @function
 * @name speciesMapper
 */
export function speciesMapper(species) {
    return species.map((xmlArmor) => {
        return {
            name: OggDudeImporter.mapMandatoryString("species.Name", xmlArmor.Name),
            key: OggDudeImporter.mapMandatoryString("species.Key", xmlArmor.Key),
            description: OggDudeImporter.mapMandatoryString("species.Description", xmlArmor.Description),
            soak: OggDudeImporter.mapOptionalNumber(xmlArmor.Soak),
            defense: OggDudeImporter.mapOptionalNumber(xmlArmor.Defense),
            encumbrance: OggDudeImporter.mapOptionalNumber(xmlArmor.Encumbrance),
            price: OggDudeImporter.mapMandatoryNumber("species.Price", xmlArmor.Price),
            rarity: OggDudeImporter.mapMandatoryNumber("species.Rarity", xmlArmor.Rarity),
            HP: OggDudeImporter.mapOptionalNumber(xmlArmor.HP),
            restricted: OggDudeImporter.mapOptionalBoolean(xmlArmor.Restricted),
            type: OggDudeImporter.mapOptionalString(xmlArmor.Type),
            sources: OggDudeImporter.mapOptionalArray(
                xmlArmor?.Sources?.Source,
                (source) => {
                    return {description: source._, page: source.Page}
                }),
            categories: OggDudeImporter.mapOptionalArray(xmlArmor?.Categories?.Category, (category) => category),

            mods: OggDudeImporter.mapOptionalArray(xmlArmor?.BaseMods?.Mod, (mod) => buildMod(mod)),

            weaponModifiers: buildWeaponModifiers(xmlArmor?.WeaponModifiers?.WeaponModifier),

            eraPricing: OggDudeImporter.mapOptionalArray(xmlArmor?.EraPricing?.Era, (eraPrice) => {
                return {
                    name: OggDudeImporter.mapMandatoryString("species.EraPrice.Name", eraPrice.Name),
                    price: OggDudeImporter.mapMandatoryString("species.EraPrice.Price", eraPrice.Price),
                    rarity: OggDudeImporter.mapMandatoryString("species.EraPrice.Rarity", eraPrice.Rarity),
                    restricted: OggDudeImporter.mapMandatoryBoolean("species.EraPrice.Restricted", eraPrice.Restricted)
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
export function buildSpeciesContext(zip, groupByDirectory, groupByType) {

    return {
        zip: {
            elementFileName: "Species.xml",
            content: zip,
            directories: groupByDirectory
        },
        image: {
            criteria: "Data/EquipmentImages/Species",
            worldPath: buildArmorImgWorldPath("species"),
            systemPath: buildItemImgSystemPath("species.svg"),
            images: groupByType.image
        },
        folder: {
            name: 'Swes - Species',
            type: 'Item'
        },
        element: {
            jsonCriteria: 'Species.Species',
            mapper: armorMapper,
            type: 'species'
        }
    };
}
