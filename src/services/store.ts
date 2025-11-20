import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from "./reducers/ingredients" ;
import currentIngredientReducer from "./reducers/currentIngredient";
import currentIngredientsReducer from "./reducers/currentIngredients";
import orderDetailsSlice from "./reducers/orderDetails";
import userReducer from "./reducers/user";
import passwordReducer from "./reducers/password";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    currentIngredients: currentIngredientsReducer,
    orderDetails: orderDetailsSlice,
    user: userReducer,
    password: passwordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
