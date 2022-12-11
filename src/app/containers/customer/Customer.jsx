import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { Footer } from '../../sharedComponents/footer';
import { Header } from '../../sharedComponents/header';
import { getAllCategories } from '../admin/categoryManagement/categorySlice';
import { fetchUserInfo } from './Auth/authSlice';
import { getCart } from './CartPage/CartSlice';

function Customer() {
  const userToken = localStorage.getItem("userToken");
  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(getAllCategories())
      if(userToken) {
        dispatch(fetchUserInfo(userToken))
        dispatch(getCart(userToken))
      }
  }, [])
  return (
    <>
        <Header id="header"></Header>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Customer