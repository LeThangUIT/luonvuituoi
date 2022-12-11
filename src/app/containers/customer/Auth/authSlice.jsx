import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../../api/authApi";
import { HTTP_STATUS } from "../../../constant";


export const admin = createAsyncThunk(
    'auth/admin', 
    async ( {rejectWithValue}) => {
        try{
            const response = await AuthApi.apiMe()
            return response.data
        } catch(error) {       
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchUserInfo = createAsyncThunk(
    'auth/user', 
    async (userToken, {rejectWithValue}) => {
        try{
            const response = await AuthApi.apiUserMe(userToken)
            return response.data
        } catch(error) {       
            return rejectWithValue(error.response.data)
        }
    }
)

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

export const adminLogin = createAsyncThunk(
    'auth/adminLogin',
    async (data, {rejectWithValue}) => {
        try{
            const response = await AuthApi.adminLogin(data)
            localStorage.setItem('adminToken', response.data)
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
        isAdmin: false,
        userToken: "",
        adminToken: "",
        userInfo: "",
        beforeLogin: "/"
    },
    reducers: {
        setBeforeLoginRoute: (state, action) => {
            state.beforeLogin = action.payload
        },
        logout: (state, action) => {
            state.userInfo = ""
            state.userToken = ""
            localStorage.removeItem("userToken")

        },

        adminLogout: (state, action) => {
            state.adminToken = ""
            state.adminToken = ""
            localStorage.removeItem("adminToken")

        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userToken", action.payload.data)
            state.userToken = action.payload.data
        },
        [login.rejected]: (state, action) => {
            state.loading = false
        },

        [fetchUserInfo.pending]: (state, action) => {
            state.loading = true
        },
        [fetchUserInfo.fulfilled]: (state, action) => {
            state.loading = false
            state.userInfo = action.payload.data
        },
        [fetchUserInfo.rejected]: (state, action) => {
            state.loading = false
        },

        [adminLogin.pending]: (state, action) => {
            state.loading = true
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminToken", action.payload.data)
            state.adminToken = action.payload.data
        },
        [adminLogin.rejected]: (state, action) => {
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

        [admin.pending]: (state, action) => {
            state.loading = true
        },
        [admin.fulfilled]: (state, action) => {
            state.loading = false
            state.isAdmin = action.payload.data.success
        },
        [admin.rejected]: (state, action) => {
            state.loading = false
        },
    }

})

export const { reducer: AuthReducer, actions} = AuthSlice
export const {setBeforeLoginRoute, logout, adminLogout} = actions
export default AuthReducer