import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        listOrder: [],
        isShow: false
    },

    reducers: {
        showOrderModal: (state, action) => {
            state.isShow = true;
          },
    }
})

export const { reducer: OrderReducer, actions } = OrderSlice;
export const {showOrderModal} = actions;
export default OrderSlice;