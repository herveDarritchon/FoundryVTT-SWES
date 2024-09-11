import SwesItemBaseData from "../../data/item-base.mjs";
import {
    buildOptionalBooleanField,
    buildOptionalIntegerField,
    buildOptionalSchemaField,
    buildOptionalSetField,
    buildOptionalStringField
} from "./utilities.mjs";
import SwesCombatItemData from "../../data/combat-item.mjs";

export function buildAttributesSchema(fields) {
    return new fields.SchemaField({
        woundThreshold: new fields.NumberField({
            ...(SwesItemBaseData.requiredInteger),
            initial: 0,
            min: 0,
            max: 20
        }),
        strainThreshold: new fields.NumberField({
            ...(SwesItemBaseData.requiredInteger),
            initial: 0,
            min: 0,
            max: 20
        }),
        defenseRanged: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        defenseMelee: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        soakValue: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
        experience: new fields.NumberField({
            ...(SwesItemBaseData.requiredInteger),
            initial: 0,
            min: -50,
            max: 150
        }),
        forceRating: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        encumbranceBonus: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        requirement: buildRequirementSchemaWithExtraFields(fields)
    }, {
        required: true, label: "ITEM.StartingAttrs.label", hint: "ITEM.StartingAttrs.hint"
    })
}

export function buildStandardRequirementSchema(fields, extraFields = {}) {
    return buildBaseRequirementSchema(fields, {
        ...(extraFields),
        wearingArmor: new fields.BooleanField({
            ...(SwesItemBaseData.optionalBoolean), initial: false,
            label: "SWES.Career-Item.FIELDS.attributes.requirement.wearing-armor.label",
            hint: "SWES.Career-Item.FIELDS.attributes.requirement.wearing-armor.hint",
        }),
        nonCareer: new fields.BooleanField({
            ...(SwesItemBaseData.optionalBoolean), initial: false,
            label: "SWES.Career-Item.FIELDS.attributes.requirement.non-career.label",
            hint: "SWES.Career-Item.FIELDS.attributes.requirement.non-career.hint",
        }),
        soakAtLeast: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10,
            label: "SWES.Career-Item.FIELDS.attributes.requirement.soak-at-least.label",
            hint: "SWES.Career-Item.FIELDS.attributes.requirement.soak-at-least.hint",
        })
    });
}

export function buildBaseRequirementSchema(fields, extraFields = {}) {
    return new fields.SchemaField({
        ...(extraFields),
        career: new fields.BooleanField({
            ...(SwesItemBaseData.optionalBoolean), initial: false,
            label: "SWES.Career-Item.FIELDS.attributes.requirement.career.label",
            hint: "SWES.Career-Item.FIELDS.attributes.requirement.career.hint",
        }),
        specialization: new fields.BooleanField({
            ...(SwesItemBaseData.optionalBoolean), initial: false,
            label: "SWES.Career-Item.FIELDS.attributes.requirement.specialization.label",
            hint: "SWES.Career-Item.FIELDS.attributes.requirement.specialization.hint",
        }),

    }, {required: false,});

}

export function buildRequirementSchemaWithExtraFields(fields) {
    return buildStandardRequirementSchema(fields,
        {
            wieldingMelee: buildOptionalBooleanField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "wielding-melee"
            }),
            wieldingBrawl: buildOptionalBooleanField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "wielding-brawl"
            }),
            wieldingLightsaber: buildOptionalBooleanField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "wielding-lightsaber"
            })
        });
}


export function buildSkillModifiersSchema(fields) {
    return buildTalentModifiersSchema(fields, {
            isCareer: buildOptionalBooleanField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "is-career"
            }),
            skillType: buildOptionalStringField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "skill-type"
            })
        }
    );
}

export function buildTalentModifiersSchema(fields, extraFields = {}) {
    return new fields.SetField(new fields.SchemaField({
            ...(extraFields),
            key: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
            subSpeciesKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
            rankStart: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
            rankAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
            rankLimit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
            requirement: buildStandardRequirementSchema(fields)
        }, {
            required: false, initial: [], label: "ITEM.TalentModifiers.label", hint: "ITEM.TalentModifiers.hint"
        }),
        {
            required: false,
            initial: [],
            label: "SWES.Combat-Item.FIELDS.Categories.label",
            hint: "SWES.Combat-Item.FIELDS.Categories.hint"
        })

}

export function buildQualitiesSchema(fields) {
    return buildOptionalSetField({
        field: buildOptionalSchemaField({
            key: buildOptionalStringField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.qualities.key"
            }),
            count: buildOptionalIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.qualities.count",
                min: 0,
                max: 100
            })
        })
    });
}

export function buildWeaponModifiersSchema(fields, extraFields = {}) {
    return buildOptionalSetField({
        field: buildOptionalSchemaField({
            ...(extraFields),
            unarmed: buildOptionalBooleanField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.unarmed"
            }),
            unarmedName: buildOptionalStringField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.unarmed-name"
            }),
            skillKey: buildOptionalStringField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.skill-key"
            }),
            allSkillKey: buildOptionalStringField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.all-skill-key"
            }),
            damage: buildOptionalIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.damage",
                initial: 0,
                max: 10
            }),
            damageAdd: buildOptionalIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.damage-add",
                initial: 0,
                max: 10
            }),
            crit: buildOptionalIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.crit",
                initial: 0,
                max: 10
            }),
            critSub: buildOptionalIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.crit-sub",
                initial: 0,
                max: 10
            }),
            rangeValue: buildOptionalIntegerField({
                itemType: SwesCombatItemData.ITEM_TYPE,
                key: "weapon-modifiers.range-value",
                initial: 0,
                max: 10
            }),
            qualities: buildQualitiesSchema(fields),
        })
    });

}

export function buildWeaponModifiersSchemaWithExtraSchema(fields) {
    return buildWeaponModifiersSchema(fields, {
        range: buildOptionalStringField({
            itemType: SwesCombatItemData.ITEM_TYPE,
            key: "weapon-modifiers.range",
        }),
        baseMods: buildOptionalSetField({
            field: buildOptionalSchemaField({
                miscDesc: buildOptionalStringField({
                    itemType: SwesCombatItemData.ITEM_TYPE,
                    key: "weapon-modifiers.base-mods.misc-desc"
                }),
                count: buildOptionalIntegerField({
                    itemType: SwesCombatItemData.ITEM_TYPE,
                    key: "weapon-modifiers.base-mods.count",
                    initial: 0,
                    max: 10
                }),
            })
        })
    });
}