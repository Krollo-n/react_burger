import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import {request} from '../../utils/api'; 
import {IIngredient} from "../../utils/types";
import {IIngredientsSlice} from '../../utils/types';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
   async () => {return await request(`${API.endpoints.ingredients}`)} 
)

export const initialState: IIngredientsSlice = {
  ingredients: [],
  requested: false,
  succeed: false,
  failed: false
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
          state.requested = false
          state.ingredients = action.payload.data
      })
      .addCase(getIngredients.pending, (state) => {
          state.requested = true
      })
      .addCase(getIngredients.rejected, (state) => {
          state.requested = false
          state.failed = true
      })
  }
})

export default ingredientsSlice.reducer

