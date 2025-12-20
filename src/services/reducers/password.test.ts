import passwordSlice from './password';
import {initialState} from './password';
import {restorePassword} from '../thunks/password';
import {resetPassword} from '../thunks/password';

describe('password reducer', () => {
  const initialState = {
    restorePasswordRequested: false,
    restorePasswordSucceed: false,
    restorePasswordFailed: false,
    resetPasswordRequested: false,
    resetPasswordSucceed: false,
    resetPasswordFailed: false
  }

  it('should restore password -- fulfilled', function () {
    const state = passwordSlice(initialState, {type: restorePassword.fulfilled.type});
    expect(state).toEqual({...initialState, restorePasswordSucceed: true});
  });

  it('should restore password - pending', function () {
    const state = passwordSlice(initialState, {type: restorePassword.pending.type});
    expect(state).toEqual({...initialState, restorePasswordRequested: true});
  });

  it('should restore password - rejected', function () {
    const state = passwordSlice(initialState, {type: restorePassword.rejected.type});
    expect(state).toEqual({...initialState, restorePasswordFailed: true});
  });

  it('should reset password -- fulfilled', function () {
    const state = passwordSlice(initialState, {type: resetPassword.fulfilled.type});
    expect(state).toEqual({...initialState, resetPasswordSucceed: true});
  });

  it('should reset password - pending', function () {
    const state = passwordSlice(initialState, {type: resetPassword.pending.type});
    expect(state).toEqual({...initialState, resetPasswordRequested: true});
  });

  it('should reset password - rejected', function () {
    const state = passwordSlice(initialState, {type: resetPassword.rejected.type});
    expect(state).toEqual({...initialState, resetPasswordFailed: true});
  });
})
