import { configureStore } from '@reduxjs/toolkit';
import SkillsReducer from '@redux/reducers/SkillsReducer';
import { getItem } from '@utils/storage';

const preloadedState = (getItem('store') as object) ?? undefined;

export const store = configureStore({
  reducer: {
    skills: SkillsReducer
  },
  preloadedState
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
