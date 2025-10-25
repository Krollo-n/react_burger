import { createAction, createReducer } from '@reduxjs/toolkit';

export const SHOW_INGREDIENT_DETAILS = createAction('currentIngredient/showIngredientDetails');
export const RESET = createAction('currentIngredient/reset');

const initialState = {
  ingredient: {
    _id: '',
    name: '',
    image: '',
    calories: '',
    proteins: '',
    fat: '',
    carbohydrates: '',
  },
};

const currentIngredientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      SHOW_INGREDIENT_DETAILS,
      (state,{payload: { _id, name, image, calories, proteins, fat, carbohydrates },}) => 
      {
        state.ingredient = {
          _id,
          name,
          image,
          calories,
          proteins,
          fat,
          carbohydrates,
        };
      }
    )
    .addCase(RESET, () => initialState)
    .addDefaultCase((state) => state);
});

export default currentIngredientReducer;
