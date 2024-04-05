/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

import {OggDudeDataImporter} from "./module/settings/OggDudeDataImporter.js";

const DEVELOPMENT_MODE = true;

function registerDevelopmentHooks() {

}

Hooks.once("init", async function () {
    console.log(`SWES | Initializing Star Wars Edge Studio Game System`);

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

    if ( DEVELOPMENT_MODE ) registerDevelopmentHooks();
});

