import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VoucherApi from "../../../api/voucherApi";

export const addVoucher = createAsyncThunk(
    "voucher/addVoucher",
    async({data, adminToken}) => {
        const newVoucher = await VoucherApi.addVoucher({data, adminToken});
        return newVoucher;
    }
)

export const getAllVouchersByAdmin = createAsyncThunk(
    "voucher/getAllVouchersByAdmin",
    async(data) => {
        const allVoucher = await VoucherApi.getAllVouchersByAdmin(data);
        return allVoucher;
    }
)
export const getAllVouchers = createAsyncThunk(
    "voucher/getAllVouchers",
    async() => {
        const allVoucher = await VoucherApi.getAllVouchers();
        return allVoucher;
    }
)
export const deleteVoucher = createAsyncThunk(
    "voucher/deleteVoucher",
    async( {id, adminToken}) => {
        const res = await VoucherApi.deleteVoucher({id, adminToken});
        const data = {id, res}
        return data;
    }
)

export const updateVoucher = createAsyncThunk(
    "voucher/updateVoucher",
    async( payload) => {
        const res = await VoucherApi.updateVoucher(payload);
        const data = {id: payload.id, voucher: payload.data, res}
        return data;
    }
)

const VoucherSlice = createSlice({
    name: "voucher",
    initialState: {
        loading: false,
        listVoucher: [],
        isShow: false,
        isUpdate: null,
        newVoucher: null,
    },

    reducers: {
        showVoucherModal: (state, action) => {
            state.isShow = true;
            state.isUpdate = action.payload.isUpdate;
            state.newVoucher = action.payload.data;
          },
        hideVoucherModal: (state, action) => {
            state.isShow = false;
          },
    },
    extraReducers: {
        [addVoucher.pending](state) {
            state.loading = true
        },
        [addVoucher.fulfilled](state, action) {
            state.listVoucher.push(action.payload.data.data)
            state.loading = false
            state.isShow = false
        },
        [addVoucher.rejected](state) {
            state.loading = false
        },

        [getAllVouchersByAdmin.pending](state) {
            state.loading = true
        },
        [getAllVouchersByAdmin.fulfilled](state, action) {
            state.listVoucher = action.payload.data.data
            state.loading = false
        },
        [getAllVouchersByAdmin.rejected](state) {
            state.loading = false
        },

        [getAllVouchers.pending](state) {
            state.loading = true
        },
        [getAllVouchers.fulfilled](state, action) {
            state.listVoucher = action.payload.data.data
            state.loading = false
        },
        [getAllVouchers.rejected](state) {
            state.loading = false
        },

        [deleteVoucher.pending](state) {
            state.loading = true
        },
        [deleteVoucher.fulfilled](state, action) {
            state.loading = false
            state.listVoucher = state.listVoucher.filter((item, index) => item.id !== action.payload.id)
        },
        [deleteVoucher.rejected](state) {
            state.loading = false
        },

        [updateVoucher.pending](state) {
            state.loading = true
        },
        [updateVoucher.fulfilled](state, action) {
            state.loading = false
            state.listVoucher.map((item, index) => {
                console.log(item)
                console.log(action.payload)
                if(item.id == action.payload.id) {
                    state.listVoucher[index] = {id: action.payload.id, ...action.payload.voucher}
                }
            })
        },
        [updateVoucher.rejected](state) {
            state.loading = false
        },
    }
})

export const { reducer: VoucherReducer, actions } = VoucherSlice;
export const {showVoucherModal, hideVoucherModal} = actions;
export default VoucherSlice;