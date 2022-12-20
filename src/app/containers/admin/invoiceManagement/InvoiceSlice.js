import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceApi from "../../../api/invoiceApi";

export const getAllInvoiceByAdmin = createAsyncThunk(
    "invoice/getAllInvoiceByAdmin",
    async(data) => {
        const allInvoice = await InvoiceApi.getAllInvoiceByAdmin(data);
        return allInvoice;

    }
)

export const getAllInvoiceByUser = createAsyncThunk(
    "invoice/getAllInvoiceByUser",
    async(data) => {
        const allInvoice = await InvoiceApi.getAllInvoiceByUser(data);
        return allInvoice;

    }
)

export const updateInvoice = createAsyncThunk(
    "invoice/updateInvoice",
    async({invoice, adminToken}) => {
        const res = await InvoiceApi.updateInvoice({id: invoice.id,status: invoice.status, adminToken});
        const data = {invoice, res}
        return data;
    }
)

export const fetchInvoiceDetailByAdmin = createAsyncThunk(
    "invoice/fetchInvoiceDetailByAdmin",
    async(data) => {
        const res = await InvoiceApi.getInvoiceDetailByAdmin(data);
        return res.data;
    }
)

export const fetchInvoiceDetailByUser = createAsyncThunk(
    "invoice/fetchInvoiceDetailByUser",
    async(data) => {
        const res = await InvoiceApi.getInvoiceDetailByUser(data);
        return res.data;
    }
)

const InvoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        loading: false,
        listInvoice: null,
        isShow: false,
        invoice: null,
        invoiceDetail: null,
    },

    reducers: {
        showInvoiceModal: (state, action) => {
            state.isShow = true;
            state.invoice = action.payload.data;
        },
        hideInvoiceModal: (state, action) => {
            state.isShow = false;
        },

        setInvoice: (state, action) => {
            state.invoice = action.payload.data;
        },
    },

    extraReducers: {
        [getAllInvoiceByAdmin.pending](state) {
            state.loading = true
        },
        [getAllInvoiceByAdmin.fulfilled](state, action) {
            state.listInvoice = action.payload.data.data
            state.loading = false
        },
        [getAllInvoiceByAdmin.rejected](state) {
            state.loading = false
        },

        [getAllInvoiceByUser.pending](state) {
            state.loading = true
        },
        [getAllInvoiceByUser.fulfilled](state, action) {
            state.listInvoice = action.payload.data.data
            state.loading = false
        },
        [getAllInvoiceByUser.rejected](state) {
            state.loading = false
        },

        [updateInvoice.pending](state) {
            state.loading = true
        },
        [updateInvoice.fulfilled](state, action) {
            state.loading = false
            state.listInvoice.items.forEach((item, index) => {
                if(item.id == action.payload.invoice.id) {
                    item.status = parseInt(action.payload.invoice.status) 
                }
            })
        },
        [updateInvoice.rejected](state) {
            state.loading = false
        },

        [fetchInvoiceDetailByAdmin.pending](state) {
            state.loading = true
        },
        [fetchInvoiceDetailByAdmin.fulfilled](state, action) {
            state.invoiceDetail = action.payload.data
            state.loading = false
        },
        [fetchInvoiceDetailByAdmin.rejected](state) {
            state.loading = false
        },

        [fetchInvoiceDetailByUser.pending](state) {
            state.loading = true
        },
        [fetchInvoiceDetailByUser.fulfilled](state, action) {
            state.invoiceDetail = action.payload.data
            state.loading = false
        },
        [fetchInvoiceDetailByUser.rejected](state) {
            state.loading = false
        },
    }
})

export const { reducer: InvoiceReducer, actions } = InvoiceSlice;
export const {showInvoiceModal, hideInvoiceModal, setInvoice} = actions;
export default InvoiceSlice;