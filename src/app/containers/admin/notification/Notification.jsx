import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { Avatar } from "../../../sharedComponents/header/rightHeader/RightHeader";
import { useOnClickOutside } from "../../../sharedComponents/header/searchBox";
import { LightText12, Text14 } from "../../../sharedComponents/text";
import { ScrollContainer } from "../productManagement/pages/ProductManagementPage";
import { getAllNotificationsByAdmin, getAllNotificationsByCustomer, hideNotification, markAsReadAllByAdmin, markAsReadAllByUser, markAsReadByAdmin, markAsReadByUser } from "./notificationSlice";
import avatar from "../../../assets/images/avatar.png"
import logo from "../../../assets/images/Lamborghini-Logo.png"
import { useNavigate } from "react-router-dom";

const Frame = styled.div`
  ${tw`bg-white z-50 flex flex-col gap-1 py-2 px-1 rounded-lg absolute top-[120%] right-0 shadow-lg`}
`;
const Header = styled.div`
  ${tw`
        flex content-between py-3 px-5  
    `}
`;
const Heading = styled.span`
  ${tw` text-black font-bold flex-1`}
`;
const Clear = styled.span`
  ${tw` text-blue-600 hover:cursor-pointer`}
`;
const Item = styled.div`
  ${tw`
        relative hover:cursor-pointer hover:bg-[#F8F8F8] py-3 pl-4 pr-6 w-[360px] rounded-lg grid grid-cols-7 gap-2
    `}
`;
const ContentFrame = styled.div`
  ${tw`col-span-6 flex flex-col items-start gap-2`}
`;
const Mask = styled.div`
  transform: translateY(-50%);
  ${tw` absolute right-2 top-1/2 w-3 h-3 rounded-full bg-[#1876F2]`}
`
const Notification = () => {
  const {adminInfo} = useSelector(state => state.auth)
  const adminToken = localStorage.getItem("adminToken")
  const userToken = localStorage.getItem("userToken")
  const dispatch = useDispatch();
  const clickOutsidehandler = () => {
    dispatch(hideNotification());
  };
  const resultBoxRef = useRef();
  const { notifications } = useSelector((state) => state.notification);
  useOnClickOutside(resultBoxRef, clickOutsidehandler);
  const navigate = useNavigate()
  const handleClick = (item) => {
    if(adminInfo) {
      navigate(`/admin${item.url}`)
      if(!item.readAt) {
        dispatch(markAsReadByAdmin({id: item.id, adminToken}))
      }
    }
    else {
      navigate(`${item.url}`)
      if(!item.readAt) {
        dispatch(markAsReadByUser({id: item.id, userToken}))
      }
    }
  }
  const readAll = () => {
    if(adminInfo) {
      if(notifications.notReadCount != 0) {
        dispatch(markAsReadAllByAdmin(adminToken))
      }
    }
    else {
      if(notifications.notReadCount != 0) {
        dispatch(markAsReadAllByUser(userToken))
      }
    }
  }
   
  let page = 1
  const handleScroll = (e) => {
    var scrollTop = document.getElementById('box').scrollTop;
    var scrollHeight = document.getElementById('box').scrollHeight; 
    var offsetHeight = document.getElementById('box').offsetHeight;
    var contentHeight = scrollHeight - offsetHeight; 
    if (contentHeight <= scrollTop) {
      if(page < notifications.totalPage) {
        if(adminInfo) {
          dispatch(getAllNotificationsByAdmin({adminToken, page: page + 1, perPage:10}))
          page += 1
        }
        else {
          dispatch(getAllNotificationsByCustomer({userToken, page: page + 1, perPage:10}))
          page += 1
        }
      }
    }
  }
  useEffect(() => {
    const myElement = document.getElementById("box");
    myElement.addEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <Frame ref={resultBoxRef} >
      <ScrollContainer id="box">
        <Header>
          <Heading>Notification</Heading>
          <Clear onClick={readAll}>Read All</Clear>
        </Header>
        <div className="h-[400px]">
            {notifications?.items.map((item, index) => (
            <Item onClick={() => handleClick(item)} key={index}>
              {adminInfo ? <Avatar src={item.imageUrl || avatar}/> :  <Avatar src={logo}/>}    
                <ContentFrame>
                <Text14 >{item.content}</Text14>
                <LightText12>{item.createdAt}</LightText12>
                </ContentFrame>
                {!item.readAt && <Mask></Mask>}     
            </Item>
            ))}
        </div>
      </ScrollContainer>
    </Frame>
  );
};

export default Notification;
