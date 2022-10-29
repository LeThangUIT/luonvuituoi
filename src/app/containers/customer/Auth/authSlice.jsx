import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../../api/authApi";
import { HTTP_STATUS } from "../../../constant";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null
export const login = createAsyncThunk(
    'auth/login',
    async (data, {rejectWithValue}) => {
        try{
            const response = await AuthApi.login(data)
            localStorage.setItem('userToken', response.data)
            return response.data
        } catch(error) {       
            return rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data, {rejectWithValue}) => {
        try{
            const response = await AuthApi.register(data)
            return response.data
        } catch(error) {       
            return rejectWithValue(error.response.data)
        }
    }
)

export const verify = createAsyncThunk(
    'auth/verify',
    async (data, {rejectWithValue}) => {
        try{
            const response = await AuthApi.verify(data)
            return response.data
        } catch(error) {       
            return rejectWithValue(error.response.data)
        }
    }
)


const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        userToken,
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            state.userToken = action.payload.data
        },
        [login.rejected]: (state, action) => {
            state.loading = false
        },

        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
        },
        [register.rejected]: (state, action) => {
            state.loading = false
        },

        [verify.pending]: (state, action) => {
            state.loading = true
        },
        [verify.fulfilled]: (state, action) => {
            state.loading = false
        },
        [verify.rejected]: (state, action) => {
            state.loading = false
        },
    }

})

export const { reducer: AuthReducer, actions} = AuthSlice
export const {} = actions
export default AuthReducer