/**
 * Data schema, attributes, and methods specific to Armor type Items.
 */
export default class SwesArmor {

    /* -------------------------------------------- */
    /*  Data Schema                                 */

    /* -------------------------------------------- */
    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        const optionalBoolean = {required: false, nullable: false};
        const requiredString = {required: true, blank: false, trim: true, nullable: false};
        const optionalString = {required: false, blank: false, trim: true, nullable: false};
        const requiredInteger = {required: true, nullable: false, integer: true};
        const optionalInteger = {required: false, nullable: false, integer: true};

        return foundry.utils.mergeObject(super.defineSchema(),
            {
                key: new fields.StringField({...requiredString}),
                name: new fields.StringField({...requiredString}),
                description: new fields.StringField({...requiredString}),
                sources: new fields.ArrayField(
                    new fields.SchemaField({
                        description: new fields.StringField({...requiredString}),
                        page: new fields.NumberField({...requiredInteger, min: 1, initial: 1})
                    }),
                    {
                        required: true,
                        initial: [],
                        label: "ARMOR.Source.label",
                        hint: "ARMOR.Source.hint"
                    }
                ),
                defense: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 20}),
                soak: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 20}),
                price: new fields.NumberField({...requiredInteger, initial: 1, min: 0}),
                encumbrance: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 50}),
                hp: new fields.NumberField({...requiredInteger, initial: 0, min: 0, max: 20}),
                rarity: new fields.NumberField({...requiredInteger, initial: 5, min: 0, max: 10}),
                categories: new fields.ArrayField(new fields.StringField({...requiredString}),
                    {
                        required: false,
                        initial: [],
                        label: "ARMOR.Category.label",
                        hint: "ARMOR.Category.hint"
                    },
                ),
                mods:
                    new fields.ArrayField(
                        new fields.SchemaField({
                            key: new fields.StringField({...optionalString}),
                            miscDesc: new fields.StringField({...optionalString}),
                            count: new fields.NumberField({...optionalInteger, min: 0}),
                            dieModifiers: new fields.ArrayField(
                                new fields.SchemaField({
                                    skillKey: new fields.StringField({...optionalString}),
                                    skillType: new fields.StringField({...optionalString}),
                                    skillChar: new fields.StringField({...optionalString}),
                                    addSetBackCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                                    advantageCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                                    boostCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                                    setbackCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                                    successCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                                    threatCount: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                                    upgradeAbilityCount: new fields.NumberField({...optionalInteger, min: 0,}),
                                    upgradeDifficultyCount: new fields.NumberField({
                                        ...optionalInteger,
                                        min: 0,
                                        max: 10
                                    }),
                                })
                            ),
                        })
                        , {
                            required: false,
                            initial: [],
                            label: "ARMOR.Mod.label",
                            hint: "ARMOR.Mod.hint"
                        }),
                weaponModifiers: new fields.ArrayField(
                    new fields.SchemaField({
                        unarmed: new fields.BooleanField({...optionalBoolean}),
                        skillKey: new fields.StringField({...optionalString}),
                        damage: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                        damageAdd: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                        crit: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                        critSub: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                        rangeValue: new fields.NumberField({...optionalInteger, min: 0, max: 10}),
                        qualities: new fields.ArrayField(
                            new fields.SchemaField({
                                key: new fields.StringField({...optionalString}),
                                count: new fields.NumberField({...optionalInteger, min: 0, max: 100})
                            })
                        ),
                        range: new fields.StringField({...optionalString}),
                        mods: new fields.ArrayField(
                            new fields.SchemaField({
                                miscDesc: new fields.StringField({...optionalString}),
                                count: new fields.NumberField({...optionalInteger, min: 0, max: 100})
                            })
                        ),
                    })
                ),
                eraPricing: new fields.ArrayField({
                    era: new fields.SchemaField({
                        name: new fields.StringField({...requiredString}),
                        price: new fields.NumberField({...requiredInteger, min: 0}),
                        rarity: new fields.NumberField({...requiredInteger, min: 0, max: 10}),
                        restricted: new fields.BooleanField({...optionalBoolean, initial: false})
                    }),
                })
            });
    }

    /* -------------------------------------------- */
    /*  Data Preparation                            */
    /* -------------------------------------------- */

    /**
     * Weapon configuration data.
     * @type {{category: WeaponCategory, quality: ItemQualityTier, enchantment: ItemEnchantmentTier}}
     */
    config;

    /**
     * Item rarity score.
     * @type {number}
     */
    rarity;

    /* -------------------------------------------- */

    /**
     * Prepare derived data specific to the weapon type.
     */
    prepareBaseData() {
    }

    /* -------------------------------------------- */
    /*  Helper Methods                              */

    /* -------------------------------------------- */
}
