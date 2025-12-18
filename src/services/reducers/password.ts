import {createSlice} from '@reduxjs/toolkit';
import {restorePassword} from '../thunks/password';
import {resetPassword} from '../thunks/password';
import {IPasswordSlice} from '../../utils/types';

const initialState: IPasswordSlice = {
  restorePasswordRequested: false,
  restorePasswordSucceed: false,
  restorePasswordFailed: false,
  resetPasswordRequested: false,
  resetPasswordSucceed: false,
  resetPasswordFailed: false
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restorePassword.fulfilled, () => {return {...initialState, restorePasswordSucceed: true}})
      .addCase(restorePassword.pending, () => {return {...initialState, restorePasswordRequested: true}})
      .addCase(restorePassword.rejected, () => {return {...initialState, restorePasswordFailed: true}})
      .addCase(resetPassword.fulfilled, () => {return {...initialState, resetPasswordSucceed: true}})
      .addCase(resetPassword.pending, () => {return {...initialState, resetPasswordRequested: true} })
      .addCase(resetPassword.rejected, () => {return {...initialState, resetPasswordFailed: true}})
  }
});

export default passwordSlice.reducer;