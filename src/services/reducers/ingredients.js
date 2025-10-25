import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async () => {
       try {
         const result = await fetch(`${API.baseUrl}${API.endpoints.ingredients}`);

          if (!result.ok) {
            return Promise.reject(new Error(`Ошибка ${result.status}`));
          }
    
          return await result.json();
        } catch (err) {
           return Promise.reject(new Error(`Ошибка: ${err}`));

        }
    }
)

const initialState = {
    ingredients: [],
    requested: false,
    succeed: false,
    failed: false,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
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
    },
})

export default ingredientsSlice.reducer

