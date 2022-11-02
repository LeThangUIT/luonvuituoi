import { configureStore } from '@reduxjs/toolkit'
import CategoryReducer from './containers/admin/categoryManagement/categorySlice'
import AuthReducer from './containers/customer/Auth/authSlice'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    category: CategoryReducer,
    
  }
})

export default store