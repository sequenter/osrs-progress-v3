import { initialSkillsState } from '@redux/reducers/SkillsReducer';

import type { AchievementState, PartialSkillState, PetState, QuestState, SkillState } from '@types';
import { createContext, useContext } from 'react';

interface Actions {
  skills: SkillState;
  completedSkills: PartialSkillState;
  unlockedSkills: PartialSkillState;
  completedAchievements: AchievementState;
  unlockedAchievements: AchievementState;
  lockedAchievements: AchievementState;
  completedPets: PetState;
  unlockedPets: PetState;
  lockedPets: PetState;
  completedQuests: QuestState;
  unlockedQuests: QuestState;
  lockedQuests: QuestState;
  combat: boolean;
  combatLevel: number;
  QP: number;
}

export const ActionsContext = createContext<Actions>({
  skills: initialSkillsState,
  completedSkills: {},
  unlockedSkills: {},
  completedAchievements: [],
  unlockedAchievements: [],
  lockedAchievements: [],
  completedPets: [],
  unlockedPets: [],
  lockedPets: [],
  completedQuests: [],
  unlockedQuests: [],
  lockedQuests: [],
  combat: false,
  combatLevel: 3,
  QP: 0
});

export const useActions = () => useContext(ActionsContext);
