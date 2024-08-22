import SwesItemBaseData from "./item-base.mjs";

export default class SwesSpecies extends SwesItemBaseData {

    static LOCALIZATION_PREFIXES = ["SWES.Species"]

    /* -------------------------------------------- */
    /*  Data Schema                                                 */
    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {
            defense: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 20}),
            soak: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 20}),
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}