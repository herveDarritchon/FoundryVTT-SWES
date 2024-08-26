import SwesItemBaseData from "./item-base.mjs";

export default class SwesSpecies extends SwesItemBaseData {

    static LOCALIZATION_PREFIXES = ["SWES.Species"]

    /* -------------------------------------------- */
    /*  Data Schema                                                 */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;
        return foundry.utils.mergeObject(super.defineSchema(), {
                /*
                                            <xs:element name="StartingChars">
                                                <xs:complexType>
                                                    <xs:sequence>
                                                        <xs:element type="xs:byte" name="Brawn"/>
                                                        <xs:element type="xs:byte" name="Agility"/>
                                                        <xs:element type="xs:byte" name="Intellect"/>
                                                        <xs:element type="xs:byte" name="Cunning"/>
                                                        <xs:element type="xs:byte" name="Willpower"/>
                                                        <xs:element type="xs:byte" name="Presence"/>
                                                        <xs:element name="Requirement" minOccurs="0">
                                                            <xs:complexType>
                                                                <xs:sequence>
                                                                    <xs:element type="xs:string" name="WearingArmor"/>
                                                                    <xs:element type="xs:string" name="Career"/>
                                                                    <xs:element type="xs:string" name="Specialization"/>
                                                                    <xs:element type="xs:string" name="NonCareer"/>
                                                                    <xs:element type="xs:byte" name="SoakAtLeast"/>
                                                                    <xs:element type="xs:string" name="WieldingMelee" minOccurs="0"/>
                                                                    <xs:element type="xs:string" name="WieldingBrawl" minOccurs="0"/>
                                                                    <xs:element type="xs:string" name="WieldingLightsaber"
                                                                                minOccurs="0"/>
                                                                </xs:sequence>
                                                            </xs:complexType>
                                                        </xs:element>
                                                    </xs:sequence>
                                                </xs:complexType>
                                            </xs:element>
                 */

                /* Starting Characteristics Tab */
                startingChars: new fields.SchemaField({
                    brawn: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    agility: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    intellect: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    cunning: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    willpower: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    presence: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                    requirement: new fields.SchemaField({
                        wearingArmor: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        career: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        specialization: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        soakAtLeast: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                        wieldingMelee: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        wieldingBrawl: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        wieldingLightsaber: new fields.BooleanField({
                            ...(SwesItemBaseData.optionalBoolean),
                            initial: false
                        }),
                    }, {
                        required: false,
                        label: "ITEM.StartingChars.Requirement.label",
                        hint: "ITEM.StartingChars.Requirement.hint"
                    })

                }, {
                    required: true, label: "ITEM.StartingChars.label", hint: "ITEM.StartingChars.hint"
                }),

                /*
                               <xs:element name="StartingAttrs">
                                    <xs:complexType>
                                        <xs:sequence>
                                            <xs:element type="xs:byte" name="WoundThreshold"/>
                                            <xs:element type="xs:byte" name="StrainThreshold"/>
                                            <xs:element type="xs:byte" name="DefenseRanged" minOccurs="0"/>
                                            <xs:element type="xs:byte" name="DefenseMelee" minOccurs="0"/>
                                            <xs:element type="xs:byte" name="SoakValue" minOccurs="0"/>
                                            <xs:element type="xs:short" name="Experience"/>
                                            <xs:element type="xs:byte" name="ForceRating" minOccurs="0"/>
                                            <xs:element type="xs:byte" name="EncumbranceBonus" minOccurs="0"/>
                                            <xs:element name="Requirement" minOccurs="0">
                                                <xs:complexType>
                                                    <xs:sequence>
                                                        <xs:element type="xs:string" name="WearingArmor"/>
                                                        <xs:element type="xs:string" name="Career"/>
                                                        <xs:element type="xs:string" name="Specialization"/>
                                                        <xs:element type="xs:string" name="NonCareer"/>
                                                        <xs:element type="xs:byte" name="SoakAtLeast"/>
                                                        <xs:element type="xs:string" name="WieldingMelee" minOccurs="0"/>
                                                        <xs:element type="xs:string" name="WieldingBrawl" minOccurs="0"/>
                                                        <xs:element type="xs:string" name="WieldingLightsaber"
                                                                    minOccurs="0"/>
                                                    </xs:sequence>
                                                </xs:complexType>
                                            </xs:element>
                                        </xs:sequence>
                                    </xs:complexType>
                                </xs:element>
                 */

                /* Starting Attributes Tab */
                startingAttrs: new fields.SchemaField({
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
                    requirement: new fields.SchemaField({
                        wearingArmor: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        career: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        specialization: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        soakAtLeast: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                        wieldingMelee: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        wieldingBrawl: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                        wieldingLightsaber: new fields.BooleanField({
                            ...(SwesItemBaseData.optionalBoolean),
                            initial: false
                        }),
                    }, {
                        required: false,
                        label: "ITEM.StartingAttrs.Requirement.label",
                        hint: "ITEM.StartingAttrs.Requirement.hint"
                    })
                }, {
                    required: true, label: "ITEM.StartingAttrs.label", hint: "ITEM.StartingAttrs.hint"
                }),

                /*
                              <xs:element name="SkillModifiers">
                                    <xs:complexType mixed="true">
                                        <xs:sequence>
                                            <xs:element name="SkillModifier" maxOccurs="unbounded" minOccurs="0">
                                                <xs:complexType>
                                                    <xs:sequence>
                                                        <xs:element type="xs:string" name="Key"/>
                                                        <xs:element type="xs:string" name="SubSpeciesKey" minOccurs="0"/>
                                                        <xs:element type="xs:byte" name="RankStart"/>
                                                        <xs:element type="xs:byte" name="RankAdd" minOccurs="0"/>
                                                        <xs:element type="xs:byte" name="RankLimit" minOccurs="0"/>
                                                        <xs:element type="xs:string" name="isCareer" minOccurs="0"/>
                                                        <xs:element type="xs:string" name="SkillType" minOccurs="0"/>
                                                        <xs:element name="Requirement" minOccurs="0">
                                                            <xs:complexType>
                                                                <xs:sequence>
                                                                    <xs:element type="xs:string" name="WearingArmor"/>
                                                                    <xs:element type="xs:string" name="Career"/>
                                                                    <xs:element type="xs:string" name="Specialization"/>
                                                                    <xs:element type="xs:string" name="NonCareer"/>
                                                                    <xs:element type="xs:byte" name="SoakAtLeast"/>
                                                                </xs:sequence>
                                                            </xs:complexType>
                                                        </xs:element>
                                                    </xs:sequence>
                                                </xs:complexType>
                                            </xs:element>
                                        </xs:sequence>
                                    </xs:complexType>
                                </xs:element>
                 */

                /* Skill Modifiers Tab */
                skillModifiers: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        subSpeciesKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        rankStart: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0, max: 10}),
                        rankAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        rankLimit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        isCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: ""}),
                        skillType: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        requirement: new fields.SchemaField({
                            wearingArmor: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                            career: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                            specialization: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                            nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                            soakAtLeast: new fields.NumberField({
                                ...(SwesItemBaseData.requiredInteger),
                                initial: 0,
                                min: 0,
                                max: 10
                            }),
                        }, {
                            required: false,
                            label: "ITEM.SkillModifiers.Requirement.label",
                            hint: "ITEM.SkillModifiers.Requirement.hint"
                        })
                    }, {
                        required: false, initial: [], label: "ITEM.SkillModifiers.label", hint: "ITEM.SkillModifiers.hint"
                    }),
                    {
                        required: false,
                        initial: [],
                        label: "SWES.Combat-Item.FIELDS.Categories.label",
                        hint: "SWES.Combat-Item.FIELDS.Categories.hint"
                    }),

                /*
                                            <xs:element name="TalentModifiers">
                                                <xs:complexType mixed="true">
                                                    <xs:sequence>
                                                        <xs:element name="TalentModifier" maxOccurs="unbounded" minOccurs="0">
                                                            <xs:complexType>
                                                                <xs:sequence>
                                                                    <xs:element type="xs:string" name="Key"/>
                                                                    <xs:element type="xs:string" name="SubSpeciesKey" minOccurs="0"/>
                                                                    <xs:element type="xs:byte" name="RankStart" minOccurs="0"/>
                                                                    <xs:element type="xs:byte" name="RankAdd" minOccurs="0"/>
                                                                    <xs:element type="xs:byte" name="RankLimit" minOccurs="0"/>
                                                                    <xs:element name="Requirement" minOccurs="0">
                                                                        <xs:complexType>
                                                                            <xs:sequence>
                                                                                <xs:element type="xs:string" name="WearingArmor"/>
                                                                                <xs:element type="xs:string" name="Career"/>
                                                                                <xs:element type="xs:string" name="Specialization"/>
                                                                                <xs:element type="xs:string" name="NonCareer"/>
                                                                                <xs:element type="xs:byte" name="SoakAtLeast"/>
                                                                            </xs:sequence>
                                                                        </xs:complexType>
                                                                    </xs:element>
                                                                </xs:sequence>
                                                            </xs:complexType>
                                                        </xs:element>
                                                    </xs:sequence>
                                                </xs:complexType>
                                            </xs:element>

                 */
                /* Talent Modifiers Tab */

                talentModifiers: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        subSpeciesKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        rankStart: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        rankAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        rankLimit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        requirement: new fields.SchemaField({
                            wearingArmor: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: ""}),
                            career: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: ""}),
                            specialization: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: ""}),
                            nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: ""}),
                            soakAtLeast: new fields.NumberField({
                                ...(SwesItemBaseData.requiredInteger),
                                initial: 0,
                                min: 0,
                                max: 10
                            }),
                        }, {
                            required: false,
                            label: "ITEM.TalentModifiers.Requirement.label",
                            hint: "ITEM.TalentModifiers.Requirement.hint"
                        })
                    }, {
                        required: false, initial: [], label: "ITEM.TalentModifiers.label", hint: "ITEM.TalentModifiers.hint"
                    }),
                    {
                        required: false,
                        initial: [],
                        label: "SWES.Combat-Item.FIELDS.Categories.label",
                        hint: "SWES.Combat-Item.FIELDS.Categories.hint"
                    }),

                /*
                                            <xs:element name="SubSpeciesList">
                                                <xs:complexType mixed="true">
                                                    <xs:sequence>
                                                        <xs:element name="SubSpecies" maxOccurs="unbounded" minOccurs="0">
                                                            <xs:complexType>
                                                                <xs:choice maxOccurs="unbounded" minOccurs="0">
                                                                    <xs:element type="xs:string" name="Key"/>
                                                                    <xs:element type="xs:string" name="Name"/>
                                                                    <xs:element type="xs:string" name="Description"/>
                                                                    <xs:element name="SkillModifiers">
                                                                        <xs:complexType>
                                                                            <xs:sequence>
                                                                                <xs:element name="SkillModifier">
                                                                                    <xs:complexType>
                                                                                        <xs:sequence>
                                                                                            <xs:element type="xs:string" name="Key"/>
                                                                                            <xs:element type="xs:byte"
                                                                                                        name="RankStart"/>
                                                                                            <xs:element type="xs:byte" name="RankLimit"
                                                                                                        minOccurs="0"/>
                                                                                        </xs:sequence>
                                                                                    </xs:complexType>
                                                                                </xs:element>
                                                                            </xs:sequence>
                                                                        </xs:complexType>
                                                                    </xs:element>
                                                                    <xs:element name="TalentModifiers">
                                                                        <xs:complexType>
                                                                            <xs:sequence>
                                                                                <xs:element name="TalentModifier">
                                                                                    <xs:complexType>
                                                                                        <xs:sequence>
                                                                                            <xs:element type="xs:string" name="Key"/>
                                                                                            <xs:element type="xs:byte" name="RankAdd"/>
                                                                                        </xs:sequence>
                                                                                    </xs:complexType>
                                                                                </xs:element>
                                                                            </xs:sequence>
                                                                        </xs:complexType>
                                                                    </xs:element>
                                                                    <xs:element name="OptionChoices">
                                                                        <xs:complexType>
                                                                            <xs:sequence>
                                                                                <xs:element name="OptionChoice" maxOccurs="unbounded"
                                                                                            minOccurs="0">
                                                                                    <xs:complexType>
                                                                                        <xs:sequence>
                                                                                            <xs:element type="xs:string" name="Key"/>
                                                                                            <xs:element type="xs:string" name="Name"/>
                                                                                            <xs:element name="Options">
                                                                                                <xs:complexType>
                                                                                                    <xs:sequence>
                                                                                                        <xs:element name="Option"
                                                                                                                    maxOccurs="unbounded"
                                                                                                                    minOccurs="0">
                                                                                                            <xs:complexType>
                                                                                                                <xs:sequence>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="Key"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="Name"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="Description"/>
                                                                                                                    <xs:element
                                                                                                                            name="SkillModifiers"
                                                                                                                            minOccurs="0">
                                                                                                                        <xs:complexType>
                                                                                                                            <xs:sequence>
                                                                                                                                <xs:element
                                                                                                                                        name="SkillModifier">
                                                                                                                                    <xs:complexType>
                                                                                                                                        <xs:sequence>
                                                                                                                                            <xs:element
                                                                                                                                                    type="xs:string"
                                                                                                                                                    name="Key"/>
                                                                                                                                            <xs:element
                                                                                                                                                    type="xs:byte"
                                                                                                                                                    name="RankStart"/>
                                                                                                                                        </xs:sequence>
                                                                                                                                    </xs:complexType>
                                                                                                                                </xs:element>
                                                                                                                            </xs:sequence>
                                                                                                                        </xs:complexType>
                                                                                                                    </xs:element>
                                                                                                                </xs:sequence>
                                                                                                            </xs:complexType>
                                                                                                        </xs:element>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                        </xs:sequence>
                                                                                    </xs:complexType>
                                                                                </xs:element>
                                                                            </xs:sequence>
                                                                        </xs:complexType>
                                                                    </xs:element>
                                                                    <xs:element name="WeaponModifiers">
                                                                        <xs:complexType>
                                                                            <xs:sequence>
                                                                                <xs:element name="WeaponModifier">
                                                                                    <xs:complexType>
                                                                                        <xs:sequence>
                                                                                            <xs:element type="xs:string" name="Unarmed"
                                                                                                        minOccurs="0"/>
                                                                                            <xs:element type="xs:string"
                                                                                                        name="UnarmedName"
                                                                                                        minOccurs="0"/>
                                                                                            <xs:element type="xs:string" name="SkillKey"
                                                                                                        minOccurs="0"/>
                                                                                            <xs:element type="xs:string"
                                                                                                        name="AllSkillKey"/>
                                                                                            <xs:element type="xs:byte" name="Damage"
                                                                                                        minOccurs="0"/>
                                                                                            <xs:element type="xs:byte"
                                                                                                        name="DamageAdd"/>
                                                                                            <xs:element type="xs:byte" name="Crit"/>
                                                                                            <xs:element type="xs:byte" name="CritSub"
                                                                                                        minOccurs="0"/>
                                                                                            <xs:element type="xs:string"
                                                                                                        name="RangeValue"
                                                                                                        minOccurs="0"/>
                                                                                            <xs:element name="Qualities" minOccurs="0">
                                                                                                <xs:complexType>
                                                                                                    <xs:sequence>
                                                                                                        <xs:element name="Quality">
                                                                                                            <xs:complexType>
                                                                                                                <xs:sequence>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="Key"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="Count"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="Index"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="MiscDesc"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="DefZone"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="VehicleWeaponUpgrades"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="DieModifiers"/>
                                                                                                                </xs:sequence>
                                                                                                            </xs:complexType>
                                                                                                        </xs:element>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                        </xs:sequence>
                                                                                    </xs:complexType>
                                                                                </xs:element>
                                                                            </xs:sequence>
                                                                        </xs:complexType>
                                                                    </xs:element>
                                                                </xs:choice>
                                                            </xs:complexType>
                                                        </xs:element>
                                                    </xs:sequence>
                                                </xs:complexType>
                                            </xs:element>
                 */
                /* SubSpecies List Tab */
                subSpeciesList: new fields.SetField(new fields.SchemaField({
                    key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                    skillModifiers: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        rankStart: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                        rankLimit: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.SubSpeciesList.SkillModifiers.label",
                        hint: "ITEM.SubSpeciesList.SkillModifiers.hint"
                    }),
                    talentModifiers: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        rankAdd: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 10
                        }),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.SubSpeciesList.TalentModifiers.label",
                        hint: "ITEM.SubSpeciesList.TalentModifiers.hint"
                    }),
                    optionChoices: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        options: new fields.SetField(new fields.SchemaField({
                            key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            skillModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                                rankStart: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0,
                                    max: 10
                                }),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.SubSpeciesList.OptionChoices.SkillModifiers.label",
                                hint: "ITEM.SubSpeciesList.OptionChoices.SkillModifiers.hint"
                            }),
                        }, {required: false}), {
                            required: false,
                            initial: [],
                            label: "ITEM.SubSpeciesList.OptionChoices.Options.label",
                            hint: "ITEM.SubSpeciesList.OptionChoices.Options.hint"
                        }),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.SubSpeciesList.OptionChoices.label",
                        hint: "ITEM.SubSpeciesList.OptionChoices.hint"
                    }),
                    weaponModifiers: new fields.SetField(new fields.SchemaField({
                        unarmed: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean)}),
                        unarmedName: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                        skillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                        allSkillKey: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                        damage: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        damageAdd: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        crit: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        critSub: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        rangeValue: new fields.NumberField({...(SwesItemBaseData.optionalInteger), initial: 0, min: 0, max: 10}),
                        qualities: new fields.SetField(new fields.SchemaField({
                            key: new fields.StringField({...(SwesItemBaseData.optionalString)}),
                            count: new fields.NumberField({...(SwesItemBaseData.optionalInteger), min: 0, max: 100})
                        }, {required: false}), {required: true, initial: []}),
                    }, {required: false}), {
                        required: false,
                        initial: [],
                        label: "ITEM.WeaponModifiers.label",
                        hint: "ITEM.WeaponModifiers.hint"
                    }),
                }), {
                    required: false,
                    initial: [],
                    label: "ITEM.SubSpeciesList.label",
                    hint: "ITEM.SubSpeciesList.hint"
                }),

                /*
                                            <xs:element name="OptionChoices">
                                                <xs:complexType mixed="true">
                                                    <xs:sequence>
                                                        <xs:element name="OptionChoice" maxOccurs="unbounded" minOccurs="0">
                                                            <xs:complexType>
                                                                <xs:sequence>
                                                                    <xs:element type="xs:string" name="Key"/>
                                                                    <xs:element type="xs:string" name="Name"/>
                                                                    <xs:element type="xs:string" name="Description" minOccurs="0"/>
                                                                    <xs:element type="xs:string" name="Source" minOccurs="0"/>
                                                                    <xs:element type="xs:string" name="Sources" minOccurs="0"/>
                                                                    <xs:element type="xs:string" name="Custom" minOccurs="0"/>
                                                                    <xs:element name="Options">
                                                                        <xs:complexType>
                                                                            <xs:sequence>
                                                                                <xs:element name="Option" maxOccurs="unbounded"
                                                                                            minOccurs="0">
                                                                                    <xs:complexType>
                                                                                        <xs:choice maxOccurs="unbounded" minOccurs="0">
                                                                                            <xs:element type="xs:string" name="Key"/>
                                                                                            <xs:element type="xs:string" name="Name"/>
                                                                                            <xs:element type="xs:string"
                                                                                                        name="Description"/>
                                                                                            <xs:element name="SkillModifiers">
                                                                                                <xs:complexType>
                                                                                                    <xs:sequence>
                                                                                                        <xs:element
                                                                                                                name="SkillModifier">
                                                                                                            <xs:complexType>
                                                                                                                <xs:choice
                                                                                                                        maxOccurs="unbounded"
                                                                                                                        minOccurs="0">
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="Key"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="RankAdd"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="RankStart"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="RankLimit"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="isCareer"/>
                                                                                                                </xs:choice>
                                                                                                            </xs:complexType>
                                                                                                        </xs:element>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                            <xs:element name="DieModifiers">
                                                                                                <xs:complexType mixed="true">
                                                                                                    <xs:sequence>
                                                                                                        <xs:element name="DieModifier"
                                                                                                                    maxOccurs="unbounded"
                                                                                                                    minOccurs="0">
                                                                                                            <xs:complexType>
                                                                                                                <xs:sequence>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="SkillKey"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="AdvantageCount"
                                                                                                                            minOccurs="0"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="SetbackCount"
                                                                                                                            minOccurs="0"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="SuccessCount"
                                                                                                                            minOccurs="0"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="AddSetbackCount"
                                                                                                                            minOccurs="0"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="BoostCount"
                                                                                                                            minOccurs="0"/>
                                                                                                                </xs:sequence>
                                                                                                            </xs:complexType>
                                                                                                        </xs:element>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                            <xs:element name="StartingSkillTraining">
                                                                                                <xs:complexType>
                                                                                                    <xs:sequence>
                                                                                                        <xs:element name="SkillTraining"
                                                                                                                    maxOccurs="unbounded"
                                                                                                                    minOccurs="0">
                                                                                                            <xs:complexType>
                                                                                                                <xs:sequence>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="SkillCount"/>
                                                                                                                    <xs:element
                                                                                                                            name="Requirement">
                                                                                                                        <xs:complexType>
                                                                                                                            <xs:sequence>
                                                                                                                                <xs:element
                                                                                                                                        type="xs:string"
                                                                                                                                        name="Career"
                                                                                                                                        minOccurs="0"/>
                                                                                                                                <xs:element
                                                                                                                                        type="xs:string"
                                                                                                                                        name="Specialization"
                                                                                                                                        minOccurs="0"/>
                                                                                                                                <xs:element
                                                                                                                                        type="xs:string"
                                                                                                                                        name="FromSkillType"
                                                                                                                                        minOccurs="0"/>
                                                                                                                                <xs:element
                                                                                                                                        type="xs:string"
                                                                                                                                        name="SkillType"
                                                                                                                                        minOccurs="0"/>
                                                                                                                                <xs:element
                                                                                                                                        type="xs:string"
                                                                                                                                        name="NonCareer"
                                                                                                                                        minOccurs="0"/>
                                                                                                                            </xs:sequence>
                                                                                                                        </xs:complexType>
                                                                                                                    </xs:element>
                                                                                                                </xs:sequence>
                                                                                                            </xs:complexType>
                                                                                                        </xs:element>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                            <xs:element name="StartingAttributes">
                                                                                                <xs:complexType>
                                                                                                    <xs:sequence>
                                                                                                        <xs:element type="xs:byte"
                                                                                                                    name="Experience"/>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                            <xs:element name="TalentModifiers">
                                                                                                <xs:complexType mixed="true">
                                                                                                    <xs:sequence>
                                                                                                        <xs:element
                                                                                                                name="TalentModifier"
                                                                                                                minOccurs="0">
                                                                                                            <xs:complexType>
                                                                                                                <xs:sequence>
                                                                                                                    <xs:element
                                                                                                                            type="xs:string"
                                                                                                                            name="Key"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="RankStart"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="RankAdd"/>
                                                                                                                    <xs:element
                                                                                                                            type="xs:byte"
                                                                                                                            name="RankLimit"/>
                                                                                                                </xs:sequence>
                                                                                                            </xs:complexType>
                                                                                                        </xs:element>
                                                                                                    </xs:sequence>
                                                                                                </xs:complexType>
                                                                                            </xs:element>
                                                                                        </xs:choice>
                                                                                    </xs:complexType>
                                                                                </xs:element>
                                                                            </xs:sequence>
                                                                        </xs:complexType>
                                                                    </xs:element>
                                                                </xs:sequence>
                                                            </xs:complexType>
                                                        </xs:element>
                                                    </xs:sequence>
                                                </xs:complexType>
                                            </xs:element>

                 */

                /* Option Choices Tab */
                optionChoices: new fields.SetField(new fields.SchemaField({
                        key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                        name: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        description: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        source: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        sources: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        custom: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                        options: new fields.SetField(new fields.SchemaField({
                            key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            name: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            description: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                            skillModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                rankAdd: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0
                                }),
                                rankStart: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0
                                }),
                                rankLimit: new fields.NumberField({
                                    ...(SwesItemBaseData.requiredInteger),
                                    initial: 0,
                                    min: 0
                                }),
                                isCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.SkillModifiers.label",
                                hint: "ITEM.OptionChoices.Options.SkillModifiers.hint"
                            }),
                            dieModifiers: new fields.SetField(new fields.SchemaField({
                                dieModifier: new fields.SchemaField({
                                    skillKey: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                    advantageCount: new fields.NumberField({
                                        ...(SwesItemBaseData.optionalInteger),
                                        initial: 0,
                                        min: 0
                                    }),
                                    setbackCount: new fields.NumberField({
                                        ...(SwesItemBaseData.optionalInteger), initial: 0, min: 0
                                    }),
                                    successCount: new fields.NumberField({
                                        ...(SwesItemBaseData.optionalInteger), initial: 0, min: 0
                                    }),
                                }, {required: false}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.DieModifiers.label",
                                hint: "ITEM.OptionChoices.Options.DieModifiers.hint"
                            }),
                            startingSkillTraining: new fields.SetField(new fields.SchemaField({
                                skillTraining: new fields.SchemaField({
                                    skillCount: new fields.NumberField({
                                        ...(SwesItemBaseData.requiredInteger),
                                        initial: 0,
                                        min: 0
                                    }),
                                    requirement: new fields.SchemaField({
                                        career: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                        specialization: new fields.StringField({
                                            ...(SwesItemBaseData.optionalString),
                                            initial: ""
                                        }),
                                        fromSkillType: new fields.StringField({
                                            ...(SwesItemBaseData.optionalString),
                                            initial: ""
                                        }),
                                        skillType: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                        nonCareer: new fields.StringField({...(SwesItemBaseData.optionalString), initial: ""}),
                                    }, {required: false}),
                                }, {required: false}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.StartingSkillTraining.label",
                                hint: "ITEM.OptionChoices.Options.StartingSkillTraining.hint"
                            }),
                            startingAttributes: new fields.SetField(new fields.SchemaField({
                                experience: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.StartingAttributes.label",
                                hint: "ITEM.OptionChoices.Options.StartingAttributes.hint"
                            }),
                            talentModifiers: new fields.SetField(new fields.SchemaField({
                                key: new fields.StringField({...(SwesItemBaseData.requiredString), initial: ""}),
                                rankStart: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                                rankAdd: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                                rankLimit: new fields.NumberField({...(SwesItemBaseData.requiredInteger), initial: 0, min: 0}),
                            }, {required: false}), {
                                required: false,
                                initial: [],
                                label: "ITEM.OptionChoices.Options.TalentModifiers.label",
                                hint: "ITEM.OptionChoices.Options.TalentModifiers.hint"
                            }),
                        }, {required: false}), {
                            required: false,
                            initial: [],
                            label: "ITEM.OptionChoices.Options.label",
                            hint: "ITEM.OptionChoices.Options.hint"
                        }),
                    }, {
                        required: false
                    }),
                    {
                        required: false,
                        initial: [],
                        label: "ITEM.OptionChoices.label",
                        hint: "ITEM.OptionChoices.hint"
                    })
            }
        );
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}