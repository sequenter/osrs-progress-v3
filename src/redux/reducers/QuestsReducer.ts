import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { QuestsState } from '@types';
import { QUESTS } from '@utils/constants';

const initialQuestsState = QUESTS.reduce((acc, quest) => [...acc, { ...quest, isComplete: false }], [] as QuestsState);

const initialState = {
  detail: initialQuestsState,
  QP: 0
};

const indexMap = initialQuestsState.reduce(
  (acc, { name }, index) => ({ ...acc, [name]: index }),
  {} as Record<string, number>
);

export const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setIsComplete: (state, { payload: { id, isComplete } }: PayloadAction<{ id: string; isComplete: boolean }>) => {
      const QPReward = state.detail[indexMap[id]].rewards?.QP ?? 0;

      state.detail[indexMap[id]].isComplete = isComplete;
      state.QP = state.QP + (isComplete ? QPReward : -QPReward);
    }
  },
  selectors: {
    getQP: (state) => {
      return state.QP;
    },
    getQuests: (state) => {
      return state.detail;
    }
  }
});

export const { setIsComplete } = questsSlice.actions;
export const { getQP, getQuests } = questsSlice.selectors;

export default questsSlice.reducer;
