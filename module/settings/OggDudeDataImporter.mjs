/**
 * @typedef {object} FormApplication
 * @typedef {object} NewDataFile
 * @property {string} [src=""]          The OggDude Data file.
 */

import OggDudeImporter from "../importer/oggDude.mjs";
// Similar syntax to importing, but note that
// this is object destructuring rather than an actual import

const {ApplicationV2, HandlebarsApplicationMixin} = foundry.applications.api


/**
 * An application for processing OggDude data file. This application is used to import data from OggDude's generator.
 * @extends {FormApplication}
 */
export class OggDudeDataImporter extends HandlebarsApplicationMixin(ApplicationV2) {

    _domainNames = ["weapon", "armor", "gear", "species"];

    domains = this._initializeDomains(this._domainNames);
    zipFile = null;

    /* -------------------------------------------- */

    /**
     * Initialize the domains for the OggDude data importer.
     * @param domainNames {string[]} The names of the domains to initialize.
     * @returns {object[]} The initialized domains.
     * @private
     */
    _initializeDomains(domainNames) {
        return domainNames.map(name => {
            return {
                id: name,
                label: `SETTINGS.OggDudeDataImporter.loadWindow.domains.${name}`,
                checked: false
            };
        });
    }

    /* -------------------------------------------- */

    static PARTS = {
        swesSettings: {
            template: 'systems/swes/templates/settings/oggDudeDataImporter.hbs',
        }
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    static DEFAULT_OPTIONS = {
        id: 'swesSettings-form',
        tag: "form",
        form: {
            handler: OggDudeDataImporter._onSubmit,
            closeOnSubmit: false,
            submitOnChange: false,
        },
        window: {
            icon: 'fas fa-cogs',
            title: 'SETTINGS.OggDudeDataImporter.loadWindow.menuLabel',
            contentClasses: ["standard-form"],
        },
        //popOut: true,
        position: {
            width: 640,
            height: "auto",
        },
        actions: {
            resetAction: OggDudeDataImporter.resetAction,
            loadAction: OggDudeDataImporter.loadAction,
            toggleDomainAction: OggDudeDataImporter.toggleDomainAction
        },
        footer: {
            template: "templates/generic/form-footer.hbs",
        },
    }

    /* -------------------------------------------- */

    _prepareContext(options) {
        //const setting = game.settings.get("swesSettings", "config");
        console.log(`Preparing context: ${options}`, this);
        return {
            domains: this.domains,
            domainSelectionDisabled: this.noZipFileSelected(),
            loadButtonDisabled: this.noZipFileSelected() || this._noDomainSelected(),
            zipFile: this.zipFile,
        }
    }

    noZipFileSelected() {
        return this.zipFile == null;
    }

    /* -------------------------------------------- */

    _noDomainSelected() {
        return this.domains.filter(domain => domain.checked).length === 0;
    }

    /* -------------------------------------------- */

    _onRender(context, options) {
        if (this.element.querySelector("#oggdude-zip-file") != null) {
            this.element.querySelector("#oggdude-zip-file").addEventListener("change", this._onOggdudeZipFileChange.bind(this));
        }
        // We will deal with reset later
    }

    /* -------------------------------------------- */

    static async loadAction(_event, target) {
        console.log(`Load OggDude Data: {}`, this);
        await OggDudeImporter.processOggDudeData(this.zipFile, this.domains);
    }


    /* -------------------------------------------- */
    /**
     * Convert a string to a boolean value.
     * @param value {string} The value to convert.
     * @returns {boolean|boolean} The converted value.
     */
    static toBoolean(value) {
        return this ? value.toLowerCase() === "true" : false;
    }

    /* -------------------------------------------- */

    static async toggleDomainAction(_event, target) {
        if ( this.noZipFileSelected()){
            return;
        }
        const name = target.dataset.domainName;
        const value = OggDudeDataImporter.toBoolean(target.dataset.domainChecked);
        console.log(`Toggle Domain [${name}/${value}]: {}`, _event, target);
        this.domains = this.domains.map(domain => {
            if (domain.id === name) {
                domain.checked = !value;
            }
            return domain;
        });
        await this.render();
    }

    /* -------------------------------------------- */

    async _onSubmit(event, form, formData) {
        const settings = foundry.utils.expandObject(formData.object);
        /*await Promise.all(
            Object.entries(settings).map(([key, value]) => game.settings.set("foo", key, value))
        );*/
        console.log(`Saving settings: ${settings}`, this);
    }

    /* -------------------------------------------- */

    static async resetAction(_event, target) {
        //await game.settings.set("foo", "config", {});
        console.log(`Resetting settings: {}`, this);
        this.zipFile = null;
        this.domains = this._initializeDomains(this._domainNames);
        await this.render();
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async close(options = {}) {
        await super.close(options);
    }

    /* -------------------------------------------- */

    /** @inheritdoc */
    async _onOggdudeZipFileChange(event) {
        this.zipFile = event.target.files[0];
        console.log(`File changed: {}`, event, this.zipFile);
        await this.render();
    }

    /* -------------------------------------------- */

    /**
     *
     * @param {Event} event  The originating click event
     * @private
     */
    async _onloadButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = $("form.oggDude-data-importer")[0];
        const importedFile = form['zip-file'].files[0];

        await OggDudeImporter.processOggDudeData(importedFile, this.domains);

        await this.close({});
    }
}
