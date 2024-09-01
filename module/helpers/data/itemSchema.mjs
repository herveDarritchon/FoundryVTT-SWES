import SwesItemBaseData from "../../data/item-base.mjs";

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
        nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false,
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
    return buildStandardRequirementSchema(fields, {
            wieldingMelee:
                new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false,
                    label: "SWES.Career-Item.FIELDS.attributes.requirement.wielding-melee.label",
                    hint: "SWES.Career-Item.FIELDS.attributes.requirement.wielding-melee.hint",
                }),
            wieldingBrawl: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false,
                label: "SWES.Career-Item.FIELDS.attributes.requirement.wielding-brawl.label",
                hint: "SWES.Career-Item.FIELDS.attributes.requirement.wielding-brawl.hint",
            }),
            wieldingLightsaber: new fields.BooleanField({
                ...(SwesItemBaseData.optionalBoolean),
                initial: false,
                label: "SWES.Career-Item.FIELDS.attributes.requirement.wielding-lightsaber.label",
                hint: "SWES.Career-Item.FIELDS.attributes.requirement.wielding-lightsaber.hint",
            })
        }
    );
}

export function buildSkillModifiersSchema(fields) {
    return buildTalentModifiersSchema(fields, {
        isCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: ""}),
        skillType: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
    });
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
    return new fields.SetField(new fields.SchemaField({
        key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
        count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 100})
    }, {required: false}), {required: true, initial: []})
}

export function buildWeaponModifiersSchema(fields, extraFields = {}) {
    return new fields.SetField(new fields.SchemaField({
        ...(extraFields),
        unarmed: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)}),
        unarmedName: new fields.StringField({...(SwesItemBaseData.optionalString)}),
        skillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
        allSkillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
        damage: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        damageAdd: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        crit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
        critSub: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        rangeValue: new fields.NumberField({
            ...(SwesItemBaseData.optionalInteger),
            initial: 0,
            min: 0,
            max: 10
        }),
        qualities: buildQualitiesSchema(fields),
    }, {required: false}), {
        required: false,
        initial: [],
        label: "ITEM.WeaponModifiers.label",
        hint: "ITEM.WeaponModifiers.hint"
    })
}

export function buildWeaponModifiersSchemaWithExtraSchema(fields) {
    return buildWeaponModifiersSchema(fields, {
        range: new fields.StringField({...(SwesItemBaseData.optionalString)}),
        baseMods: new fields.SetField(new fields.SchemaField({
            miscDesc: new fields.StringField({...(SwesItemBaseData.optionalString)}),
            count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 100})
        }, {required: false}), {
            required: false,
            initial: [],
            label: "ITEM.WeaponModifiers.label",
            hint: "ITEM.WeaponModifiers.hint"
        })
    });
}