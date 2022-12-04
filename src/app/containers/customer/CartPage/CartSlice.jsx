import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartApi from "../../../api/cartApi";


export const addToCart = createAsyncThunk(
    "product/addToCart",
    async( data ) => {
        const {userToken, ...newCart} = data
        const {imageMain, price, name, ...rest} = data
        const res = await CartApi.addToCart(rest);
        return {newCart, res};
    }
)

export const getCart = createAsyncThunk(
    "product/getCart",
    async( userToken ) => {
        const res = await CartApi.getCart(userToken);
        return res.data;
    }
)

export const getCartFromLocal = createAsyncThunk(
    "product/getCartFromLocal",
    async( data ) => {
        const res = await CartApi.getCartFromLocal(data);
        return res.data;
    }
)

export const deleteCart = createAsyncThunk(
    "product/deleteCart",
    async( data ) => {
        const res = await CartApi.deleteCart(data);
        return data;
    }
)

export const changeQuantity = createAsyncThunk(
    "product/changeQuantity",
    async( data ) => {
        const res = await CartApi.changeQuantity(data);
        return data;
    }
)

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: null,
        cart: [],
    },
    reducers:{
        changeNumber: (state, action) => {
            state.cart.forEach((item) => {
                if(item.variantId == action.payload.variantId && item.productId == action.payload.productId) {
                    console.log("first")
                    item.quantity = action.payload.quantity
                }
            })
        },

        // deleteCartLocal: (state, action) => {
        //     state.cart = state.cart.filter(item => item.variantId !== action.payload.variantId && item.productId !== action.payload.productId)
        // }, 

        // addCartLocal: (state, action) => {
        //     state.cart.push(action.payload)
        // }
    },
    extraReducers: {
        [addToCart.pending](state) {
            state.loading = true
        },
        [addToCart.fulfilled](state, action) {
            state.loading = false
            state.cart.push(action.payload.newCart)
        },
        [addToCart.rejected](state) {
            state.loading = false
        },

        [getCart.pending](state) {
            state.loading = true
        },
        [getCart.fulfilled](state, action) {
            state.loading = false
            state.cart = action.payload.data
        },
        [getCart.rejected](state) {
            state.loading = false
        },

        [getCartFromLocal.pending](state) {
            state.loading = true
        },
        [getCartFromLocal.fulfilled](state, action) {
            state.loading = false
            state.cart = action.payload.data
        },
        [getCartFromLocal.rejected](state) {
            state.loading = false
        },

        [deleteCart.pending](state) {
            state.loading = true
        },
        [deleteCart.fulfilled](state, action) {
            state.loading = false
            state.cart = state.cart.filter((item, index) => item.variantId !== action.payload.variantId && item.productId !== action.payload.productId)
        },
        [deleteCart.rejected](state) {
            state.loading = false
        },

        [changeQuantity.pending](state, action) {
        },
        [changeQuantity.fulfilled](state, action) {
        },
        [changeQuantity.rejected](state) {
        },
    }
})

export const { reducer: CartReducer, actions } = CartSlice;
export const {changeNumber, deleteCartLocal, addCartLocal} = actions;
export default CartReducer;