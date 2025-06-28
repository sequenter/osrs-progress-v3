import type {
  ACHIEVEMENT_DIARIES,
  ACHIEVEMENT_DIFFICULTY,
  COMBAT_SKILLS,
  QUEST_DIFFICULTY,
  QUEST_LENGTH,
  SKILLING_SKILLS,
  SUMMARY_ITEMS
} from '@utils/constants';

/* UNIONS */

export type AchievementDifficulty = (typeof ACHIEVEMENT_DIFFICULTY)[number];
export type AchievementDiary = (typeof ACHIEVEMENT_DIARIES)[number];
export type QuestDifficulty = (typeof QUEST_DIFFICULTY)[number];
export type QuestLength = (typeof QUEST_LENGTH)[number];

export type Summary = (typeof SUMMARY_ITEMS)[number];

export type CombatSkill = (typeof COMBAT_SKILLS)[number];
export type SkillingSkill = (typeof SKILLING_SKILLS)[number];
export type Skill = CombatSkill | SkillingSkill;

export type Completion = 'unlocked' | 'locked' | 'completed';

/* COMMON */

export interface SkillsRequirement {
  all?: Partial<Record<Skill, number>>;
  any?: Partial<Record<Skill, number>>;
}

interface Required {
  combat?: boolean;
  combatLevel?: number;
  QP?: number;
  quests?: Array<string>;
  skills?: SkillsRequirement;
}

export interface Requirement {
  description?: string;
  required: Array<Required>;
}

export interface Requirements {
  main?: Array<Requirement>;
  ironman?: Array<Requirement>;
}

/* SKILLS */

interface SkillDetail {
  level: number;
  isLocked: boolean;
}

export type SkillState = Record<Skill, SkillDetail>;

export type PartialSkillState = Partial<Record<Skill, SkillDetail>>;

/* ACHIEVEMENTS */

export interface Achievement {
  diary: AchievementDiary;
  difficulty: AchievementDifficulty;
  task: string;
  requirements: Requirements;
}

export type AchievementState = Array<
  Achievement & {
    isComplete: boolean;
  }
>;

/* QUESTS */

interface RewardSkills {
  all?: Array<Skill>;
  any?: Array<Skill>;
}

export interface Rewards {
  QP: number;
  skills: RewardSkills;
}

export interface Quest {
  difficulty: QuestDifficulty;
  icon: string;
  length: QuestLength;
  name: string;
  release: string;
  requirements: Requirements;
  rewards: Rewards;
}

export type QuestState = Array<
  Quest & {
    isComplete: boolean;
  }
>;

/* PETS */

export interface Pet {
  icon: string;
  name: string;
  recommended: Array<Requirement>;
  requirements: Requirements;
}

export type PetState = Array<
  Pet & {
    isComplete: boolean;
  }
>;
