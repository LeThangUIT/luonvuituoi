import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar/Sidebar";
import "./Admin.css";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import styled from "styled-components";
import tw from "twin.macro";
import { UilBell, UilComment } from "@iconscout/react-unicons";
import Notification from "./notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotificationsByAdmin,
  hideNotification,
  setNotifications,
  showNotification,
} from "./notification/notificationSlice";
import {
  Quantity,
  QuantityText,
} from "../../sharedComponents/header/rightHeader/RightHeader";
import { admin } from "../customer/Auth/authSlice";

const GroupIcon = styled.div`
  ${tw` absolute top-3 right-10 flex gap-2`}
`;
const Icon = styled.div`
  ${tw` relative p-2 bg-primaryColor text-white hover:cursor-pointer rounded-full opacity-80 hover:opacity-100`}
`;

function Admin() {
  const { isShow } = useSelector((state) => state.notification);
  const { adminInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const adminToken = localStorage.getItem("adminToken");
  const showNoti = () => {
    if (isShow) {
      dispatch(hideNotification());
    } else {
      dispatch(showNotification());
    }
  };
  const connectSocket = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://hkthanh-001-site1.htempurl.com/notification")
        .configureLogging(LogLevel.Information)
        .build();
      connection.on("AdminReceiveNotification", (user, notification) => {
        console.log(typeof notification.createdAt, notification);
        dispatch(setNotifications(notification));
      });
      await connection.start();
      await connection.invoke(
        "JoinSystem",
        adminInfo.id
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if(adminInfo) {
      connectSocket();
    }
  }, [adminInfo])
  useEffect(() => {
    if(adminToken) {
      dispatch(admin(adminToken))
      dispatch(
        getAllNotificationsByAdmin({ adminToken, paging: 1, perPage: 10 })
      );
    }
  }, [])

  const { notifications } = useSelector((state) => state.notification);
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <Outlet />
        <GroupIcon>
          <Icon title="Message">
            <UilComment></UilComment>
          </Icon>
          <Icon onClick={showNoti} title="Notification">
            <UilBell></UilBell>
            {notifications.notReadCount > 0 && (
              <Quantity>
                <QuantityText>{notifications.notReadCount}</QuantityText>
              </Quantity>
            )}
          </Icon>
          {isShow && <Notification></Notification>}
        </GroupIcon>
        {/* <RightSide /> */}
      </div>
    </div>
  );
}

export default Admin;
