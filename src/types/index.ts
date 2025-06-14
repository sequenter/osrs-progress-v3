import type { SKILLS } from '@utils/constants';

export type Diary = 'ardougne';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'elite';

export type Skill = (typeof SKILLS)[number];

interface Requirements {
  quests: Array<string>;
}

export interface Achievement {
  diary: Diary;
  difficulty: Difficulty;
  task: string;
  requirements: Requirements;
}

/* STORAGE */
export type SkillStore = {
  [key in Skill]: {
    level: number;
    locked: boolean;
  };
};

/* FUNCTIONS */
export type Consumer<T> = (T: T) => void;
