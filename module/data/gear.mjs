import SwesItemBase from "./item-base.mjs";
import SwesCombatItem from "./combat-item.mjs";

export default class SwesArmor extends SwesCombatItem {

    /* -------------------------------------------- */
    /*  Data Schema                                 */
    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {
            short: new fields.StringField({...(SwesItemBase.requiredString), initial: "Short"}),
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}