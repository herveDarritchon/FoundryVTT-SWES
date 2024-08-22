/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    return loadTemplates([
        // Actor partials.
        'systems/swes/templates/actor/parts/actor-features.hbs',
        'systems/swes/templates/actor/parts/actor-items.hbs',
        'systems/swes/templates/actor/parts/actor-spells.hbs',
        'systems/swes/templates/actor/parts/actor-effects.hbs',
        // Item partials
        'systems/swes/templates/item/parts/item-header.hbs',
        'systems/swes/templates/item/parts/item-description.hbs',
        'systems/swes/templates/item/parts/item-effects.hbs',
        // Item attributes
        'systems/swes/templates/item/attribute-parts/combat-item/weapon/combat.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/stats.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/era-pricing.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/mods.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/weapon-modifiers.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/armor/armor.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/weapon/weapon.hbs',
        'systems/swes/templates/item/attribute-parts/combat-item/gear/gear.hbs',
    ]);
};
