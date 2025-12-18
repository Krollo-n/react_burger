import orderDetailsSlice from './orderDetails';
import {addOrder} from './orderDetails';
import {IError} from '../../utils/types';

const orderData = {number: 666};
const error: IError = {success: false, message: 'error'};

describe('send order reducer', () => {
  const initialState = {
    order: null,
    status: false,
    error: null,
    success:false,
    failed: false,
    requested: false
  }

  it('should send order -- fulfilled', function () {
    const state = orderDetailsSlice(initialState, {type: addOrder.fulfilled.type, payload: orderData});
    expect(state).toEqual({...initialState, requested: false, success:true, order: orderData});
  });

  it('should send order -- pending', function () {
    const state = orderDetailsSlice(initialState, {type: addOrder.pending.type});
    expect(state).toEqual({...initialState, status: true, requested: true});
  });

  it('should send order -- rejected', function () {
    const state = orderDetailsSlice(initialState, {type: addOrder.rejected.type, payload: error});
    expect(state).toEqual({...initialState, failed: true, error: error});
  });
})
