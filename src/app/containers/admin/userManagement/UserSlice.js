import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../../api/userApi";

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async(data) => {
        const allUsers = await UserApi.getAllUsers(data);
        return allUsers;

    }
)

export const lockUser = createAsyncThunk(
    "user/lockUser",
    async({user, adminToken}) => {
        const res = await UserApi.lockUser({id: user.id, isLocked: user.isLocked, adminToken});
        const data = {user, res}
        return data;
    }
)

export const fetchUserInfoByAdmin = createAsyncThunk(
    "user/fetchUserInfoByAdmin",
    async(data) => {
        const res = await UserApi.getUserInfoByAdmin(data);
        return res.data;
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        listUser: [],
        isShow: false,
        userInfo: null,
        keyword: ""
    },

    reducers: {
        showUserModal: (state, action) => {
            state.isShow = true;
          },
          setUserKeyword: (state, action) => {
            state.keyword = action.payload
        }
    }, 
    extraReducers: {
        [getAllUsers.pending](state) {
            state.loading = true
        },
        [getAllUsers.fulfilled](state, action) {
            state.listUser = action.payload.data.data
            state.loading = false
        },
        [getAllUsers.rejected](state) {
            state.loading = false
        },

        [lockUser.pending](state) {
            state.loading = true
        },
        [lockUser.fulfilled](state, action) {
            state.loading = false
            state.listUser.items.forEach((item, index) => {
                if(item.id == action.payload.user.id) {
                    item.isLocked = action.payload.user.isLocked
                }
            })
        },
        [lockUser.rejected](state) {
            state.loading = false
        },

        [fetchUserInfoByAdmin.pending](state) {
            state.loading = true
        },
        [fetchUserInfoByAdmin.fulfilled](state, action) {
            state.userInfo = action.payload.data
            state.loading = false
        },
        [fetchUserInfoByAdmin.rejected](state) {
            state.loading = false
        },
    }
    
})

export const { reducer: UserReducer, actions } = UserSlice;
export const {showUserModal, setUserKeyword} = actions;
export default UserSlice;