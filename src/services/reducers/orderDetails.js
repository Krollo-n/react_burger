import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const addOrder = createAsyncThunk(
  'orderDetails/addOrder',
  async (arg, {reject}) => {
    try {
      let ingredientIds = arg.ingredients.map(el => el._id).concat([arg.bun?._id, arg.bun?._id])
      const result = await fetch(`${API.baseUrl}${API.endpoints.orders}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ingredients: ingredientIds}),
      });

      if (!result.ok) {
        return Promise.reject(new Error(`Ошибка ${result.status}`));
      }

      return await result.json();
    } catch (err) {
      return reject(
        `Ошибка: ${err}`
      );
    }
  }
);

const initialState = {
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
  reducers: {
    SAVE_ORDER(state, action) {state.order = action.payload;},
    RESET_ORDER: () => initialState,
  },
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
        state.error = action.payload;
        state.success = false;
        state.failed = true;
      })

      .addDefaultCase((state) => state);
  },
});

export const {SAVE_ORDER, RESET_ORDER} = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
