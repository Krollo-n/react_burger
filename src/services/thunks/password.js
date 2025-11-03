import {createAsyncThunk} from "@reduxjs/toolkit";
import API from '../../utils/api';
import {request} from "../../utils/api";

export const restorePassword = createAsyncThunk(
    'password/restorePassword',
    async (email) => {
        return await request(`${API.endpoints.password.reset}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({email: email})
        })
    }
)

export const resetPassword = createAsyncThunk(
    'password/resetPassword',
    async ({password,code}) => {
        return await request(`${API.endpoints.password.forgot}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({password: password, token: code})
        })
    }
)

