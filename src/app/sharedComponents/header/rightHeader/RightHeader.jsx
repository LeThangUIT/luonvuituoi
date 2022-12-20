import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { UilBell } from '@iconscout/react-unicons'
import { PinkButton } from "../../button";
import { Heading14, Text14 } from "../../text";
import avatar from "../../../assets/images/avatar.png"
import {
  UilUser,
  UilShoppingCart,
  UilStore,
  UilSignInAlt,
} from "@iconscout/react-unicons";
import { logout } from "../../../containers/customer/Auth/authSlice";
import CartMini from "../../../containers/customer/CheckoutPage/components/CartMini";
import { showNotification } from "../../../containers/admin/notification/notificationSlice";
import Notification from "../../../containers/admin/notification/Notification";
const RightContainer = styled.div`
  ${tw`
        flex justify-between items-center gap-x-6 z-50
    `}
`;
const ShoppingCartIcon = styled(UilShoppingCart)`
  ${tw`
       cursor-pointer hover:opacity-80 text-primaryColor 
    `}
`;
const NotificationIcon = styled(UilBell)`
  ${tw`
       cursor-pointer hover:opacity-80 text-primaryColor 
    `}
`;
export const Avatar = styled.img`
  ${tw`align-middle w-10 h-10 rounded-full hover:cursor-pointer z-50`}
`;
export const SubNav = styled.div`
  ${tw`
         bg-white absolute top-[100%]right-0  py-2 rounded z-50 min-w-[200px]
    `}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export const SubMenuItem = styled.div`
  ${tw`
        flex flex-row items-center  hover:bg-[#F8F8F8] py-3 px-3 hover:cursor-pointer gap-2
    `}
`;
const CartContainer = styled.div`
  ${tw`
         bg-white absolute top-[100%]right-0  p-4 rounded z-50 min-w-[350px] flex flex-col gap-y-6
    `}
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const RelativeDiv = styled.div`
  ${tw` relative`}
`;

export const Quantity = styled.div`
  ${tw`absolute top-[-2px] right-[-2px] p-[3px] bg-[#E41E3F] rounded-full flex justify-center`}
`;
export const QuantityText = styled.div`
  ${tw` not-italic font-semibold text-[10px] leading-[13px] text-[#ffffff] min-w-[13px] flex justify-center`}
`;
export function RightHeader() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const {isShow, notifications} = useSelector(state => state.notification)
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
    setShow(true);
  };
  const hideSubMenu = () => {
    setShow(false);
  };

  const [showCart, setShowCart] = useState(false);
  const showCartModal = () => {
    setShowCart(true);
  };
  const hideCartModal = () => {
    setShowCart(false);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <RightContainer>
      {userInfo ? (
        <>
          <RelativeDiv onMouseOver={showSubMenu} onMouseLeave={hideSubMenu}>
            <Avatar src={userInfo.avatar || avatar}></Avatar>
            {show && (
              <SubNav>
                <SubMenuItem onClick={() => navigate("/profile")}>
                  <UilUser size={17}></UilUser>
                  <Heading14>Thông tin cá nhân</Heading14>
                </SubMenuItem>
                <SubMenuItem onClick={() => navigate("/profile/invoices")}>
                  <UilStore size={17}></UilStore>
                  <Heading14>Danh sách đơn hàng</Heading14>
                </SubMenuItem>
                <SubMenuItem onClick={handleLogout}>
                  <UilSignInAlt size={17}></UilSignInAlt>
                  <Heading14>Đăng xuất</Heading14>
                </SubMenuItem>
              </SubNav>
            )}
          </RelativeDiv>
          <RelativeDiv>
            <NotificationIcon size={36} onClick={() => dispatch(showNotification())}></NotificationIcon>
            {isShow && <Notification></Notification>}
            {notifications.notReadCount != 0 && 
              <Quantity>
                <QuantityText>{notifications.notReadCount}</QuantityText>
              </Quantity>
        }
          </RelativeDiv>
        </>
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
      <RelativeDiv onMouseOver={showCartModal} onMouseLeave={hideCartModal}>
        <ShoppingCartIcon
          size={36}
          onClick={() => {
            navigate("/cart");
          }}
        >
        </ShoppingCartIcon>
        {cart.length != 0 && 
          <Quantity>
            <QuantityText>{cart.length}</QuantityText>
          </Quantity>
        }
        {showCart && (
          <CartContainer>
            {cart.length == 0 ? (
              <Text14>Chưa có sản phẩm nào, mua hàng đi bạn ơi!</Text14>
            ) : (
              <CartMini cart={cart}></CartMini>
            )}
          </CartContainer>
        )}
      </RelativeDiv>
    </RightContainer>
  );
}
