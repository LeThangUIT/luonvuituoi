import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartApi from "../../../api/cartApi";

export const addToCart = createAsyncThunk("product/addToCart", async (data) => {
  const res = await CartApi.addToCart(data);
  return res;
});

export const getCart = createAsyncThunk(
  "product/getCart",
  async (userToken) => {
    const res = await CartApi.getCart(userToken);
    return res.data;
  }
);

export const getCartFromLocal = createAsyncThunk(
  "product/getCartFromLocal",
  async (data) => {
    const res = await CartApi.getCartFromLocal(data);
    return res.data;
  }
);

export const deleteCart = createAsyncThunk(
  "product/deleteCart",
  async (data) => {
    const res = await CartApi.deleteCart(data);
    return data;
  }
);

export const changeQuantity = createAsyncThunk(
  "product/changeQuantity",
  async (data) => {
    const res = await CartApi.changeQuantity(data);
    return data.data;
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: null,
    cart: [],
    isCheckAll: false
  },
  reducers: {
    changeNumber: (state, action) => {
      state.cart.forEach((item) => {
        if (
          item.variantId == action.payload.variantId &&
          item.productId == action.payload.productId
        ) {
          item.quantity = action.payload.quantity;
        }
      });
    },

    setSelectAll: (state, action) => {
      state.isCheckAll = action.payload
    },
    setSelectedCart: (state, action) => {
      state.cart = action.payload;
    },
    selectCart: (state, action) => {
      let item = action.payload
      state.cart.forEach(element => {
        if(element.productId == item.productId && element.variantId == item.variantId ) {
           element.checked = true
        }
      });
      if(state.cart.every(item => item.checked == true)) {
        state.isCheckAll = true
      }
    },
    unSelectCart: (state, action) => {
      let item = action.payload
      state.cart.forEach(element => {
        if(element.productId == item.productId && element.variantId == item.variantId ) {
          delete element.checked
        }
      });
    },

    removeSelectedItem: (state, action) => {
      state.cart = state.cart.filter(item => item.checked != true)
      state.isCheckAll = false
    }

    // deleteCartLocal: (state, action) => {
    //     state.cart = state.cart.filter(item => item.variantId !== action.payload.variantId && item.productId !== action.payload.productId)
    // },

    // addCartLocal: (state, action) => {
    //     state.cart.push(action.payload)
    // }
  },
  extraReducers: {
    [addToCart.pending](state) {
      state.loading = true;
    },
    [addToCart.fulfilled](state, action) {
      state.loading = false;
      state.cart.push(action.payload.data.data);
      state.isCheckAll = false
    },
    [addToCart.rejected](state) {
      state.loading = false;
    },

    [getCart.pending](state) {
      state.loading = true;
    },
    [getCart.fulfilled](state, action) {
      state.loading = false;
      state.cart = action.payload.data;
    },
    [getCart.rejected](state) {
      state.loading = false;
    },

    // [getCartFromLocal.pending](state) {
    //   state.loading = true;
    // },
    // [getCartFromLocal.fulfilled](state, action) {
    //   state.loading = false;
    //   state.cart = action.payload.data;
    // },
    // [getCartFromLocal.rejected](state) {
    //   state.loading = false;
    // },

    [deleteCart.pending](state) {
      state.loading = true;
    },
    [deleteCart.fulfilled](state, action) {
      state.loading = false;
      state.cart = state.cart.filter((item, index) => {
        if (item.variantId == null && action.payload.variantId == null) {
          console.log("first")
          return item.productId !== action.payload.productId;
        } else {

          return (
            item.variantId !== action.payload.variantId ||
            item.productId !== action.payload.productId
          );
        }
      });
    },
    [deleteCart.rejected](state) {
      state.loading = false;
    },

    [changeQuantity.pending](state, action) {},
    [changeQuantity.fulfilled](state, action) {},
    [changeQuantity.rejected](state) {},
  },
});

export const { reducer: CartReducer, actions } = CartSlice;
export const { changeNumber, deleteCartLocal, addCartLocal,setSelectAll, setSelectedCart, unSelectCart, selectCart, removeSelectedItem} =
  actions;
export default CartReducer;
