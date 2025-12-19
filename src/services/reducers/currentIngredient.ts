import {createSlice} from '@reduxjs/toolkit';
import {ICurrentIngredientSlice} from '../../utils/types';

export  const initialState: ICurrentIngredientSlice = {
  ingredient: null
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    getIndredientDetails: (state, action) => {
      state.ingredient = action.payload
    },
    reset: () => initialState,
  },
});

export const {getIndredientDetails, reset} = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
