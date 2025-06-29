import type {
  CombatSkill,
  PartialSkillState,
  QuestsState,
  Requirements,
  Rewards,
  Skill,
  SkillsRequirement
} from '@types';
import { COMBAT_SKILLS } from './constants';

/* COMMON */

/**
 * Creates a multidimentional array of two indicies, containing items of a given array corresponding to the result of a boolean comparator.
 * @param arr The array to reduce into the result array
 * @param comparator A callback that returns a boolean to determine which index an item gets pushed to in the array
 * @returns {[Array<T>, Array<T>]} Filtered array
 */
export const bifilter = <T>(arr: Array<T>, comparator: (value: T) => boolean): [Array<T>, Array<T>] =>
  arr.reduce(
    (acc, item) => {
      acc[+comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>]
  );

/**
 * Creates a multidimentional array of three indicies, containing items of a given array corresponding to the result of a comparator.
 * @param arr The array to reduce into the result array
 * @param comparator A callback that returns the index in the array which the item gets pushed to
 * @returns {[Array<T>, Array<T>, Array<T>]} Filtered array
 */
export const trifilter = <T>(arr: Array<T>, comparator: (value: T) => 0 | 1 | 2): [Array<T>, Array<T>, Array<T>] => {
  return arr.reduce(
    (acc, item) => {
      acc[comparator(item)].push(item);
      return acc;
    },
    [[] as Array<T>, [] as Array<T>, [] as Array<T>]
  );
};

/* TYPE GUARDS */

/**
 * Determines if a skill is a combat skill.
 * @param skill The skill to check
 * @returns Combat skill type guard
 */
export const isCombatSkill = (skill: Skill): skill is CombatSkill => COMBAT_SKILLS.includes(skill as CombatSkill);

/* REQUIREMENTS */

/**
 * Determines if a list of quests have been marked as complete.
 * @param completedQuests Quests that have been marked complete
 * @param requiredQuests A list of quests that need to be completed
 * @returns {boolean} Whether or not required quests have been marked complete
 */
const isQuestRequirementFulfilled = (completedQuests: QuestsState, requiredQuests: Array<string>): boolean => {
  return requiredQuests.every(
    (requiredQuest) => completedQuests.findIndex((completedQuest) => completedQuest.name === requiredQuest) > -1
  );
};

/**
 * Determines if a skill with a corresponding level is unlocked and at the correct level.
 * @param unlockedSkills Skills that are unlocked
 * @param skill The skill to check
 * @param level The required level of the skill
 * @returns {boolean} Whether or not a skill is unlocked with the required level
 */
const isSkillLevelMet = (unlockedSkills: PartialSkillState, skill: Skill, level: number): boolean => {
  return !!(unlockedSkills[skill] && unlockedSkills[skill].level >= level);
};

/**
 * Determines if 'all' required skills, and at least one of 'any' required skills are unlocked, and at the correct level.
 * @param unlockedSkills Skills that are unlocked
 * @param requirement Skill requirements
 * @returns {boolean} Whether or not skills requirements are fulfilled
 */
const isSkillsRequirementFulfilled = (unlockedSkills: PartialSkillState, requirement: SkillsRequirement): boolean => {
  return (
    (!requirement.all ||
      (Object.entries(requirement.all) as Array<[Skill, number]>).every(([skill, level]) =>
        isSkillLevelMet(unlockedSkills, skill, level)
      )) &&
    (!requirement.any ||
      (Object.entries(requirement.any) as Array<[Skill, number]>).some(([skill, level]) =>
        isSkillLevelMet(unlockedSkills, skill, level)
      ))
  );
};

/**
 * Determines if combat, quest, and skill requirements have been met.
 * @param combat Whether or not combat is enabled
 * @param completedQuests Quests marked completed
 * @param unlockedSkills Skills that are unlocked
 * @param requirements Requirements object
 * @returns {boolean} Whether or not requirements are fulfilled
 */
export const isRequirementsFulfilled = (
  combat: boolean,
  combatLevel: number,
  isIronman: boolean,
  QP: number,
  completedQuests: QuestsState,
  unlockedSkills: PartialSkillState,
  requirements: Requirements
): boolean => {
  if (Object.keys(requirements).length) {
    const requirement = [...(requirements?.main ?? []), ...(isIronman ? (requirements?.ironman ?? []) : [])];

    return requirement.every(({ required }) =>
      required.some(
        (req) =>
          (!req.combat || combat) &&
          (!req.combatLevel || combatLevel >= req.combatLevel) &&
          (!req.QP || QP >= req.QP) &&
          (!req.quests || isQuestRequirementFulfilled(completedQuests, req.quests)) &&
          (!req.skills || isSkillsRequirementFulfilled(unlockedSkills, req.skills))
      )
    );
  }

  return true;
};

/**
 * Determines if 'all' required skills, and at least one of 'any' required skills are unlocked.
 * @param rewards Quest rewards
 * @param unlockedSkills Unlocked skills
 * @returns {boolean} Whether or not the requirements of the rewards object is fulfilled
 */
export const isRewardsFulfilled = (rewards: Rewards, unlockedSkills: PartialSkillState): boolean => {
  if (rewards.skills) {
    const rewardSkills = rewards.skills;
    const skills = Object.keys(unlockedSkills) as Array<Skill>;

    return (
      (!rewardSkills.all || rewardSkills.all.every((reward) => skills.includes(reward))) &&
      (!rewardSkills.any || rewardSkills.any.some((reward) => skills.includes(reward)))
    );
  }

  return true;
};

export const trifilterRequirements = (
  isComplete: boolean,
  combat: boolean,
  combatLevel: number,
  isIronman: boolean,
  QP: number,
  completedQuests: QuestsState,
  unlockedSkills: PartialSkillState,
  requirements: Requirements
) => {
  // Complete
  if (isComplete) {
    return 0;
  }

  // Unlocked
  if (isRequirementsFulfilled(combat, combatLevel, isIronman, QP, completedQuests, unlockedSkills, requirements)) {
    return 1;
  }

  // Locked
  return 2;
};
