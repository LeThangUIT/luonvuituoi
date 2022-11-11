import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from './containers/admin/categoryManagement/categorySlice'
import ProductReducer from './containers/admin/productManagement/productSlice'
import AuthReducer from './containers/customer/Auth/authSlice'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    category: CategoryReducer,
    product: ProductReducer,
    
  }
})

export default store