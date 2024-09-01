import SwesCombatItemData from "./combat-item.mjs";
import {buildMandatoryIntegerField} from "../helpers/data/utilities.mjs";

export default class SwesArmor extends SwesCombatItemData {

    static ITEM_TYPE = "Armor-Item";

    /* -------------------------------------------- */
    /*  Data Schema                                                  */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        return foundry.utils.mergeObject(super.defineSchema(), {
            defense: buildMandatoryIntegerField({
                itemType: SwesArmor.ITEM_TYPE,
                key: "defense",
                max: 20,
            }),
            soak: buildMandatoryIntegerField({
                itemType: SwesArmor.ITEM_TYPE,
                key: "soak",
                max: 20,
            })
        });
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}