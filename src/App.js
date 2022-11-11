import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import "./App.css";
import HomeIndex from "./app/containers/customer/HomePage/HomeIndex";
import LoginIndex from "./app/containers/customer/LoginPage/LoginIndex";
import RegisterIndex from "./app/containers/customer/RegisterPage/RegisterIndex";
import DetailIndex from "./app/containers/customer/DetailPage/DetailIndex";
import CartIndex from "./app/containers/customer/CartPage/CartIndex";
import CheckoutIndex from "./app/containers/customer/CheckoutPage/CheckoutIndex";
import Admin from "./app/containers/admin/Admin";
import ProductManagementIndex from "./app/containers/admin/productManagement/ProductManagementIndex";
import OrderManagementIndex from "./app/containers/admin/orderManagement/OrderManagementIndex";
import DashBoardIndex from "./app/containers/admin/dashBoard/DashBoardIndex";
import CategoryManagementIndex from "./app/containers/admin/categoryManagement/CategoryManagementIndex";
import ProtectedRoute from "./app/sharedComponents/protectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductIndex from "./app/containers/customer/ProductPage/ProductIndex";
import CallbackApi from "./app/containers/CallbackApi";
const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;
function App() {
  return (
    <AppContainer>
      <ToastContainer />
      <Routes>
        <Route path="/login/*" element={<LoginIndex />} />
        <Route path="/adminLogin/*" element={<LoginIndex />} />
        <Route path="/register" element={<RegisterIndex />} />
        <Route path="/" element={<HomeIndex />} />
        <Route path="/product/*" element={<ProductIndex />} />
        <Route path="/detail/:productId" element={<DetailIndex />} />
        <Route path="/cart" element={<CartIndex />} />
        <Route path="/checkout" element={<CheckoutIndex />} />
        <Route path="/callback/:social" element={<CallbackApi />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashBoardIndex />} />
          <Route path="category" element={<CategoryManagementIndex />} />
          <Route path="product" element={<ProductManagementIndex />} />
          <Route path="order" element={<OrderManagementIndex />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
