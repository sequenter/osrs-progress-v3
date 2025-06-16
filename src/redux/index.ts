import AchievementsReducer from '@redux/reducers/AchievementsReducer';
import SkillsReducer from '@redux/reducers/SkillsReducer';
import { configureStore } from '@reduxjs/toolkit';

import { getItem } from '@utils/storage';

const preloadedState = (getItem('store') as object) ?? undefined;

export const store = configureStore({
  reducer: {
    achievements: AchievementsReducer,
    skills: SkillsReducer
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
