import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceApi from "../../../api/invoiceApi";

export const getAllInvoiceByAdmin = createAsyncThunk(
    "invoice/getAllInvoiceByAdmin",
    async(data) => {
        const allInvoice = await InvoiceApi.getAllInvoiceByAdmin(data);
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
const InvoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        loading: false,
        listInvoice: null,
        isShow: false,
        newInvoice: null

    },

    reducers: {
        showInvoiceModal: (state, action) => {
            state.isShow = true;
            state.newInvoice = action.payload.data;
        },
        hideInvoiceModal: (state, action) => {
            state.isShow = false;
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
    }
})

export const { reducer: InvoiceReducer, actions } = InvoiceSlice;
export const {showInvoiceModal, hideInvoiceModal} = actions;
export default InvoiceSlice;