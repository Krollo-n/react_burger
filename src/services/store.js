import {configureStore} from '@reduxjs/toolkit';
import {ingredientsApiReducer} from "./reducers/ingredients" ;
import currentIngredientReducer from "./reducers/currentIngredient";
import currentIngredientsReducer from "./reducers/currentIngredients";
import orderDetailsSlice from "./reducers/orderDetails";

const store = configureStore({
  reducer: {
    [ingredientsApiReducer.reducerPath]: ingredientsApiReducer.reducer,
    currentIngredient: currentIngredientReducer,
    currentIngredients: currentIngredientsReducer,
    orderDetails: orderDetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApiReducer.middleware),
});

export default store;
