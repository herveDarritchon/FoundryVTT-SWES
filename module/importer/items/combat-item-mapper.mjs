import OggDudeImporter from "../oggDude.mjs";

export function buildWeaponModifiers(xmlWeaponModifier) {
    if (xmlWeaponModifier == null) {
        return {}
    }

    return {
        unarmed: OggDudeImporter.mapOptionalBoolean(xmlWeaponModifier?.Unarmed),
        unarmedName: OggDudeImporter.mapOptionalString(xmlWeaponModifier?.UnarmedName),
        skillKey: OggDudeImporter.mapOptionalString(xmlWeaponModifier?.SkillKey),
        allSkillKey: OggDudeImporter.mapOptionalString(xmlWeaponModifier?.AllSkillKey),
        damage: OggDudeImporter.mapOptionalNumber(xmlWeaponModifier?.Damage),
        damageAdd: OggDudeImporter.mapOptionalNumber(xmlWeaponModifier?.DamageAdd),
        crit: OggDudeImporter.mapOptionalNumber(xmlWeaponModifier?.Crit),
        critSub: OggDudeImporter.mapOptionalNumber(xmlWeaponModifier?.CritSub),
        rangeValue: OggDudeImporter.mapOptionalNumber(xmlWeaponModifier?.RangeValue),
        qualities: OggDudeImporter.mapOptionalArray(xmlWeaponModifier?.Qualities?.Quality, (quality) => {
            return {
                key: OggDudeImporter.mapMandatoryString("armor.WeaponModifier.Quality.Key", quality?.Key),
                count: OggDudeImporter.mapOptionalNumber(quality?.Count)
            }
        }),
        baseMods: OggDudeImporter.mapOptionalArray(xmlWeaponModifier?.BaseMods?.Mod, (mod) => {
            return buildMod(mod);
        })
    };
}

function _buildDieModifier(dieModifier) {
    if (dieModifier == null) {
        return {}
    }

    return {
        skillKey: OggDudeImporter.mapOptionalString(dieModifier?.SkillKey),
        skillType: OggDudeImporter.mapOptionalString(dieModifier?.SkillType),
        skillChar: OggDudeImporter.mapOptionalString(dieModifier?.SkillChar),
        addSetBackCount: OggDudeImporter.mapOptionalNumber(dieModifier?.AddSetBackCount),
        advantageCount: OggDudeImporter.mapOptionalNumber(dieModifier?.AdvantageCount),
        boostCount: OggDudeImporter.mapOptionalNumber(dieModifier?.BoostCount),
        setbackCount: OggDudeImporter.mapOptionalNumber(dieModifier?.SetbackCount),
        successCount: OggDudeImporter.mapOptionalNumber(dieModifier?.SuccessCount),
        threatCount: OggDudeImporter.mapOptionalNumber(dieModifier?.ThreatCount),
        upgradeAbilityCount: OggDudeImporter.mapOptionalNumber(dieModifier?.UpgradeAbilityCount),
        upgradeDifficultyCount: OggDudeImporter.mapOptionalNumber(dieModifier?.UpgradeDifficultyCount)
    }
}

export function buildMod(mod) {
    if (mod == null) {
        return {}
    }

    return {
        miscDesc: OggDudeImporter.mapOptionalString(mod?.MiscDesc),
        key: OggDudeImporter.mapOptionalString(mod?.Key),
        count: OggDudeImporter.mapOptionalNumber(mod?.Count),
        index: OggDudeImporter.mapOptionalNumber(mod?.Index),
        dieModifiers: OggDudeImporter.mapOptionalArray(mod?.DieModifiers?.DieModifier, (dieModifier) => {
            return _buildDieModifier(dieModifier);
        }),
    };
}