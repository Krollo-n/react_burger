import {createSlice} from '@reduxjs/toolkit';
import {editUser, getUser, loginUser, registerUser, logout} from '../thunks/user';
import {IUserLogin, IError} from "../../utils/types";

interface IUserSlice {
  user: IUserLogin | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: IError | null;
}

const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
         state.user = action.payload.user;
         state.isAuthChecked = true;
         state.isLoading = false;
         state.error = null;
       })
      .addCase(registerUser.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
      .addCase(registerUser.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload  as IError;
       })
      .addCase(loginUser.fulfilled, (state, action) => {
         state.user = action.payload.user;
         state.isAuthChecked = true;
         state.isLoading = false;
         state.error = null;
       })
      .addCase(loginUser.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
      .addCase(loginUser.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload  as IError;
       })
      .addCase(logout.fulfilled, (state,action) => {
         localStorage.clear()
         state.user = initialState.user;
         state.isLoading = false;
         state.error = null;
       })
      .addCase(logout.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
      .addCase(logout.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload  as IError;
       })
      .addCase(getUser.fulfilled, (state, action) => {
         state.user = action.payload.user;
         state.isAuthChecked = true;
       })
      .addCase(getUser.rejected, (state) => {
         state.isAuthChecked = true;
       })
      .addCase(editUser.fulfilled, (state, action) => {
         state.user = action.payload.user;
       })
}
});

export default userSlice.reducer;