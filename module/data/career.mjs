import SwesItemBaseData from "./item-base.mjs";

export default class SwesCareer extends SwesItemBaseData {

    static LOCALIZATION_PREFIXES = ["SWES.Career"]

    /* -------------------------------------------- */
    /*  Data Schema                                                 */

    /* -------------------------------------------- */

    /** @inheritDoc */
    static defineSchema() {
        const fields = foundry.data.fields;

        /*
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Careers">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Career" maxOccurs="unbounded" minOccurs="0">
          <xs:complexType>
            <xs:sequence>
              <xs:element type="xs:string" name="Key"/>
              <xs:element type="xs:string" name="Name"/>
              <xs:element type="xs:string" name="Description"/>
              <xs:element name="Source" minOccurs="0">
                <xs:complexType>
                  <xs:simpleContent>
                    <xs:extension base="xs:string">
                      <xs:attribute type="xs:byte" name="Page" use="optional"/>
                    </xs:extension>
                  </xs:simpleContent>
                </xs:complexType>
              </xs:element>
              <xs:element name="Sources" minOccurs="0">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element name="Source" maxOccurs="unbounded" minOccurs="0">
                      <xs:complexType>
                        <xs:simpleContent>
                          <xs:extension base="xs:string">
                            <xs:attribute type="xs:byte" name="Page" use="optional"/>
                          </xs:extension>
                        </xs:simpleContent>
                      </xs:complexType>
                    </xs:element>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
              <xs:element name="CareerSkills">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element type="xs:string" name="Key" maxOccurs="unbounded" minOccurs="0"/>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
              <xs:element name="Specializations">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element type="xs:string" name="Key" maxOccurs="unbounded" minOccurs="0"/>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
              <xs:element name="Attributes" minOccurs="0">
                <xs:complexType mixed="true">
                  <xs:sequence>
                    <xs:element type="xs:byte" name="WoundThreshold" minOccurs="0"/>
                    <xs:element type="xs:byte" name="StrainThreshold" minOccurs="0"/>
                    <xs:element type="xs:byte" name="DefenseRanged" minOccurs="0"/>
                    <xs:element type="xs:byte" name="DefenseMelee" minOccurs="0"/>
                    <xs:element type="xs:byte" name="SoakValue" minOccurs="0"/>
                    <xs:element type="xs:byte" name="Experience" minOccurs="0"/>
                    <xs:element type="xs:byte" name="ForceRating" minOccurs="0"/>
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
              <xs:element type="xs:byte" name="FreeRanks" minOccurs="0"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
         */
        return foundry.utils.mergeObject(super.defineSchema(), {
                careerSkills: new fields.SetField(
                    new fields.StringField({
                        ...(SwesItemBaseData.requiredString)
                    }), {
                        required: false,
                        initial: [],
                        label: "SWES.Career-Item.FIELDS.career-skills.label",
                        hint: "SWES.Career-Item.FIELDS.career-skills.hint",
                        placeholder: "SWES.Career-Item.FIELDS.career-skills.placeholder"
                    }),
                careerSpecializations:
                    new fields.SetField(
                        new fields.StringField({
                            ...(SwesItemBaseData.requiredString)
                        }), {
                            required: false,
                            initial: [],
                            label: "SWES.Career-Item.FIELDS.career-specializations.label",
                            hint: "SWES.Career-Item.FIELDS.career-specializations.hint",
                            placeholder: "SWES.Career-Item.FIELDS.career-specializations.placeholder"
                        }),
                attributes:
                    new fields.SchemaField({
                        woundThreshold: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 20,
                            label: "SWES.Career-Item.FIELDS.attributes.wound-threshold.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.wound-threshold.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.wound-threshold.placeholder"
                        }),
                        strainThreshold: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: 0,
                            max: 20,
                            label: "SWES.Career-Item.FIELDS.attributes.strain-threshold.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.strain-threshold.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.strain-threshold.placeholder"
                        }),
                        defenseRanged: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.defense-ranged.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.defense-ranged.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.defense-ranged.placeholder"
                        }),
                        defenseMelee: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.defense-melee.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.defense-melee.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.defense-melee.placeholder"
                        }),
                        soakValue: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.soak-value.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.soak-value.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.soak-value.placeholder"
                        }),
                        experience: new fields.NumberField({
                            ...(SwesItemBaseData.requiredInteger),
                            initial: 0,
                            min: -50,
                            max: 150,
                            label: "SWES.Career-Item.FIELDS.attributes.experience.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.experience.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.experience.placeholder"
                        }),
                        forceRating: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.force-rating.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.force-rating.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.force-rating.placeholder"
                        }),
                        encumbranceBonus: new fields.NumberField({
                            ...(SwesItemBaseData.optionalInteger),
                            initial: 0,
                            min: 0,
                            max: 10,
                            label: "SWES.Career-Item.FIELDS.attributes.encumbrance-bonus.label",
                            hint: "SWES.Career-Item.FIELDS.attributes.encumbrance-bonus.hint",
                            placeholder: "SWES.Career-Item.FIELDS.attributes.encumbrance-bonus.placeholder"
                        }),
                        requirement: new fields.SchemaField({
                            wearingArmor: new fields.BooleanField({
                                ...(SwesItemBaseData.optionalBoolean), initial: false,
                                label: "SWES.Career-Item.FIELDS.attributes.requirement.wearing-armor.label",
                                hint: "SWES.Career-Item.FIELDS.attributes.requirement.wearing-armor.hint",
                                placeholder: "SWES.Career-Item.FIELDS.attributes.requirement.wearing-armor.placeholder"
                            }),
                            career: new fields.BooleanField({
                                ...(SwesItemBaseData.optionalBoolean), initial: false,
                                label: "SWES.Career-Item.FIELDS.attributes.requirement.career.label",
                                hint: "SWES.Career-Item.FIELDS.attributes.requirement.career.hint",
                                placeholder: "SWES.Career-Item.FIELDS.attributes.requirement.career.placeholder"
                            }),
                            specialization: new fields.BooleanField({
                                ...(SwesItemBaseData.optionalBoolean), initial: false,
                                label: "SWES.Career-Item.FIELDS.attributes.requirement.specialization.label",
                                hint: "SWES.Career-Item.FIELDS.attributes.requirement.specialization.hint",
                                placeholder: "SWES.Career-Item.FIELDS.attributes.requirement.specialization.placeholder"
                            }),
                            nonCareer: new fields.BooleanField({...(SwesItemBaseData.optionalBoolean), initial: false}),
                            soakAtLeast: new fields.NumberField({
                                ...(SwesItemBaseData.requiredInteger),
                                initial: 0,
                                min: 0,
                                max: 10,
                                label: "SWES.Career-Item.FIELDS.attributes.requirement.soak-at-least.label",
                                hint: "SWES.Career-Item.FIELDS.attributes.requirement.soak-at-least.hint",
                                placeholder: "SWES.Career-Item.FIELDS.attributes.requirement.soak-at-least.placeholder"
                            })
                        }, {required: false,})
                    }, {
                        required: true
                    }),
                freeRanks:
                    new fields.NumberField({
                        ...(SwesItemBaseData.optionalInteger),
                        initial: 0,
                        min: 0,
                        max: 10,
                        label: "SWES.Career-Item.FIELDS.free-ranks.label",
                        hint: "SWES.Career-Item.FIELDS.free-ranks.hint",
                        placeholder: "SWES.Career-Item.FIELDS.free-ranks.placeholder"
                    })
            }
        )
            ;
    }

    prepareDerivedData() {
        // Build the formula dynamically using string interpolation
        const roll = this.roll;
    }
}