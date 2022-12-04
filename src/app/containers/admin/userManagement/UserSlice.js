import { createSlice } from "@reduxjs/toolkit";

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
    }
})

export const { reducer: UserReducer, actions } = UserSlice;
export const {showUserModal} = actions;
export default UserSlice;