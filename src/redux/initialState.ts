import type { AchievementState, SkillState } from '@types';
import { ACHIEVEMENTS, SKILLS } from '@utils/constants';

export const initialCombatState = {
  combat: false,
  combatLevel: 3
};

export const initialSkillsState = SKILLS.reduce(
  (acc, skill) => ({ ...acc, [skill]: { level: skill === 'Hitpoints' ? 10 : 1, isLocked: true } }),
  {} as SkillState
);

export const initialAchievementsState = ACHIEVEMENTS.reduce(
  (acc, achievement) => [...acc, { ...achievement, isComplete: false }],
  [] as AchievementState
);
