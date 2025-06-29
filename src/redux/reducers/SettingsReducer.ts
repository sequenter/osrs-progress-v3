import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isIronman: false
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setIsIronman: (state, { payload: { isIronman } }: PayloadAction<{ isIronman: boolean }>) => {
      state.isIronman = isIronman;
    }
  },
  selectors: {
    getIsIronman: (state) => {
      return state.isIronman;
    }
  }
});

export const { setIsIronman } = settingsSlice.actions;
export const { getIsIronman } = settingsSlice.selectors;

export default settingsSlice.reducer;
