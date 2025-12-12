import {createAction} from '@reduxjs/toolkit';
import {IWsMessage} from '../../utils/types';

export const wsOrdersConnect = createAction<string, 'WS_ORDERS_CONNECT'>('WS_ORDERS_CONNECT');
export const wsOrdersDisconnect = createAction('WS_ORDERS_DISCONNECT');
export const wsOrdersOpen = createAction('WS_ORDERS_CONNECTION_OPEN');
export const wsOrdersClose = createAction('WS_ORDERS_CONNECTION_CLOSE');
export const wsOrdersConnecting = createAction('WS_ORDERS_CONNECTING');
export const wsOrdersMessage = createAction<IWsMessage, 'WS_ORDERS_MESSAGE'>('WS_ORDERS_MESSAGE');
export const wsOrdersError = createAction<string, 'WS_ORDERS_ERROR'>('WS_ORDERS_ERROR');
