import { createSlice } from "@reduxjs/toolkit";

const VoucherSlice = createSlice({
    name: "voucher",
    initialState: {
        loading: false,
        listVoucher: [],
        isShow: false
    },

    reducers: {
        showVoucherModal: (state, action) => {
            state.isShow = true;
          },
    }
})

export const { reducer: VoucherReducer, actions } = VoucherSlice;
export const {showVoucherModal} = actions;
export default VoucherSlice;