import {configureStore} from '@reduxjs/toolkit';
import ingredientsReducer from "./reducers/ingredients" ;
import currentIngredientReducer from "./reducers/currentIngredient";
import currentIngredientsReducer from "./reducers/currentIngredients";
import orderDetailsSlice from "./reducers/orderDetails";
import userReducer from "./reducers/user";
import passwordReducer from "./reducers/password";
import {ordersReducer} from './reducers/orders';
import {socketMiddleware} from "./middlewares/socketMiddleware";
import authMiddleware from "./middlewares/authMiddleware";
import {wsOrdersConnect, wsOrdersDisconnect, wsOrdersConnecting, wsOrdersOpen, wsOrdersClose, wsOrdersMessage, wsOrdersError} from './actions/orders';
import {wsProfileOrdersConnect,wsProfileOrdersDisconnect, wsProfileOrdersConnecting, wsProfileOrdersOpen,wsProfileOrdersClose,wsProfileOrdersMessage,wsProfileOrdersError} from "./actions/userProfileOrders";
import {userProfileOrdersReducer} from './reducers/userProfileOrders';

const OrdersMiddleware = socketMiddleware({
  wsConnect: wsOrdersConnect,
  wsDisconnect: wsOrdersDisconnect,
  wsConnecting: wsOrdersConnecting,
  onOpen: wsOrdersOpen,
  onClose: wsOrdersClose,
  onError: wsOrdersError,
  onMessage: wsOrdersMessage,
});

const UserProfileOrdersMiddleware = socketMiddleware({
  wsConnect: wsProfileOrdersConnect,
  wsDisconnect: wsProfileOrdersDisconnect,
  wsConnecting: wsProfileOrdersConnecting,
  onOpen: wsProfileOrdersOpen,
  onClose: wsProfileOrdersClose,
  onError: wsProfileOrdersError,
  onMessage: wsProfileOrdersMessage
});

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    currentIngredient: currentIngredientReducer,
    currentIngredients: currentIngredientsReducer,
    orderDetails: orderDetailsSlice,
    user: userReducer,
    password: passwordReducer,
    orders: ordersReducer,
    userProfileOrders: userProfileOrdersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware, OrdersMiddleware, UserProfileOrdersMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
