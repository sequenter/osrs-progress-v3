import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialAchievementsState } from '@redux/initialState';

const initialState = {
  detail: initialAchievementsState
};

const indexMap = initialAchievementsState.reduce(
  (acc, { task }, index) => ({ ...acc, [task]: index }),
  {} as { [key: string]: number }
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
