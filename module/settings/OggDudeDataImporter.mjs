/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
import OggDudeDataElement from "./models/OggDudeDataElement.mjs";

/**
 * A class responsible for configuring custom fonts for the world.
 * @extends {FormApplication}
 */
export class OggDudeDataImporter extends FormApplication {

    /**
     * An application for processing OggDude data file.
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
        let allDataElements = zipFile
            .then((zip) => {
                let dataElements = OggDudeDataElement.from(zip);
                console.log("All Data Elements:", dataElements);
                return dataElements;

            }).then((dataElements) => {
                let groupByType = OggDudeDataElement.groupByType(dataElements);
                console.log("All Directories:", groupByType.directory);
                console.log("All Images:", groupByType.xml);
                console.log("All XML:", groupByType.image);

                let groupByDirectory = OggDudeDataElement.groupByDirectory(dataElements);
                console.log("Group By Directory:", groupByDirectory);

                let xmlGroupByDirectory = OggDudeDataElement.groupByDirectory(groupByType.xml);
                console.log("XML Group By Directory:", xmlGroupByDirectory);

                return dataElements;
            })
            .catch(err => alert(err));

        const armorData = allDataElements.then((data) => {
            let groupByDirectory = OggDudeDataElement.groupByDirectory(data);
            const armorFile = OggDudeDataElement.getElementsFrom(groupByDirectory, "Data", "Armor.xml");
            return zipFile.then((zip) => {
                const armorXmlData = zip.files[armorFile.fullPath].async('text');
                return armorXmlData;
            });
        });

        armorData.then((data) => {
                console.log("All Data Armors:", data);
        });

    }

    /* -------------------------------------------- */

}
