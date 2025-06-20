import { initialSkillsState } from '@redux/initialState';

import type { AchievementState, PartialSkillState, SkillState } from '@types';
import { createContext, useContext } from 'react';

interface Actions {
  skills: SkillState;
  completedSkills: PartialSkillState;
  unlockedSkills: PartialSkillState;
  completedAchievements: AchievementState;
  unlockedAchievements: AchievementState;
  lockedAchievements: AchievementState;
  combat: boolean;
  combatLevel: number;
}

export const ActionsContext = createContext<Actions>({
  skills: initialSkillsState,
  completedSkills: {},
  unlockedSkills: {},
  completedAchievements: [],
  unlockedAchievements: [],
  lockedAchievements: [],
  combat: false,
  combatLevel: 3
});

export const useActions = () => useContext(ActionsContext);
