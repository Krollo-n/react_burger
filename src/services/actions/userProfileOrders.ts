import { createAction } from '@reduxjs/toolkit';
import {IWsMessage} from '../../utils/types';

export const wsProfileOrdersConnect = createAction<string, 'WS_PROFILE_ORDERS_CONNECT'>('WS_PROFILE_ORDERS_CONNECT');
export const wsProfileOrdersDisconnect = createAction('WS_PROFILE_ORDERS_DISCONNECT');
export const wsProfileOrdersOpen = createAction('WS_PROFILE_ORDERS_OPEN');
export const wsProfileOrdersClose = createAction('WS_PROFILE_ORDERS_CLOSE');
export const wsProfileOrdersConnecting = createAction('WS_PROFILE_ORDERS_CONNECTING');
export const wsProfileOrdersMessage = createAction<IWsMessage, 'WS_PROFILE_ORDERS_MESSAGE'>('WS_PROFILE_ORDERS_MESSAGE');
export const wsProfileOrdersError = createAction<string, 'WS_PROFILE_ORDERS_ERROR'>('WS_PROFILE_ORDERS_ERROR');
