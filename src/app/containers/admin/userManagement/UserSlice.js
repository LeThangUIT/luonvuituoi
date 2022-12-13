import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../../api/userApi";

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async(data) => {
        const allUsers = await UserApi.getAllUsers(data);
        return allUsers;

    }
)
const UserSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        listUser: [],
        isShow: false
    },

    reducers: {
        showUserModal: (state, action) => {
            state.isShow = true;
          },
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
    }
    
})

export const { reducer: UserReducer, actions } = UserSlice;
export const {showUserModal} = actions;
export default UserSlice;