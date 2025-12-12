import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import {refreshToken} from '../../utils/api';

export type TwsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>,
  wsDisconnect: ActionCreatorWithoutPayload,
  wsConnecting: ActionCreatorWithoutPayload,
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, unknown> => 
  (store) => {
	let socket: WebSocket | null = null;
	let isConnected = false;

	return next => action => {
	  const {dispatch} = store;
	  const {wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage, wsConnecting} = wsActions;
	  if (wsConnect.match(action)) {
		  socket = new WebSocket(action.payload);
		  isConnected = true;
		  dispatch(wsConnecting());
	  }

	  if (socket) {
		socket.onopen = () => {dispatch(onOpen())};

		socket.onerror = () => dispatch(onError('error'));

		socket.onmessage = (event) => {
			const {data} = event;
			const parsedData = JSON.parse(data);
			if (parsedData?.message==='Invalid or missing token') 
              refreshToken();
			else  
			  dispatch(onMessage(parsedData));
		};

		socket.onclose = () => dispatch(isConnected?onOpen():onClose());

		if (wsDisconnect.match(action)) {
			isConnected = false;
			socket.close()
			dispatch(onClose());
		}
      }

	  next(action);
	};
  }
