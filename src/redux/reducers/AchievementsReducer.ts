import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AchievementState } from '@types';
import { ACHIEVEMENTS } from '@utils/constants';

const initialAchievementsState = ACHIEVEMENTS.reduce(
  (acc, achievement) => [...acc, { ...achievement, isComplete: false }],
  [] as AchievementState
);

const initialState = {
  detail: initialAchievementsState
};

const indexMap = initialAchievementsState.reduce(
  (acc, { task }, index) => ({ ...acc, [task]: index }),
  {} as Record<string, number>
);

export const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setIsComplete: (state, { payload: { task, isComplete } }: PayloadAction<{ task: string; isComplete: boolean }>) => {
      state.detail[indexMap[task]].isComplete = isComplete;
    }
  },
  selectors: {
    getAchievements: (state) => state.detail
  }
});

export const { setIsComplete } = achievementsSlice.actions;
export const { getAchievements } = achievementsSlice.selectors;

export default achievementsSlice.reducer;
