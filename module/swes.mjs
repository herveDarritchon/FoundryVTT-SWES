// Import document classes.
import {SwesActor} from './documents/actor.mjs';
// Import sheet classes.
import {SwesActorSheet} from './sheets/actor-sheet.mjs';
import { SwesItemSheet} from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { SWES } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';
import {OggDudeDataImporter} from "./settings/OggDudeDataImporter.mjs";
import SwesArmor from "./data/gear.mjs";
import SwesWeapon from "./data/weapon.mjs";
import SwesGear from "./data/gear.mjs";
import SwesSpecies from "./data/species.mjs";
import {SwesItem} from "./documents/item.mjs";

// Add key classes to the global scope so they can be more easily used
// by downstream developers
globalThis.swes = {
  documents: {
    SwesActor,
    SwesArmor,
    SwesWeapon,
    SwesGear,
    SwesSpecies,
  },
  applications: {
    SwesActorSheet,
    SwesItemSheet,
  },
  utils: {
    rollItemMacro,
  },
};

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.swes = {
    SwesActor,
    SwesItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.SWES = SWES;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = SwesActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.swesCharacter,
    npc: models.swesNPC
  }
  CONFIG.Item.documentClass = SwesItem;
  CONFIG.Item.dataModels = {
    armor: models.SwesArmor,
    weapon: models.SwesWeapon,
    gear: models.SwesGear,
    species: models.SwesSpecies,
  }

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('swes', SwesActorSheet, {
    makeDefault: true,
    label: 'SWES.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('swes', SwesItemSheet, {
    makeDefault: true,
    label: 'SWES.SheetLabels.Item',
  });

  // OggDude Data Importer settings
  game.settings.registerMenu("swes", "oggDudeDataImporter", {
    name: game.i18n.localize("SETTINGS.OggDudeDataImporter.name"),
    hint: game.i18n.localize("SETTINGS.OggDudeDataImporter.hint"),
    label: game.i18n.localize("SETTINGS.OggDudeDataImporter.label"),
    icon: "fa-solid fa-book-journal-whills",
    type: OggDudeDataImporter,
    scope: "world",
    config: true,
    restricted: true
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.swes.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'swes.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}
