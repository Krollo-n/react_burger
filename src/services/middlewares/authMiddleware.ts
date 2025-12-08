import {isAction, isAsyncThunkAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (isAsyncThunkAction(action)){
    if (action.type === 'auth/register/fulfilled' || action.type === 'auth/login/fulfilled') {
      const accessToken = (action.payload as any).accessToken;
      const refreshToken = (action.payload as any).refreshToken;

      if (accessToken) 
        localStorage.setItem('accessToken', accessToken.split(' ')[1]);

      if (refreshToken) 
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  return next(action);
};

export default authMiddleware;
