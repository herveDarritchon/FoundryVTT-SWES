import SwesItemBaseData from "./item-base.mjs";
import SwesCombatItemData from "./combat-item.mjs";

export default class SwesGear extends SwesCombatItemData {

    /* -------------------------------------------- */
    /*  Data Schema                                                  */
    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {
            short: new fields.StringField({...(SwesItemBaseData.requiredString), initial: "Short"}),
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}