import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { PinkButton } from "../../button";
import { Heading14 } from "../../text";
import { UilUser, UilShoppingCart} from '@iconscout/react-unicons'


const RightContainer = styled.div`
  ${tw`
        flex justify-between items-center gap-x-6
    `}
`;
const ShoppingCartIcon = styled(UilShoppingCart)`
  ${tw`
       cursor-pointer hover:opacity-80 text-primaryColor 
    `}
`;
export const Avatar = styled.img`
  ${tw` align-middle w-10 h-10 rounded-full hover:cursor-pointer`}
`;
export const SubNav = styled.div`
  ${tw`
        bg-white min-w-[175px] absolute top-[100%]right-0  py-2 rounded 
    `}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export const SubMenuItem = styled.div`
  ${tw`
        flex flex-row items-center  hover:bg-[#F8F8F8] py-3 px-3 hover:cursor-pointer gap-2
    `}
`;
const RelativeDiv = styled.div`
  ${tw` relative`}
`;
export function RightHeader() {
  const { userInfo } = useSelector((state) => state.auth);
  const [color, setColor] = useState("white");
  const handleMouseEvent = () => {
    setColor("#EE4C7E");
  };
  const handleMouseLeave = () => {
    setColor("white");
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const showSubMenu = () => {
    console.log("first");
    setShow(true);
  };
  const hideSubMenu = () => {
    console.log("second");
    setShow(false);
  };

  return (
    <RightContainer>
      <ShoppingCartIcon size={40} onClick={() => {navigate('/cart')}}></ShoppingCartIcon>
      {userInfo ? (
        <RelativeDiv onMouseOver={showSubMenu} onMouseLeave={hideSubMenu}>
          <Avatar src={userInfo.avatar}></Avatar>
          {show && (
            <SubNav>
              <SubMenuItem>
                <UilUser size={17}></UilUser>
                <Heading14>Thông tin cá nhân</Heading14>
              </SubMenuItem>
              <SubMenuItem>
                <Heading14>Danh sách đơn hàng</Heading14>
              </SubMenuItem>
              <SubMenuItem>
                <Heading14>Đăng xuất</Heading14>
              </SubMenuItem>
            </SubNav>
          )}
        </RelativeDiv>
      ) : (
        <PinkButton
          onMouseOver={handleMouseEvent}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate("/login")}
        >
          <UilUser size={20}></UilUser>
          Đăng nhập
        </PinkButton>
      )}
    </RightContainer>
  );
}
