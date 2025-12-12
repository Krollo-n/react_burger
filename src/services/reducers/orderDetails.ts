import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import {request} from '../../utils/api';
import {IIngredientKey, IOrder, IError} from '../../utils/types'; 

export const addOrder = createAsyncThunk(
  'orderDetails/addOrder',
   async ({ingredients, bun, token}: { ingredients: IIngredientKey[], bun: IIngredientKey, token: string }) => {
    let ingredientIds = ingredients.map(el => el._id).concat([bun?._id, bun?._id])
    return await request(`${API.endpoints.orders}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8', Authorization: `Bearer ${token}`},
      body: JSON.stringify({"ingredients": ingredientIds})
    })
  } 
);

interface IOrderDetailsSlice {
  order: IOrder | null;
  status: boolean;
  error: IError | null;
  success: boolean;
  failed: boolean;
  requested: boolean;
}

const initialState: IOrderDetailsSlice = {
  order: null,
  status: false,
  error: null,
  success:false,
  failed: false,
  requested: false
};

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = false;
        state.requested = false;
        state.success = true;
        state.failed = false;
        state.order = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.status = true;
        state.requested = true;
        state.error = null;
        state.success = false;
        state.failed = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = false;
        state.requested = false;
        state.error = action.payload as IError;
        state.success = false;
        state.failed = true;
      })

      .addDefaultCase((state) => state);
  },
});

export default orderDetailsSlice.reducer;
