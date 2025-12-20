import {createReducer} from "@reduxjs/toolkit";
import {IOrderFeed, WebsocketStatus} from '../../utils/types';
import {wsProfileOrdersClose, wsProfileOrdersConnecting, wsProfileOrdersError, wsProfileOrdersMessage, wsProfileOrdersOpen} from "../actions/userProfileOrders";

export interface IUserProfileOrdersStore {
  orders: IOrderFeed[];
  total: number;
  totalToday: number;
  status: WebsocketStatus;
  error: string;
}

export const initialState: IUserProfileOrdersStore = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  error: ''
};

export const userProfileOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsProfileOrdersConnecting, (state) => {
       state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsProfileOrdersOpen, (state) => {
       state.status = WebsocketStatus.ONLINE;
       state.error = '';
    })
    .addCase(wsProfileOrdersClose, (state) => {
       state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsProfileOrdersError, (state, action) => {
       state.error = action.payload;
       state.orders = [];
    })
    .addCase(wsProfileOrdersMessage, (state, action) => {
       state.orders = action.payload.orders.sort((a,b)=>b.number-a.number); 
       state.total = action.payload.total??0;
       state.totalToday = action.payload.totalToday??0;
    })
})