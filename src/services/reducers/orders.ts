import {createReducer} from "@reduxjs/toolkit";
import {IOrderFeed, WebsocketStatus, IOrdersStore} from '../../utils/types';
import {wsOrdersClose, wsOrdersConnecting, wsOrdersError, wsOrdersMessage, wsOrdersOpen} from "../actions/orders";
import API from '../../utils/api';
import {request} from '../../utils/api';

export const initialState: IOrdersStore = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
};

export const getOrder = (number: string | undefined) => {
  return  request(`${API.endpoints.orders}/${number}`, {headers: {'Content-Type': 'application/json'}})
    .then((res) => {
      if (res.success) return res.orders[0];
      return Promise.reject(res);
    });
  }; 

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsOrdersConnecting, (state) => {
       state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOrdersOpen, (state) => {
       state.status = WebsocketStatus.ONLINE;
    })
    .addCase(wsOrdersClose, (state) => {
       state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsOrdersError, (state, action) => {
       state.connectionError = action.payload;
       state.orders = [];
    })
    .addCase(wsOrdersMessage, (state, action) => {
       state.orders = action.payload.orders
       state.total = action.payload.total
       state.totalToday = action.payload.totalToday
    })
    .addDefaultCase((state) => state);       
}) 
