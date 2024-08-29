export default class SwesItemBaseData extends foundry.abstract.TypeDataModel {

    static optionalBoolean = {required: false, nullable: false, initial: false};
    static requiredBoolean = {required: true, nullable: false};
    static optionalInteger = {required: false, nullable: false, integer: true, initial: 0};
    static  requiredInteger = {required: true, nullable: false, integer: true};
    static optionalString = {required: false, blank: true, trim: true, nullable: false, initial: ""};
    static requiredString = {required: true, blank: false, trim: true, nullable: false};
    static optionalHtml = {required: false, blank: true, initial: "", textSearch: true};
    static mandatoryHtml = {required: true, blank: false, textSearch: true};

    /**
     * Enrich the initialization schema with the initial value if it is not null or empty
     * @param initial {string|number|boolean} The initial value of the field
     * @param dataFieldConfiguration {{nullable: boolean,integer: boolean,required: boolean }|{blank: boolean,textSearch: boolean,initial: string,required: boolean }|{blank: boolean, trim: boolean, nullable: boolean, required: boolean}|{nullable: boolean, initial: number, integer: boolean, required: boolean}} The configuration of the field
     * @private
     * @static
     * @function
     * @name _enrichDataFieldConfiguration
     * @memberof SwesItemBaseData
     */
    static _enrichDataFieldConfiguration({initial = undefined, dataFieldConfiguration}) {
        if (SwesItemBaseData.isNullOrEmpty(initial)) {
            return {...(dataFieldConfiguration)};
        } else {
            return {...(dataFieldConfiguration), initial};
        }
    }

    /**
     * Check if the initial value is not null or empty
     * @param initial {string|number|boolean|undefined|null} The initial value of the field
     * @returns {boolean} True if the initial value is not null or empty
     */
    static isNullOrEmpty(initial) {
        if (initial == null) {
            return true;
        }

        if (typeof initial === "boolean") {
            return false;
        }

        if (typeof initial === "number") {
            return isNaN(initial);
        } else {
            return initial !== "" && initial.trim.length > 0;
        }
    }

    /**
     * Build the localization prefix for the item
     * @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     * @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @returns {string[]} The localization prefix
     * @private
     * @static
     * @function
     * @name _buildLocalizationPrefix
     * @memberof SwesItemBaseData
     * @Example
     * SwesItemBaseData._buildLocalizationPrefix({itemType: 'Base-Item', key: 'sources.page'})
     * returns ['SWES.Base-Item.FIELDS.sources.page']
     */
    static _buildLocalizationPrefix({itemType, key}) {
        return [`SWES.${itemType}.FIELDS.${key}`];
    }

    /**
     *  Create a new StringField with the requiredString properties set to false
     *  @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     * @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @param initial {string} The initial value of the field (default is "")
     * @returns {fields.StringField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name buildOptionalString
     * @memberof SwesItemBaseData
     */
    static buildOptionalString({initial = "", itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let objectValues = SwesItemBaseData._enrichDataFieldConfiguration({
            initial,
            dataFieldConfiguration: SwesItemBaseData.optionalString
        });

        return new fields.StringField({
            ...(objectValues),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /**
     *  Create a new StringField  with the requiredString properties set to true
     *  @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     *  @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @returns {fields.StringField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name buildMandatoryString
     * @memberof SwesItemBaseData
     */
    static buildMandatoryString({itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            dataFieldConfiguration: SwesItemBaseData.requiredString
        });

        return new fields.StringField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /**
     * Create a new NumberField with the required properties set to false
     * @param initial {number} The initial value of the field (default is 0)
     * @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     * @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @returns {fields.NumberField}
     * @public
     * @static
     * @function
     * @name buildOptionalInteger
     * @memberof SwesItemBaseData
     */
    static buildOptionalInteger({initial = 0, itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            initial, dataFieldConfiguration: SwesItemBaseData.optionalInteger
        });

        return new fields.NumberField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /**
     * Create a new NumberField with the required properties set to true
     * @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     * @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @returns {fields.NumberField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name buildMandatoryInteger
     * @memberof SwesItemBaseData
     */
    static buildMandatoryInteger({itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            dataFieldConfiguration: SwesItemBaseData.requiredInteger
        });

        return new fields.NumberField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /**
     * Create a new BooleanField with the required properties set to false
     * @param initial  {boolean} The initial value of the field (default is false)
     * @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     * @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @returns {fields.BooleanField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name buildOptionalBoolean
     * @memberof SwesItemBaseData
     */
    static buildOptionalBoolean({initial = false, itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            initial,
            dataFieldConfiguration: SwesItemBaseData.optionalBoolean
        });

        return new fields.BooleanField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /**
     * Create a new BooleanField with the required properties set to true
     * @param initial {boolean} The initial value of the field (default is false)
     * @param itemType {string} The type of the item for Localization (e.g. 'Base-Item', 'Combat-Item', 'Species-Item')
     * @param key {string} The key of the item for Localization (e.g. 'sources.page', 'attributes.requirement.key')
     * @returns {fields.BooleanField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name buildMandatoryBoolean
     * @memberof SwesItemBaseData
     */
    static buildMandatoryBoolean({itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            dataFieldConfiguration: SwesItemBaseData.requiredBoolean
        });

        return new fields.BooleanField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /**
     * Create a new StringField with the requiredString properties
     *
     * @returns {fields.HTMLField}
     */
    static buildOptionalHtml({initial = "", itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            initial,
            dataFieldConfiguration: SwesItemBaseData.optionalHtml
        });

        return new fields.HTMLField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    static buildMandatoryHtml({itemType, key}) {
        const fields = foundry.data.fields;
        const prefix = SwesItemBaseData._buildLocalizationPrefix({itemType, key});
        let dataFieldConfiguration = SwesItemBaseData._enrichDataFieldConfiguration({
            dataFieldConfiguration: SwesItemBaseData.mandatoryHtml
        });

        return new fields.HTMLField({
            ...(dataFieldConfiguration),
            label: `${prefix}.label`,
            hint: `${prefix}.hint`
        });
    }

    /* ******************************************************************************************************* */

    /**
     * Create a new SchemaField with the required properties set to false
     *
     * @param field {DataField} The field object inside the SchemaField
     * @returns {fields.SchemaField} A schema Field used to describe the structure and type of the data
     */
    static buildOptionalSchema(field = {}) {
        const fields = foundry.data.fields;
        return new fields.SchemaField(field, {required: false, initial: {}});
    }

    /**
     * Create a new SchemaField with the required properties set to true
     * @param field {DataField} The field object inside the SchemaField
     * @returns {fields.SchemaField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name mandatorySchema
     * @memberof SwesItemBaseData
     */
    static mandatorySchema(field = {}) {
        const fields = foundry.data.fields;
        return new fields.SchemaField(field, {required: true})
    }

    static buildOptionalSet({initial = [], field = {}}) {
        const fields = foundry.data.fields;
        return new fields.SetField(field, {required: false, initial});
    }

    /**
     * Create a new SetField with the required properties set to true
     * @param field {DataField} The field object inside the SetField
     * @returns {fields.SetField} A schema Field used to describe the structure and type of the data
     * @public
     * @static
     * @function
     * @name mandatorySet
     * @memberof SwesItemBaseData
     */
    static mandatorySet(field = {}) {
        const fields = foundry.data.fields;
        return new fields.SetField(field, {required: true});
    }

    /**
     * Create a new ArrayField with the required properties set to false
     *
     * @param initial {Array} The initial value of the field
     * @param field {DataField} The field object inside the ArrayField
     * @returns {fields.ArrayField} A schema Field used to describe the structure and type of the data
     */
    static buildOptionalArray({initial = [], field}) {
        return new fields.ArrayField(field, {required: false, initial,});
    }

    /**
     * Create a new ArrayField with the required properties set to true
     *
     * @param initial {Array} The initial value of the field
     * @param field {DataField} The field object
     * @returns {fields.ArrayField} A schema Field used to describe the structure and type of the data
     */
    static buildMandatoryArray({field}) {
        return new fields.ArrayField(field, {required: true});
    }

    static ITEM_TYPE = "Base-Item";

    static defineSchema() {
        return foundry.utils.mergeObject({}, {
            key: SwesItemBaseData.buildMandatoryString({
                itemType: SwesItemBaseData.ITEM_TYPE,
                key: "key"
            }),
            description: SwesItemBaseData.buildOptionalHtml({
                initial: "Description",
                itemType: SwesItemBaseData.ITEM_TYPE,
                key: "description"
            }),

            /* Description Tab */
            sources: SwesItemBaseData.buildOptionalSet({
                field: SwesItemBaseData.buildOptionalSchema({
                    description: SwesItemBaseData.buildMandatoryString({
                        itemType: SwesItemBaseData.ITEM_TYPE,
                        key: "description"
                    }),
                    page: SwesItemBaseData.buildMandatoryInteger({
                        itemType: SwesItemBaseData.ITEM_TYPE,
                        key: "page"
                    })
                })
            })
        });
    }
}