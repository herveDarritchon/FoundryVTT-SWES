import SwesCombatItemData from "./combat-item.mjs";
import {buildOptionalStringField} from "../helpers/data/utilities.mjs";

export default class SwesGear extends SwesCombatItemData {
    static ITEM_TYPE = "Gear-Item";

    /* -------------------------------------------- */
    /*  Data Schema                                                  */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        return foundry.utils.mergeObject(super.defineSchema(), {
            short: buildOptionalStringField({
                itemType: SwesGear.ITEM_TYPE,
                key: "short"
            }),
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}