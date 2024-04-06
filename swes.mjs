/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

import {OggDudeDataImporter} from "./module/settings/OggDudeDataImporter.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as models from "./module/models/_module.mjs";
import * as applications from "./module/applications/_module.mjs";

Hooks.once("init", async function () {
    console.log(`SWES | Initializing Star Wars Edge Studio Game System`);

    globalThis.swes = game.system;

    // Add custom constants for configuration.
    CONFIG.SWES = SWES;

    // Item document configuration
    CONFIG.Item.documentClass = documents.SwesItem;
    CONFIG.Item.dataModels = {
        armor: models.SwesArmor,
    };

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet(SYSTEM.id, applications.ArmorSheet, {types: ["armor"], makeDefault: true});

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

    // Active Effects are never copied to the Actor,
    // but will still apply to the Actor from within the Item
    // if the transfer property on the Active Effect is true.
    CONFIG.ActiveEffect.legacyTransferral = false;

    // Preload Handlebars templates.
    return preloadHandlebarsTemplates();
});

