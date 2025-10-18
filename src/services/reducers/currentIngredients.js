import { createAction, createReducer } from '@reduxjs/toolkit';

export const ADD_INGREDIENT = createAction('currentIngredients/addIngredient');
export const DELETE_INGREDIENT = createAction('currentIngredients/deleteIngredient');
export const SORTING_INGREDIENT = createAction('currentIngredients/sortingIngredient');
export const RESET = createAction('currentIngredients/reset');

const initialState = {bun: null, ingredients: []};

const currentIngredientsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_INGREDIENT, (state, action) => {
      const {key, ingredient} = action.payload;
      const data = {...ingredient, key};

      if (ingredient.type === 'bun') {
        state.bun = data;
      } else {
        state.ingredients.push(data);
      }
    })
    .addCase(DELETE_INGREDIENT, (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.key !== action.payload.key
      );
    })
    .addCase(
      SORTING_INGREDIENT,
      (state, {payload: {dragIndex, hoverIndex}}) => {
        const {ingredients} = state;

        [ingredients[dragIndex], ingredients[hoverIndex]] = [
          ingredients[hoverIndex],
          ingredients[dragIndex],
        ];
      }
    )
    .addCase(RESET, () => initialState)
    .addDefaultCase((state) => state);
});

export default currentIngredientsReducer;
