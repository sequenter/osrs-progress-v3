import type { CombatSkill, PartialSkillState, Requirement, Requirements, Skill, SkillsRequirement } from '@types';
import { COMBAT_SKILLS } from './constants';

/* COMMON */

export const bifilter = <T>(arr: Array<T>, comparator: (value: T) => boolean) =>
  arr.reduce(
    (acc, item) => {
      acc[+comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>]
  );

export const trifilter = <T>(arr: Array<T>, comparator: (value: T) => number) =>
  arr.reduce(
    (acc, item) => {
      acc[comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>, [] as Array<T>]
  );

export const hasProperty = <T extends object, K extends keyof T>(
  obj: T,
  key: K
): obj is T & Required<{ [P in K]: T[K] }> => {
  return key in obj && obj[key] !== undefined;
};

/* TYPE GUARDS */

/**
 * Determines if a skill is a combat skill.
 * @param skill The skill to check
 * @returns Combat skill type guard
 */
export const isCombatSkill = (skill: Skill): skill is CombatSkill => COMBAT_SKILLS.includes(skill as CombatSkill);

/* REQUIREMENTS */

const isSkillLevelMet = (unlockedSkills: PartialSkillState, skill: Skill, level: number) =>
  hasProperty(unlockedSkills, skill) && unlockedSkills[skill].level >= level;

const isSkillsRequirementFulfilled = (unlockedSkills: PartialSkillState, requirement: SkillsRequirement) =>
  (!('all' in requirement) ||
    (hasProperty(requirement, 'all') &&
      (Object.entries(requirement.all) as Array<[Skill, number]>).every(([skill, level]) =>
        isSkillLevelMet(unlockedSkills, skill, level)
      ))) &&
  (!('any' in requirement) ||
    (hasProperty(requirement, 'any') &&
      (Object.entries(requirement.any) as Array<[Skill, number]>).some(([skill, level]) =>
        isSkillLevelMet(unlockedSkills, skill, level)
      )));

const isRequirementFulfilled = (combat: boolean, unlockedSkills: PartialSkillState, requirement: Array<Requirement>) =>
  requirement.every(({ required }) =>
    required.some(
      (req) =>
        (!req.combat || (req.combat && combat)) &&
        (!req.quests || false) &&
        (!req.skills || (req.skills && isSkillsRequirementFulfilled(unlockedSkills, req.skills)))
    )
  );

export const isRequirementsFulfilled = (
  combat: boolean,
  unlockedSkills: PartialSkillState,
  requirements: Requirements
) =>
  !Object.keys(requirements).length ||
  (requirements.main && isRequirementFulfilled(combat, unlockedSkills, requirements.main));
