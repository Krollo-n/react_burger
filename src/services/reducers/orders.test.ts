import {ordersReducer} from './orders';
import {wsOrdersClose, wsOrdersConnecting, wsOrdersError, wsOrdersMessage, wsOrdersOpen} from "../actions/orders";
import {IOrderFeed, WebsocketStatus, IOrdersStore, IWsMessage} from '../../utils/types';

const orderFeed: IOrderFeed[] = [{ name: 'nyam-nyam', number: 1, ingredients: ['i1', 'i2'], _id: '6', status: 'done', createdAt: '2025', updatedAt: '2025'}];
const wsMessage: IWsMessage  = {success: true, orders: orderFeed, total: 666, totalToday: 6};

describe('orders reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
  }

  it('orders -- wsOrdersConnecting', function () {
    const state = ordersReducer(initialState, wsOrdersConnecting());
    expect(state.status).toEqual(WebsocketStatus.CONNECTING);
  });

  it('orders -- wsOrdersOpen', function () {
    const state = ordersReducer(initialState, wsOrdersOpen());
    expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE});
  });

  it('orders -- wsOrdersClose', function () {
    const state = ordersReducer(initialState, wsOrdersClose());
    expect(state).toEqual({...initialState, status: WebsocketStatus.OFFLINE});
  });

  it('orders -- wsOrdersError', function () {
    const state = ordersReducer(initialState, wsOrdersError('error'));
    expect(state).toEqual({...initialState, connectionError: 'error'});
  });

  it('orders -- wsOrdersMessage', function () {
    const state = ordersReducer(initialState, wsOrdersMessage(wsMessage));
    expect(state.orders).toEqual(wsMessage.orders);
  });
})
