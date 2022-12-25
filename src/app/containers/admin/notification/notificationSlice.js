import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import NotificationApi from "../../../api/notificationApi";

export const getAllNotificationsByAdmin = createAsyncThunk(
    "notification/getAllNotificationByAdmin",
    async(data) => {
        const res = await NotificationApi.getAllNotificationsByAdmin(data);
        return res;

    }
)

export const getAllNotificationsByCustomer = createAsyncThunk(
    "notification/getAllNotificationsByCustomer",
    async(data) => {
        const res = await NotificationApi.getAllNotificationsByCustomer(data);
        return res;
    }
)
export const markAsReadByAdmin = createAsyncThunk(
    "notification/markAsReadByAdmin",
    async(data) => {
        const res = await NotificationApi.markAsReadByAdmin(data);
        return data.id;
    }
)
export const markAsReadByUser = createAsyncThunk(
    "notification/markAsReadByUser",
    async(data) => {
        const res = await NotificationApi.markAsReadByUser(data);
        return data.id;
    }
)

export const markAsReadAllByAdmin = createAsyncThunk(
    "notification/markAsReadAllByAdmin",
    async(adminToken) => {
        const res = await NotificationApi.markAsReadAllByAdmin(adminToken);
        return res;
    }
)
export const markAsReadAllByUser = createAsyncThunk(
    "notification/markAsReadAllByUser",
    async(userToken) => {
        const res = await NotificationApi.markAsReadAllByUser(userToken);
        return res;
    }
)
const NotificationSlice = createSlice({
    name: 'notification',
    initialState: {
        loading: null,
        notifications: {items: []},
        isShow: false,
    },
    reducers:{
        showNotification: (state, action) => {
            state.isShow = true;
          },
        hideNotification: (state, action) => {
            state.isShow = false;
          },
        setNotifications: (state, action) => {
            state.notifications.items = [action.payload, ...state.notifications.items]
            state.notifications.notReadCount += 1
            var title = document.title;
            var newTitle = '(' + state.notifications.notReadCount + ') ' + "Lzava";
	        document.title = newTitle;
        }
    },
    extraReducers: {
        [getAllNotificationsByAdmin.pending](state) {
            state.loading = true
        },
        [getAllNotificationsByAdmin.fulfilled](state, action) {
            let newData = action.payload.data.data
            state.notifications.notReadCount = newData.notReadCount
            state.notifications.page = newData.page
            state.notifications.perPage = newData.perPage
            state.notifications.totalPage = newData.totalPage
            state.notifications.totalCount = newData.totalCount
            state.notifications.items = [...state.notifications.items, ...newData.items]
            state.loading = false
        },
        [getAllNotificationsByAdmin.rejected](state) {
            state.loading = false
        },
        [getAllNotificationsByCustomer.pending](state) {
            state.loading = true
        },
        [getAllNotificationsByCustomer.fulfilled](state, action) {
            let newData = action.payload.data.data
            state.notifications.notReadCount = newData.notReadCount
            state.notifications.page = newData.page
            state.notifications.perPage = newData.perPage
            state.notifications.totalPage = newData.totalPage
            state.notifications.totalCount = newData.totalCount
            state.notifications.items = [...state.notifications.items, ...newData.items]
            state.loading = false
            state.loading = false
        },
        [getAllNotificationsByCustomer.rejected](state) {
            state.loading = false
        },

        [markAsReadByUser.pending](state) {
            state.loading = true
        },
        [markAsReadByUser.fulfilled](state, action) {
            state.notifications.items.forEach(item => {
                if(item.id == action.payload) {
                    item.readAt = true
                }
            });
            state.notifications.notReadCount -= 1
            state.loading = false
        },
        [markAsReadByUser.rejected](state) {
            state.loading = false
        },

        [markAsReadByAdmin.pending](state) {
            state.loading = true
        },
        [markAsReadByAdmin.fulfilled](state, action) {
            state.notifications.items.forEach(item => {
                if(item.id == action.payload) {
                    item.readAt = true
                }
            });
            state.notifications.notReadCount -= 1
            state.loading = false
        },
        [markAsReadByAdmin.rejected](state) {
            state.loading = false
        },

        [markAsReadAllByAdmin.pending](state) {
            state.loading = true
        },
        [markAsReadAllByAdmin.fulfilled](state, action) {
            state.notifications.items.forEach(item => {
                    item.readAt = true
                });
            state.notifications.notReadCount = 0
            state.loading = false
        },
        [markAsReadAllByAdmin.rejected](state) {
            state.loading = false
        },
        [markAsReadAllByUser.pending](state) {
            state.loading = true
        },
        [markAsReadAllByUser.fulfilled](state, action) {
            state.notifications.items.forEach(item => {
                    item.readAt = true
                });
            state.notifications.notReadCount = 0
            state.loading = false
        },
        [markAsReadAllByUser.rejected](state) {
            state.loading = false
        },
    }

})

export const { reducer: NotificationReducer, actions } = NotificationSlice;
export const {showNotification, hideNotification, setNotifications} = actions;
export default NotificationReducer;

