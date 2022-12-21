import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { Footer } from '../../sharedComponents/footer';
import { Header } from '../../sharedComponents/header';
import { getAllCategories } from '../admin/categoryManagement/categorySlice';
import { getAllNotificationsByCustomer, setNotifications } from '../admin/notification/notificationSlice';
import { getAllVouchers } from '../admin/voucherManagement/VoucherSlice';
import { fetchUserInfo } from './Auth/authSlice';
import { getCart } from './CartPage/CartSlice';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";


function Customer() {
  const userToken = localStorage.getItem("userToken");
  const {userInfo} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const connectSocket = async () => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("http://hkthanh-001-site1.htempurl.com/notification")
          .configureLogging(LogLevel.Information)
          .build();
        connection.on("UserReceiveNotification", (user, notification) => {
          console.log(typeof notification.createdAt, notification)
          dispatch(setNotifications(notification))
        });
        await connection.start();
        console.log(userInfo)
        await connection.invoke("JoinSystem", userInfo.id);
      } catch (e) {
        console.log(e);
      }
  }
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllVouchers())
    if(userToken) {
      dispatch(fetchUserInfo(userToken))
      dispatch(getCart(userToken))
      dispatch(getAllNotificationsByCustomer({userToken, paging: 1, perPage:10}))
    }
  }, [])
  useEffect(() => {
    if(userInfo) {
      connectSocket();
    }
  }, [userInfo])
  
  return (
    <>
        <Header id="header"></Header>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Customer