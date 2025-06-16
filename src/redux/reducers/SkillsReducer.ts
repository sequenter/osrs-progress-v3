import { initialSkillsState } from '@redux/initialState';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Skill } from '@types';

const initialState = {
  detail: initialSkillsState
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setIsLocked: (state, { payload: { skill, isLocked } }: PayloadAction<{ skill: Skill; isLocked: boolean }>) => {
      state.detail = { ...state.detail, [skill]: { ...state.detail[skill], isLocked } };
    },
    setLevel: (state, { payload: { skill, level } }: PayloadAction<{ skill: Skill; level: number }>) => {
      state.detail = { ...state.detail, [skill]: { ...state.detail[skill], level } };
    }
  },
  selectors: {
    getSkills: (state) => state.detail
  }
});

export const { setIsLocked, setLevel } = skillsSlice.actions;
export const { getSkills } = skillsSlice.selectors;

export default skillsSlice.reducer;
