import type { ACHIEVEMENT_DIFFICULTY, ACHIEVEMENT_DIARIES, QUEST_DIFFICULTY, SKILLS } from '@utils/constants';

/* TYPES */

export type Skill = (typeof SKILLS)[number];
export type AchievementDifficulty = (typeof ACHIEVEMENT_DIFFICULTY)[number];
export type AchievementDiary = (typeof ACHIEVEMENT_DIARIES)[number];
export type QuestDifficulty = (typeof QUEST_DIFFICULTY)[number];

/* ACHIEVEMENTS */

interface SkillsRequirements {
  all?: Array<PartialRecord<Skill, number>>;
  any?: Array<PartialRecord<Skill, number>>;
}

interface Requirements {
  type: 'ironman' | 'main';
  description?: string;
  quests?: Array<string>;
  skills?: SkillsRequirements;
}

export interface Achievement {
  diary: AchievementDiary;
  difficulty: AchievementDifficulty;
  task: string;
  requirements: Array<Requirements>;
}
