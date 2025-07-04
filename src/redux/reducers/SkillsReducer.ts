import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Skill, SkillState } from '@types';
import { isCombatSkill } from '@utils/common';
import { SKILLS } from '@utils/schema';

const initialCombatState = {
  combat: false,
  combatLevel: 3
};

export const initialSkillsState = SKILLS.reduce(
  (acc, skill) => ({ ...acc, [skill]: { level: skill === 'Hitpoints' ? 10 : 1, isLocked: true } }),
  {} as SkillState
);

const initialState = {
  detail: initialSkillsState,
  combat: initialCombatState
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

      if (isCombatSkill(skill)) {
        const { Attack, Defence, Hitpoints, Magic, Prayer, Ranged, Strength } = state.detail;

        // Calculate combat level
        // https://oldschool.runescape.wiki/w/Combat_level
        const combatLevel = Math.floor(
          (Defence.level + Hitpoints.level + Math.floor(Prayer.level * 0.5)) * 0.25 +
            Math.max((Attack.level + Strength.level) * 0.325, Ranged.level * 1.5 * 0.325, Magic.level * 1.5 * 0.325)
        );

        state.combat = { ...state.combat, combatLevel };
      }
    },
    setCombat: (state, { payload: combat }: PayloadAction<boolean>) => {
      state.combat = { ...state.combat, combat };
    }
  },
  selectors: {
    getCombat: (state) => state.combat,
    getSkills: (state) => state.detail
  }
});

export const { setCombat, setIsLocked, setLevel } = skillsSlice.actions;
export const { getCombat, getSkills } = skillsSlice.selectors;

export default skillsSlice.reducer;
