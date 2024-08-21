import {prepareActiveEffectCategories} from '../helpers/effects.mjs';

// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import
const {HandlebarsApplicationMixin} = foundry.applications.api
const {ItemSheetV2} = foundry.applications.sheets

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class SwesItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
    constructor(options = {}) {
        super(options);
    }

    static ROOT_PATH = 'systems/swes/templates/item';

    /** @override */
    static DEFAULT_OPTIONS = {
        tag: "div", // The default is "div"
        classes: ['swes', 'sheet', 'item', 'combat-item'],
        form: {
            submitOnChange: true,
        },
        position: {
            width: 520,
            height: 480,
        },
        actions: {
            onEditImage: this._onEditImage,
            viewDoc: this._viewEffect,
            createDoc: this._createEffect,
            deleteDoc: this._deleteEffect,
            toggleEffect: this._toggleEffect,
        },
        window: {
            title: "ITEM.Sheet.armor.title",
            icon: "fas fa-gear", // You can now add an icon to the header
        }
    }

    /** @override */
    static PARTS = {
        header: {
            template: 'systems/swes/templates/item/parts/item-header.hbs',
        },
        tabs: {
            // Foundry-provided generic template
            template: 'templates/generic/tab-navigation.hbs',
        },
        description: {
            template: 'systems/swes/templates/item/parts/item-description.hbs',
        },
        attributesMods: {
            template: 'systems/swes/templates/item/attribute-parts/combat-item/mods.hbs',
        },
        attributesStats: {
            template: 'systems/swes/templates/item/attribute-parts/combat-item/stats.hbs',
        },
        attributesWeaponModifiers: {
            template: 'systems/swes/templates/item/attribute-parts/combat-item/weapon-modifiers.hbs',
        },
        attributesEraPricing: {
            template: 'systems/swes/templates/item/attribute-parts/combat-item/era-pricing.hbs',
        },
        effects: {
            template: 'systems/swes/templates/item/parts/item-effects.hbs',
        },
    }

    /* -------------------------------------------- */

    /* -------------------------------------------- */

    /** @override */
    async _prepareContext(options) {
        return {
            // Validates both permissions and compendium status
            editable: this.isEditable,
            owner: this.document.isOwner,
            limited: this.document.limited,
            // Add the item document.
            item: this.item,
            // Adding system and flags for easier access
            system: this.item.system,
            flags: this.item.flags,
            // Adding a pointer to CONFIG.SWES
            config: CONFIG.SWES,
            // You can factor out context construction to helper functions
            tabs: this._getTabs(options.parts),
            // Necessary for formInput and formFields helpers
            fields: this.document.schema.fields,
            systemFields: this.document.system.schema.fields,
        };
    }

    /* -------------------------------------------- */

    /** @override */
    _configureRenderOptions(options) {
        super._configureRenderOptions(options);
        // Not all parts always render
        options.parts = ['header', 'tabs', 'description'];
        // Don't show the other tabs if only limited view
        if (this.document.limited) return;
        // Control which parts show based on document subtype
        switch (this.document.type) {
            case 'armor':
                options.parts.push('attributesStats', 'attributesMods', 'attributesWeaponModifiers', 'attributesEraPricing', 'effects');
                break;
            case 'weapon':
                options.parts.push('attributesStats', 'attributesMods', 'attributesWeaponModifiers', 'attributesEraPricing', 'effects');
                break;
            case 'gear':
                options.parts.push('attributesStats', 'attributesMods', 'attributesWeaponModifiers', 'attributesEraPricing', 'effects');
                break;
        }
    }

    /* -------------------------------------------- */

    /** @override */
    async _preparePartContext(partId, context) {
        switch (partId) {
            case 'attributesEraPricing':
            case 'attributesMods':
            case 'attributesStats':
            case 'attributesWeaponModifiers':
                // Necessary for preserving active tab on re-render
                context.tab = context.tabs[partId];
                break;
            case 'description':
                context.tab = context.tabs[partId];
                // Enrich description info for display
                // Enrichment turns text like `[[/r 1d20]]` into buttons
                context.enrichedDescription = await TextEditor.enrichHTML(
                    this.item.system.description,
                    {
                        // Whether to show secret blocks in the finished html
                        secrets: this.document.isOwner,
                        // Data to fill in for inline rolls
                        rollData: this.item.getRollData(),
                        // Relative UUID resolution
                        relativeTo: this.item,
                    }
                );
                break;
            case 'effects':
                context.tab = context.tabs[partId];
                // Prepare active effects for easier access
                context.effects = prepareActiveEffectCategories(this.item.effects);
                break;
        }
        return context;
    }

    /* -------------------------------------------- */

    /**
     * Generates the data for the generic tab navigation template
     * @param {string[]} parts An array of named template parts to render
     * @returns {Record<string, Partial<ApplicationTab>>}
     * @protected
     */
    _getTabs(parts) {
        // If you have sub-tabs this is necessary to change
        const tabGroup = 'primary';
        // Default tab for first time it's rendered this session
        if (!this.tabGroups[tabGroup]) this.tabGroups[tabGroup] = 'attributesStats';
        return parts.reduce((tabs, partId) => {
            const tab = {
                cssClass: '',
                group: tabGroup,
                // Matches tab property to
                id: '',
                // FontAwesome Icon, if you so choose
                icon: '',
                // Run through localization
                label: 'SWES.Item.Tabs.',
            };
            switch (partId) {
                case 'header':
                case 'tabs':
                    return tabs;
                case 'description':
                    tab.id = 'description';
                    tab.label += 'Description';
                    break;
                case 'attributesStats':
                    tab.id = 'attributesStats';
                    tab.label += 'AttributesStats';
                    break;
                case 'attributesMods':
                    tab.id = 'attributesMods';
                    tab.label += 'AttributesMods';
                    break;
                case 'attributesWeaponModifiers':
                    tab.id = 'attributesWeaponModifiers';
                    tab.label += 'AttributesWeaponModifiers';
                    break;
                case 'attributesEraPricing':
                    tab.id = 'attributesEraPricing';
                    tab.label += 'AttributesEraPricing';
                    break;
                case 'effects':
                    tab.id = 'effects';
                    tab.label += 'Effects';
                    break;
            }
            if (this.tabGroups[tabGroup] === tab.id) tab.cssClass = 'active';
            tabs[partId] = tab;
            return tabs;
        }, {});
    }

    /**
     * Handle changing a Document's image.
     *
     * @this SwesItemSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @returns {Promise}
     * @protected
     */
    static async _onEditImage(event, target) {
        const attr = target.dataset.edit;
        const current = foundry.utils.getProperty(this.document, attr);
        const {img} =
        this.document.constructor.getDefaultArtwork?.(this.document.toObject()) ??
        {};
        const fp = new FilePicker({
            current,
            type: 'image',
            redirectToRoot: img ? [img] : [],
            callback: (path) => {
                this.document.update({[attr]: path});
            },
            top: this.position.top + 40,
            left: this.position.left + 10,
        });
        return fp.browse();
    }

    /**
     * Renders an embedded document's sheet
     *
     * @this SwesItemSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _viewEffect(event, target) {
        const effect = this._getEffect(target);
        effect.sheet.render(true);
    }

    /**
     * Handles item deletion
     *
     * @this SwesItemSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @protected
     */
    static async _deleteEffect(event, target) {
        const effect = this._getEffect(target);
        await effect.delete();
    }

    /**
     * Handle creating a new Owned Item or ActiveEffect for the actor using initial data defined in the HTML dataset
     *
     * @this SwesItemSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @private
     */
    static async _createEffect(event, target) {
        // Retrieve the configured document class for ActiveEffect
        const aeCls = getDocumentClass('ActiveEffect');
        // Prepare the document creation data by initializing it a default name.
        // As of v12, you can define custom Active Effect subtypes just like Item subtypes if you want
        const effectData = {
            name: aeCls.defaultName({
                // defaultName handles an undefined type gracefully
                type: target.dataset.type,
                parent: this.item,
            }),
        };
        // Loop through the dataset and add it to our effectData
        for (const [dataKey, value] of Object.entries(target.dataset)) {
            // These data attributes are reserved for the action handling
            if (['action', 'documentClass'].includes(dataKey)) continue;
            // Nested properties require dot notation in the HTML, e.g. anything with `system`
            // An example exists in spells.hbs, with `data-system.spell-level`
            // which turns into the dataKey 'system.spellLevel'
            foundry.utils.setProperty(effectData, dataKey, value);
        }

        // Finally, create the embedded document!
        await aeCls.create(effectData, {parent: this.item});
    }

    /**
     * Determines effect parent to pass to helper
     *
     * @this SwesItemSheet
     * @param {PointerEvent} event   The originating click event
     * @param {HTMLElement} target   The capturing HTML element which defined a [data-action]
     * @private
     */
    static async _toggleEffect(event, target) {
        const effect = this._getEffect(target);
        await effect.update({disabled: !effect.disabled});
    }

    /** Helper Functions */

    /**
     * Fetches the row with the data for the rendered embedded document
     *
     * @param {HTMLElement} target  The element with the action
     * @returns {HTMLLIElement} The document's row
     */
    _getEffect(target) {
        const li = target.closest('.effect');
        return this.item.effects.get(li?.dataset?.effectId);
    }
}
