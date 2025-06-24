import { initialSkillsState } from '@redux/reducers/SkillsReducer';

import type { AchievementState, PartialSkillState, QuestState, SkillState } from '@types';
import { createContext, useContext } from 'react';

interface Actions {
  skills: SkillState;
  completedSkills: PartialSkillState;
  unlockedSkills: PartialSkillState;
  completedAchievements: AchievementState;
  unlockedAchievements: AchievementState;
  lockedAchievements: AchievementState;
  completedQuests: QuestState;
  unlockedQuests: QuestState;
  lockedQuests: QuestState;
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
  completedQuests: [],
  unlockedQuests: [],
  lockedQuests: [],
  combat: false,
  combatLevel: 3
});

export const useActions = () => useContext(ActionsContext);
