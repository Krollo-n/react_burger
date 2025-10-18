import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from "./reducers/ingredients" ;
import currentIngredientReducer from "./reducers/currentIngredient";
import currentIngredientsReducer from "./reducers/currentIngredients";
import orderDetailsSlice from "./reducers/orderDetails";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    currentIngredients: currentIngredientsReducer,
    orderDetails: orderDetailsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
