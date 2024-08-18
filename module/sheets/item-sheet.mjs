// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const {HandlebarsApplicationMixin} = foundry.applications.api
const {ItemSheetV2} = foundry.applications.sheets

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class SwesArmorSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
    static ROOT_PATH = 'systems/swes/templates/item';

    static DEFAULT_OPTIONS = {
        tag: "div", // The default is "div"
        id: "swes-armor-sheet",
        position: {
            width: 520,
            height: 480,
        },
        window: {
            title: "ITEM.Sheet.armor.title",
            icon: "fas fa-gear", // You can now add an icon to the header
        }
    }

    static PARTS = {
        armorSheet: {
            classes: ['swes', 'sheet', 'item'],
            template: `${SwesArmorSheet.ROOT_PATH}/item-armor-sheet.hbs`,
//            template: `${SwesItemSheet.ROOT_PATH}/item-${this.item.type}-sheet.hbs`,
        }
    }

    get title() {
        return `ITEM.Sheet.${this.item.type}.title`;
    }

    /*    /!** @override *!/
        static get defaultOptions() {
            return foundry.utils.mergeObject(super.defaultOptions, {
                classes: ['swes', 'sheet', 'item'],
                width: 520,
                height: 480,
                tabs: [
                    {
                        navSelector: '.sheet-tabs',
                        contentSelector: '.sheet-body',
                        initial: 'description',
                    },
                ],
            });
        }*/

    /** @override */
    /*
        get template() {
            const path = 'systems/swes/templates/item';
            // Return a single sheet for all item types.
            // return `${path}/item-sheet.hbs`;

            // Alternatively, you could use the following return statement to do a
            // unique item sheet by type, like `weapon-sheet.hbs`.
            return `${path}/item-${this.item.type}-sheet.hbs`;
        }
    */

    /* -------------------------------------------- */

    async _prepareContext() {
        const context = this.document;

        // Add the item's data to context.data for easier access, as well as flags.
        console.log("Armor context", context);

        return context;
    }

    /* -------------------------------------------- */

    async _preparePartContext(partId, context) {
        context.partId = `${this.id}-${partId}`;

        // Retrieve the roll data for TinyMCE editors.
        context.rollData = this.item.getRollData();

        return context;
    }

    /*
        /!** @override *!/
        getData() {
            // Retrieve base data structure.
            const context = super.getData();

            // Use a safe clone of the item data for further operations.
            const itemData = context.data;

            // Retrieve the roll data for TinyMCE editors.
            context.rollData = this.item.getRollData();

            // Add the item's data to context.data for easier access, as well as flags.
            context.system = itemData.system;
            context.flags = itemData.flags;

            // Prepare active effects for easier access
            context.effects = prepareActiveEffectCategories(this.item.effects);

            return context;
        }
    */

    /* -------------------------------------------- */

/*    _onRender(context, options) {
        this.element.querySelector(".effect-control").addEventListener("click", (ev) => onManageActiveEffect(ev, this.item));
        // We will deal with reset later
    }*/

    /** @override */
    /*    activateListeners(html) {
            super.activateListeners(html);

            // Everything below here is only needed if the sheet is editable
            if (!this.isEditable) return;

            // Roll handlers, click handlers, etc. would go here.

            // Active Effect management
            html.on('click', '.effect-control', (ev) =>
                onManageActiveEffect(ev, this.item)
            );
        }*/
}
