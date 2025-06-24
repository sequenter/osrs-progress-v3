import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { QuestState } from '@types';
import { QUESTS } from '@utils/constants';

const initialQuestsState = QUESTS.reduce((acc, quest) => [...acc, { ...quest, isComplete: false }], [] as QuestState);

const initialState = {
  detail: initialQuestsState
};

const indexMap = initialQuestsState.reduce(
  (acc, { name }, index) => ({ ...acc, [name]: index }),
  {} as Record<string, number>
);

export const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setIsComplete: (state, { payload: { name, isComplete } }: PayloadAction<{ name: string; isComplete: boolean }>) => {
      state.detail[indexMap[name]].isComplete = isComplete;
    }
  },
  selectors: {
    getQuests: (state) => {
      return state.detail;
    }
  }
});

export const { setIsComplete } = questsSlice.actions;
export const { getQuests } = questsSlice.selectors;

export default questsSlice.reducer;
