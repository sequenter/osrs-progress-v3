import AchievementsReducer from '@redux/reducers/AchievementsReducer';
import QuestsReducer from '@redux/reducers/QuestsReducer';
import SkillsReducer from '@redux/reducers/SkillsReducer';
import { configureStore } from '@reduxjs/toolkit';

import { getItem } from '@utils/storage';

const preloadedState = (getItem('store') as object) ?? undefined;

export const store = configureStore({
  reducer: {
    achievements: AchievementsReducer,
    quests: QuestsReducer,
    skills: SkillsReducer
  },
  preloadedState
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
