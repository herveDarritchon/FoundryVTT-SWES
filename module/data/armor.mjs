import SwesItemBase from "./item-base.mjs";
import SwesCombatItem from "./combat-item.mjs";

export default class SwesArmor extends SwesCombatItem {

    /* -------------------------------------------- */
    /*  Data Schema                                                  */
    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {
            defense: new fields.NumberField(
                {...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20}
            ),
            soak: new fields.NumberField({...(SwesItemBase.requiredInteger), initial: 0, min: 0, max: 20}),
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}