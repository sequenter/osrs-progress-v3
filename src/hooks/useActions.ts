import { initialSkillsState } from '@redux/reducers/SkillsReducer';

import type {
  AchievementsState,
  CollectionsState,
  PartialSkillState,
  PetsState,
  QuestsState,
  SkillState
} from '@types';
import { createContext, useContext } from 'react';

interface Actions {
  skills: SkillState;
  completedSkills: PartialSkillState;
  unlockedSkills: PartialSkillState;
  completedAchievements: AchievementsState;
  unlockedAchievements: AchievementsState;
  lockedAchievements: AchievementsState;
  completedCollections: CollectionsState;
  unlockedCollections: CollectionsState;
  lockedCollections: CollectionsState;
  completedPets: PetsState;
  unlockedPets: PetsState;
  lockedPets: PetsState;
  completedQuests: QuestsState;
  unlockedQuests: QuestsState;
  lockedQuests: QuestsState;
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
  completedCollections: [],
  unlockedCollections: [],
  lockedCollections: [],
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
