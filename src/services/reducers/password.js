import {createSlice} from '@reduxjs/toolkit';
import {restorePassword} from '../thunks/password';
import {resetPassword} from '../thunks/password';
  
const initialState = {
    restorePasswordRequested: false,
    restorePasswordSucceed: false,
    restorePasswordFailed: false,
    resetPasswordRequested: false,
    resetPasswordSucceed: false,
    resetPasswordFailed: false,
};

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setResetCode: (state, action) => {state.resetCode = action.payload}
  },
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