import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        loading: null,
        listProducts: [],
        isShow: false,
        isUpdate: null,
        newProduct: null
    },
    reducers:{
        showProductModal: (state, action) => {
            state.isShow = true;
            state.isUpdate = action.payload.isUpdate;
            state.newProduct = action.payload.data;
          },
        hideProductModal: (state, action) => {
            state.isShow = false;
          },
    },
    extraReducers: {
    }
})

export const { reducer: ProductReducer, actions } = ProductSlice;
export const {showProductModal, hideProductModal} = actions;
export default ProductReducer;