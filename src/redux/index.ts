import AchievementsReducer from '@redux/reducers/AchievementsReducer';
import CollectionsReducer from '@redux/reducers/CollectionsReducer';
import PetsReducer from '@redux/reducers/PetsReducer';
import QuestsReducer from '@redux/reducers/QuestsReducer';
import SettingsReducer from '@redux/reducers/SettingsReducer';
import SkillsReducer from '@redux/reducers/SkillsReducer';
import { configureStore } from '@reduxjs/toolkit';

import { getItem } from '@utils/storage';

const preloadedState = (getItem('store') as object) ?? undefined;

export const store = configureStore({
  reducer: {
    achievements: AchievementsReducer,
    collections: CollectionsReducer,
    pets: PetsReducer,
    quests: QuestsReducer,
    settings: SettingsReducer,
    skills: SkillsReducer
  },
  preloadedState
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
