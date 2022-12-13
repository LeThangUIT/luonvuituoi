import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./containers/admin/categoryManagement/categorySlice";
import { InvoiceReducer } from "./containers/admin/invoiceManagement/InvoiceSlice";
import ProductReducer from "./containers/admin/productManagement/productSlice";
import { UserReducer } from "./containers/admin/userManagement/UserSlice";
import { VoucherReducer } from "./containers/admin/voucherManagement/VoucherSlice";
import AuthReducer from "./containers/customer/Auth/authSlice";
import CartReducer from "./containers/customer/CartPage/CartSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    category: CategoryReducer,
    product: ProductReducer,
    cart: CartReducer,
    invoice: InvoiceReducer,
    voucher: VoucherReducer,
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
