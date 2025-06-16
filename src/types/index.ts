import type {
  ACHIEVEMENT_DIARIES,
  ACHIEVEMENT_DIFFICULTY,
  QUEST_DIFFICULTY,
  SKILLS,
  SUMMARY_ITEMS
} from '@utils/constants';

/* UNIONS */

export type AchievementDifficulty = (typeof ACHIEVEMENT_DIFFICULTY)[number];
export type AchievementDiary = (typeof ACHIEVEMENT_DIARIES)[number];
export type QuestDifficulty = (typeof QUEST_DIFFICULTY)[number];
export type Skill = (typeof SKILLS)[number];
export type Summary = (typeof SUMMARY_ITEMS)[number];

export type Completion = 'unlocked' | 'locked' | 'completed';

/* SKILLS */

interface SkillDetail {
  level: number;
  isLocked: boolean;
}

export type SkillState = Record<Skill, SkillDetail>;

export type PartialSkillState = PartialRecord<Skill, SkillDetail>;

/* ACHIEVEMENTS */

export interface SkillsRequirement {
  all?: PartialRecord<Skill, number>;
  any?: PartialRecord<Skill, number>;
}

export interface Requirement {
  type: 'ironman' | 'main';
  description?: string;
  quests?: Array<string>;
  skills?: SkillsRequirement;
}

export interface Achievement {
  diary: AchievementDiary;
  difficulty: AchievementDifficulty;
  task: string;
  requirements: Array<Requirement>;
}

export type AchievementState = Array<
  Achievement & {
    isComplete: boolean;
  }
>;
