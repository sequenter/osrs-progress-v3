import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PetsState } from '@types';
import { PETS } from '@utils/constants';

const initialPetsState = PETS.reduce((acc, pet) => [...acc, { ...pet, isComplete: false }], [] as PetsState);

const initialState = {
  detail: initialPetsState
};

const indexMap = initialPetsState.reduce(
  (acc, { name }, index) => ({ ...acc, [name]: index }),
  {} as Record<string, number>
);

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setIsComplete: (state, { payload: { id, isComplete } }: PayloadAction<{ id: string; isComplete: boolean }>) => {
      state.detail[indexMap[id]].isComplete = isComplete;
    }
  },
  selectors: {
    getPets: (state) => {
      return state.detail;
    }
  }
});

export const { setIsComplete } = petsSlice.actions;
export const { getPets } = petsSlice.selectors;

export default petsSlice.reducer;
