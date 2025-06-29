import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CollectionsState } from '@types';
import { COLLECTIONS } from '@utils/constants';

const initialCollectionsState = COLLECTIONS.reduce(
  (acc, { items, ...rest }) => [
    ...acc,
    { ...rest, items: items.map((item) => ({ ...item, isComplete: false })), isComplete: false }
  ],
  [] as CollectionsState
);

const initialState = {
  detail: initialCollectionsState
};

const indexMap = initialCollectionsState.reduce(
  (acc, { name }, index) => ({ ...acc, [name]: index }),
  {} as Record<string, number>
);

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setIsComplete: (state, { payload: { id, isComplete } }: PayloadAction<{ id: string; isComplete: boolean }>) => {
      state.detail[indexMap[id]].isComplete = isComplete;
      state.detail[indexMap[id]].items = state.detail[indexMap[id]].items.map((item) => ({ ...item, isComplete }));
    },
    setIsItemComplete: (
      state,
      { payload: { id, isComplete, itemId } }: PayloadAction<{ id: string; isComplete: boolean; itemId: string }>
    ) => {
      const itemIndex = state.detail[indexMap[id]].items.findIndex(({ name }) => name === itemId);

      if (itemIndex > -1) {
        state.detail[indexMap[id]].items[itemIndex].isComplete = isComplete;
        state.detail[indexMap[id]].isComplete =
          isComplete &&
          state.detail[indexMap[id]].items.filter(({ isComplete }) => isComplete).length ===
            state.detail[indexMap[id]].items.length;
      }
    }
  },
  selectors: {
    getCollections: (state) => {
      return state.detail;
    }
  }
});

export const { setIsComplete, setIsItemComplete } = collectionsSlice.actions;
export const { getCollections } = collectionsSlice.selectors;

export default collectionsSlice.reducer;
