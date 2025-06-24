import type {
  CombatSkill,
  PartialSkillState,
  QuestState,
  Requirement,
  Requirements,
  Rewards,
  Skill,
  SkillsRequirement
} from '@types';
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

/* TYPE GUARDS */

/**
 * Determines if a skill is a combat skill.
 * @param skill The skill to check
 * @returns Combat skill type guard
 */
export const isCombatSkill = (skill: Skill): skill is CombatSkill => COMBAT_SKILLS.includes(skill as CombatSkill);

/* REQUIREMENTS */

const isQuestRequirementFulfilled = (completedQuests: QuestState, requiredQuests: Array<string>) => {
  return requiredQuests.every(
    (requiredQuest) => completedQuests.findIndex((completedQuest) => completedQuest.name === requiredQuest) > -1
  );
};

const isSkillLevelMet = (unlockedSkills: PartialSkillState, skill: Skill, level: number) => {
  return unlockedSkills[skill] && unlockedSkills[skill].level >= level;
};

const isSkillsRequirementFulfilled = (unlockedSkills: PartialSkillState, requirement: SkillsRequirement) => {
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

const isRequirementFulfilled = (
  combat: boolean,
  completedQuests: QuestState,
  unlockedSkills: PartialSkillState,
  requirement: Array<Requirement>
) => {
  return requirement.every(({ required }) =>
    required.some(
      (req) =>
        (!req.combat || combat) &&
        (!req.quests || isQuestRequirementFulfilled(completedQuests, req.quests)) &&
        (!req.skills || isSkillsRequirementFulfilled(unlockedSkills, req.skills))
    )
  );
};

export const isRequirementsFulfilled = (
  combat: boolean,
  completedQuests: QuestState,
  unlockedSkills: PartialSkillState,
  requirements: Requirements
) => {
  if (Object.keys(requirements).length) {
    return !requirements.main || isRequirementFulfilled(combat, completedQuests, unlockedSkills, requirements.main);
  }

  return true;
};

/**
 * Determines if the skill rewards of a quest is fulfilled by checking if required skills are unlocked.
 * @param rewards Quest rewards
 * @param unlockedSkills Unlocked skills
 * @returns {boolean}
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
