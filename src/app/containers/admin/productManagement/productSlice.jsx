import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../../api/productApi";

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async( {data,adminToken}, {rejectWithValue} ) => {
        try {
            const newProduct = await ProductApi.addProduct({data, adminToken});
            return newProduct;
        }
        catch (err) {
            return rejectWithValue(err.response)
        }
    }
)

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async( data ) => {
        const res = await ProductApi.updateProduct(data);
        return res;
    }
)

export const getAllProductsByAdmin = createAsyncThunk(
    "product/getAllProductsByAdmin",
    async(data) => {
        const allProduct = await ProductApi.getAllProductsByAdmin(data);
        return allProduct;
    }
)
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async(data) => {
        const allProduct = await ProductApi.getAllProducts(data);
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
    async(data) => {
        const res = await ProductApi.getProductDetail(data);
        return res.data;
    }
)

export const fetchProductDetailByAdmin = createAsyncThunk(
    "product/fetchProductDetailByAdmin",
    async(data) => {
        const res = await ProductApi.getProductDetailByAdmin(data);
        return res.data;
    }
)

export const getByOptionAnother = createAsyncThunk(
    "product/getByOptionAnother",
    async(optionValues) => {
        const res = await ProductApi.getOption({optionValues});
        console.log(res.data)
        return res.data;
    }
)

export const addReview = createAsyncThunk(
    "product/addReview",
    async(data) => {
        const res = await ProductApi.addReview(data);
        return res.data;
    }
)
const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        loading: null,
        listProducts: null,
        isShow: false,
        isUpdate: null,
        newProduct: null,
        productDetail: null,
        variantId: null,
        keyword: ""
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
        setLoading: (state) => {
            state.loading = true
        },

        setKeyword: (state, action) => {
            state.keyword = action.payload
        }
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
            state.variantId = null
            state.loading = false
        },
        [fetchProductDetail.rejected](state) {
            state.loading = false
        },

        [fetchProductDetailByAdmin.pending](state) {
            state.loading = true
        },
        [fetchProductDetailByAdmin.fulfilled](state, action) {
            state.productDetail = action.payload.data
            state.loading = false
        },
        [fetchProductDetailByAdmin.rejected](state) {
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

        [addReview.pending](state) {
            state.loading = true
        },
        [addReview.fulfilled](state, action) {
            state.productDetail.reviews = [action.payload.data, ...state.productDetail.reviews]
            state.loading = false
        },
        [addReview.rejected](state) {
            state.loading = false
        },

        [addProduct.pending](state) {
            state.loading = true
        },
        [addProduct.fulfilled](state, action) {
            state.listProducts.items.push(action.payload.data.data)
            state.loading = false
            state.isShow = false
        },
        [addProduct.rejected](state) {
            state.loading = false
        },

        [updateProduct.pending](state) {
            state.loading = true
        },
        [updateProduct.fulfilled](state, action) {
            state.loading = false
            state.isShow = false
        },
        [updateProduct.rejected](state) {
            state.loading = false
        },

        [deleteProduct.pending](state) {
            state.loading = true
        },
        [deleteProduct.fulfilled](state, action) {
            state.loading = false
            state.listProducts.items = state.listProducts.items.filter((item, index) => item.id !== action.payload.id)
        },
        [deleteProduct.rejected](state) {
            state.loading = false
        },

        [getByOptionAnother.pending](state) {
            state.loading = true
        },
        [getByOptionAnother.fulfilled](state, action) {
            state.loading = false
            console.log(action.payload)
            if(action.payload.data[0].optionId != 0) {
                state.productDetail.options.map(option => {
                    action.payload.data.map(item => {
                        if(option.id == item.optionId) {
                            option.values = item.values
                        }
                    })
                })
            }
            else {
                console.log(action.payload.data[0])
                state.productDetail.price = action.payload.data[0].price
                state.productDetail.priceMax = action.payload.data[0].price
                state.variantId = action.payload.data[0].variantId
            }
        },
        [getByOptionAnother.rejected](state) {
            state.loading = false
        }
    }
})

export const { reducer: ProductReducer, actions } = ProductSlice;
export const {showProductModal, hideProductModal, setLoading, setKeyword} = actions;
export default ProductReducer;