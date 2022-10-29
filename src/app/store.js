import { configureStore } from '@reduxjs/toolkit'
import BrandReducer from './containers/admin/brandManagement/brandSlice'
import AuthReducer from './containers/customer/Auth/authSlice'


const store = configureStore({
  reducer: {
    auth: AuthReducer,
    brand: BrandReducer,
    
  }
})

export default store