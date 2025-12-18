import userSlice from './user';
import {registerUser, loginUser, getUser, editUser, logout} from '../thunks/user';
import {IError} from '../../utils/types';

const userData = {email: 'pyh-pyh@m.ru', name: 'Pyh Pyh', password: 'qwerty' };
const error: IError = {success: false, message: 'error'};

describe('user reducer', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    isLoading: false,
    error: null
  }

  it('should register user -- fulfilled', function () {
    const state = userSlice(initialState, {type: registerUser.fulfilled.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, isAuthChecked: true, user: userData});
  });

  it('should register user -- pending', function () {
    const state = userSlice(initialState, {type: registerUser.pending.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, isLoading:true});
  });

  it('should register user -- rejected', function () {
    const state = userSlice(initialState, {type: registerUser.rejected.type, payload: error});
    expect(state).toEqual({...initialState, isLoading: false, error: error});

  });

  it('should login user -- fulfilled', function () {
    const state = userSlice(initialState, {type: loginUser.fulfilled.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, isLoading: false, user: userData, isAuthChecked: true});
  });

  it('should login user -- pending', function () {
    const state = userSlice(initialState, {type: loginUser.pending.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, isLoading: true});
  });

  it('should login user -- rejected', function () {
    const state = userSlice(initialState, {type: loginUser.rejected.type, payload: error});
    expect(state).toEqual({...initialState, isLoading: false, error: error});
  });

  it('should logout user -- fulfilled', function () {
    const state = userSlice(initialState, {type: logout.fulfilled.type});
    expect(state).toEqual({...initialState, isLoading: false, user: null, isAuthChecked: false});
  });

  it('should logout user -- pending', function () {
    const state = userSlice(initialState, {type: logout.pending.type});
    expect(state).toEqual({...initialState, isLoading: true});
  });

  it('should logout user -- rejected', function () {
    const state = userSlice(initialState, {type: logout.rejected.type, payload: error});
    expect(state).toEqual({...initialState, isLoading: false, error: error});
  });

  it('should get user -- fulfilled', function () {
    const state = userSlice(initialState, {type: getUser.fulfilled.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, user: userData, isAuthChecked: true});
  });

  it('should get user -- rejected', function () {
    const state = userSlice(initialState, {type: getUser.rejected.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, isAuthChecked: true});
  });

  it('should edit user -- fulfilled', function () {
    const state = userSlice(initialState, {type: editUser.fulfilled.type, payload: {user: userData}});
    expect(state).toEqual({...initialState, user: userData});
  });
})
