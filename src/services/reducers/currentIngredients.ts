import {createSlice} from '@reduxjs/toolkit';
import {IIngredientKey} from '../../utils/types';

type ICurrentIngredientsSlice = {
  bun: null | IIngredientKey;
  ingredients: IIngredientKey[];
};

const initialState: ICurrentIngredientsSlice = {
  bun: null,
  ingredients: []
};

const currentIngredientsSlice = createSlice({
  name: 'currentIngredients',
  initialState,
  reducers: {
    addIngeredient:  (state, action) => {
      const {key, ingredient} = action.payload;
      const data = {...ingredient, key};

      if (ingredient.type === 'bun') {
        state.bun = data;
      } else {
        state.ingredients.push(data);
      }
    },
    deleteCurrentIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== action.payload/* .key */
      );
    },
    sortingIngredient: (state, {payload: {dragIndex, hoverIndex}}) => {
        const {ingredients} = state;

        [ingredients[dragIndex], ingredients[hoverIndex]] = [
          ingredients[hoverIndex],
          ingredients[dragIndex],
        ];
    },
    reset: () => initialState,
  },
});

export const {addIngeredient, deleteCurrentIngredient, sortingIngredient, reset} = currentIngredientsSlice.actions;

export default currentIngredientsSlice.reducer;
