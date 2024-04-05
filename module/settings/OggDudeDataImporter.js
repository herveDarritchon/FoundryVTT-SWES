/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import {OggDudeDataElement} from "./models/OggDudeDataElement.js";

/**
 * A class responsible for configuring custom fonts for the world.
 * @extends {FormApplication}
 */
export class OggDudeDataImporter extends FormApplication {

    /**
     * An application for processing OggDude fdata ile.
     * @param {NewDataFile} [object]  The default settings for new font definition creation.
     * @param {object} [options]            Additional options to configure behaviour.
     */
    constructor(object = {}, options = {}) {
        foundry.utils.mergeObject(object, {
            src: "",
        });
        super(object, options);
    }

    /* -------------------------------------------- */

    /**
     * The currently selected data file.
     * @type {{zipFile: file}|null}
     */
    #selected = null;

    /* -------------------------------------------- */

    /** @inheritdoc */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            title: game.i18n.localize('SETTINGS.OggDudeDataImporter.loadWindow.menuLabel'),
            id: 'swesSettings',
            template: 'systems/swes/templates/settings/oggDudeDataImporter.hbs',
            popOut: true,
            icon: 'fas fa-cogs',
            width: 400,
            height: "auto",
            closeOnSubmit: false,
            submitOnChange: true
        });
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    getData(options = {}) {
        return {};
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    activateListeners(html) {
        super.activateListeners(html);

        html.find(".load-button.control").click(this._onloadButtonClick.bind(this));

    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _updateObject(event, formData) {
        foundry.utils.mergeObject(this.object, formData);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async close(options = {}) {
        await super.close(options);
        //if ( this.#fontsModified ) return SettingsConfig.reloadConfirm({world: true});
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _onChangeInput(event) {
        return super._onChangeInput(event);
    }

    /* -------------------------------------------- */

    /**
     *
     * @param {Event} event  The originating click event
     * @private
     */
    _onloadButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = $("form.oggDude-data-importer")[0];
        const importedFile = form['zip-file'].files[0];
        const zipFile = new OggDudeImporter().load(importedFile);
        zipFile
            .then((zip) => {
                let dataElements = OggDudeDataElement.from(zip);
                console.log("Data Elements:", dataElements);

            })
            .catch(err => alert(err));
    }

    /* -------------------------------------------- */

}
