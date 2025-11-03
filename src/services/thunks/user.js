import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchWithRefresh, request} from "../../utils/api";
import API from '../../utils/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (arg) => {
    return await request(`${API.endpoints.register}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
          "email": arg.email,
          "password": arg.password,
          "name": arg.name
      })
    })
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
   async (arg) => {
      return await request(`${API.endpoints.login}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            "email": arg.email,
            "password": arg.password
        })
    })
  }
)

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    let token = localStorage.getItem("accessToken")
    return await fetchWithRefresh(`${API.endpoints.userData}`, {
        method: 'GET',
        headers: {authorization: `Bearer ${token}`}
    })
  }
)

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({email, name, password}) => {
    let token = localStorage.getItem("accessToken")
    const requestBody = {email, name, password}
    Object.keys(requestBody).forEach(key => (requestBody[key] ?? '') === '' && delete requestBody[key])
    return await fetchWithRefresh(`${API.endpoints.userData}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json;charset=utf-8', authorization: `Bearer ${token}`},
        body: JSON.stringify({...requestBody})
    })
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    let token = localStorage.getItem("refreshToken")
    return await request(`${API.endpoints.logout}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({token: token})
     })
   }
)

