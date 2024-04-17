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

        /**
         * Map a String value, if it is not present, return an empty string.
         * @param label {string} The label of the element.
         * @param value {string} The value of the element.
         * @returns {string}
         */
        function mapMandatoryString(label, value) {
            if (value == null || typeof value !== "string") {
                console.error(`Value ${label} is mandatory !`);
                return "";
            }
            return value;
        }

        /**
         * Map an optional String value, if it is not present, return an empty string.
         * @param value {string} The value of the element.
         * @returns {string}
         */
        function mapOptionalString(value) {
            return typeof value === "string" ? value : "";
        }

        /**
         * Map a String value to a Number, if it is not present, return 0.
         * @param label {string} The label of the element.
         * @param value {string} The value of the element.
         * @returns {number}
         */
        function mapMandatoryNumber(label, value) {
            if (value == null || typeof value !== "string") {
                console.error(`Value ${label} is mandatory !`);
                return 0;
            }
            return parseInt(value) || 0;
        }

        /**
         * Map an optional Number value, if it is not present, return 0.
         * @param value {string} The value of the element.
         * @returns {number|number}
         */
        function mapOptionalNumber(value) {
            return parseInt(value) || 0;
        }

        /**
         * Map an optional array value, if it is not present, return an empty array.
         * @param value {Array} The value of the element.
         * @param mapper {function} The function to map the value.
         * @returns {*[]}
         */
        function mapOptionalArray(value, mapper) {
            if (value && Array.isArray(value)) {
                return value.map((v) => {
                    console.log("value:", v);
                    return mapper(v)
                });
            }
            if (typeof value === "object" && value !== {}) {
                console.log("isObject !");
                return [mapper(value)];
            }
            return [];
        }

        function armorMapper(armors) {
            console.log("[armorMapper] - All Armors:", armors);
            return armors.map((armor) => {
                return {
                    name: mapMandatoryString("armor.Name", armor.Name),
                    key: mapMandatoryString("armor.Key", armor.Key),
                    description: mapMandatoryString("armor.Description", armor.Description),
                    soak: mapMandatoryNumber("armor.Soak", armor.Soak),
                    defense: mapMandatoryNumber("armor.Defense", armor.Defense),
                    encumbrance: mapMandatoryNumber("armor.Encumbrance", armor.Encumbrance),
                    price: mapMandatoryNumber("armor.Price", armor.Price),
                    rarity: mapMandatoryNumber("armor.Rarity", armor.Rarity),
                    HP: mapMandatoryNumber("armor.HP", armor.HP),
                    sources: mapOptionalArray(
                        armor?.Sources?.Source,
                        (source) => {
                            return {description: source._, page: source.Page}
                        }),
                    /*                    armor.Sources.Source.map((source) => {
                                            return {description: source._, page: source.Page}
                                        }),*/
                    categories: mapOptionalArray(armor?.Categories?.Category, (category) => category),
                    mods: {
                        miscDesc: mapOptionalString(armor?.BaseMods?.Mod?.MiscDesc),
                    }
                };
            });
        }

        armorData.then((data) => {
            console.log("All Armor Data:", data);

            // Without parser
            xml2js.js.parseStringPromise(data, {
                explicitArray: false,
                trim: true,
                mergeAttrs: true
            })
                .then(
                    function (result) {
                        console.log("Parsing result:", result);
                        let armorItems = armorMapper(result.Armors.Armor);

                        console.log("armorItems:", armorItems);
                        console.log('Done');
                    }
                )
                .catch(
                    function (err) {
                        alert(err)
                    }
                )
            ;

        });
    }

    /* -------------------------------------------- */
}
