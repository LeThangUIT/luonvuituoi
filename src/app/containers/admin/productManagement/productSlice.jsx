import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../../api/productApi";

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async( {data,adminToken} ) => {
        const newProduct = await ProductApi.addProduct({data, adminToken});
        return newProduct;
    }
)
export const getAllProductsByAdmin = createAsyncThunk(
    "product/getAllProductsByAdmin",
    async(adminToken) => {
        const allProduct = await ProductApi.getAllProductsByAdmin(adminToken);
        return allProduct;
    }
)
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async() => {
        const allProduct = await ProductApi.getAllProducts();
        return allProduct;

    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async({id, adminToken}) => {
        const res = await ProductApi.deleteProduct({id, adminToken});
        const data = {id, res}
        return data;
    }
)

export const fetchProductDetail = createAsyncThunk(
    "product/fetchProductDetail",
    async(id) => {
        const res = await ProductApi.getProductDetail(id);
        return res.data;
    }
)

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        loading: null,
        listProducts: [],
        isShow: false,
        isUpdate: null,
        newProduct: null,
        productDetail: null
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
        [getAllProductsByAdmin.pending](state) {
            state.loading = true
        },
        [getAllProductsByAdmin.fulfilled](state, action) {
            state.listProducts = action.payload.data.data
            state.loading = false
        },
        [getAllProductsByAdmin.rejected](state) {
            state.loading = false
        },

        [fetchProductDetail.pending](state) {
            state.loading = true
        },
        [fetchProductDetail.fulfilled](state, action) {
            state.productDetail = action.payload.data
            state.loading = false
        },
        [fetchProductDetail.rejected](state) {
            state.loading = false
        },


        [getAllProducts.pending](state) {
            state.loading = true
        },
        [getAllProducts.fulfilled](state, action) {
            state.listProducts = action.payload.data.data
            state.loading = false
        },
        [getAllProducts.rejected](state) {
            state.loading = false
        },

        [addProduct.pending](state) {
            state.loading = true
        },
        [addProduct.fulfilled](state, action) {
            state.listProducts.push(action.payload.data.data)
            state.loading = false
            state.isShow = false
        },
        [addProduct.rejected](state) {
            state.loading = false
        },

        [deleteProduct.pending](state) {
            state.loading = true
        },
        [deleteProduct.fulfilled](state, action) {
            state.loading = false
            state.listProducts = state.listProducts.filter((item, index) => item.id !== action.payload.id)
        },
        [deleteProduct.rejected](state) {
            state.loading = false
        }
    }
})

export const { reducer: ProductReducer, actions } = ProductSlice;
export const {showProductModal, hideProductModal} = actions;
export default ProductReducer;