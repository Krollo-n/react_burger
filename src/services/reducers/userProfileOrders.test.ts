import {userProfileOrdersReducer} from './userProfileOrders';
import {wsProfileOrdersClose, wsProfileOrdersConnecting, wsProfileOrdersError, wsProfileOrdersMessage, wsProfileOrdersOpen} from "../actions/userProfileOrders";
import {IOrderFeed, WebsocketStatus, IWsMessage} from '../../utils/types';

const orderFeed: IOrderFeed[] = [{ name: 'nyam-nyam', number: 1, ingredients: ['i1', 'i2'], _id: '6', status: 'done', createdAt: '2025', updatedAt: '2025'}];
const wsMessage: IWsMessage  = {success: true, orders: orderFeed, total: 666, totalToday: 6};

describe('userProfileOrders reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: WebsocketStatus.OFFLINE,
    error: '',
  }

  it('orders -- wsProfileOrdersConnecting', function () {
    const state = userProfileOrdersReducer(initialState, wsProfileOrdersConnecting());
    expect(state.status).toEqual(WebsocketStatus.CONNECTING);
  });

  it('orders -- wsProfileOrdersOpen', function () {
    const state = userProfileOrdersReducer(initialState, wsProfileOrdersOpen());
    expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE});
  });

  it('orders -- wsProfileOrdersClose', function () {
    const state = userProfileOrdersReducer(initialState, wsProfileOrdersClose());
    expect(state).toEqual({...initialState, status: WebsocketStatus.OFFLINE});
  });

  it('orders -- wsProfileOrdersError', function () {
    const state = userProfileOrdersReducer(initialState, wsProfileOrdersError('error'));
    expect(state).toEqual({...initialState, error: 'error'});
  });

  it('orders -- wsProfileOrdersMessage', function () {
    const state = userProfileOrdersReducer(initialState, wsProfileOrdersMessage(wsMessage));
    expect(state).toEqual({...initialState, orders: orderFeed, total: 666, totalToday: 6});
  });
})
