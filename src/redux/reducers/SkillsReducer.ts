import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Skill } from '@types';
import { SKILLS } from '@utils/constants';

type SkillDetail = {
  [key in Skill]: {
    level: number;
    isLocked: boolean;
  };
};

export type SkillsInitialState = {
  detail: SkillDetail;
};

const initialState: SkillsInitialState = {
  detail: SKILLS.reduce((acc, skill) => ({ ...acc, [skill]: { level: skill === 'Hitpoints' ? 10 : 1, isLocked: true } }), {} as SkillDetail)
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
    getIsLocked: (state, skill: Skill) => state.detail[skill].isLocked,
    getLevel: (state, skill: Skill) => state.detail[skill].level,
    getCompletedSkillCount: (state) => Object.entries(state.detail).filter(([, { isLocked, level }]) => !isLocked && level === 99).length,
    getUnlockedSkills: (state) =>
      Object.entries(state.detail).reduce(
        (acc, [skill, detail]) => (detail.isLocked ? acc : { ...acc, [skill]: detail }),
        {} as {
          [key in Skill]?: {
            level: number;
            isLocked: boolean;
          };
        }
      )
  }
});

export const { setIsLocked, setLevel } = skillsSlice.actions;
export const { getIsLocked, getLevel, getCompletedSkillCount, getUnlockedSkills } = skillsSlice.selectors;

export default skillsSlice.reducer;
