import type { PartialSkillState, Requirement, Skill, SkillsRequirement } from '@types';

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

export const isRequirementsFulfilled = (unlockedSkills: PartialSkillState, requirements: Array<Requirement>) =>
  requirements.every(
    (requirement) =>
      !('skills' in requirement) ||
      (hasProperty(requirement, 'skills') && isSkillsRequirementFulfilled(unlockedSkills, requirement.skills))
  );
