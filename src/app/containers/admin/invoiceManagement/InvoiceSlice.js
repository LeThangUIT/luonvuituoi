import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceApi from "../../../api/invoiceApi";

export const getAllInvoiceByAdmin = createAsyncThunk(
    "invoice/getAllInvoiceByAdmin",
    async(data) => {
        const allInvoice = await InvoiceApi.getAllInvoiceByAdmin(data);
        return allInvoice;

    }
)
const InvoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        loading: false,
        listInvoice: [],
        isShow: false
    },

    reducers: {
        showInvoiceModal: (state, action) => {
            state.isShow = true;
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
    }
})

export const { reducer: InvoiceReducer, actions } = InvoiceSlice;
export const {showInvoiceModal} = actions;
export default InvoiceSlice;