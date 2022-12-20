import styled from "styled-components";
import tw from "twin.macro";
import avatar from "../../../../assets/images/avatar.png"
import { Avatar } from "../../../../sharedComponents/header/rightHeader/RightHeader";
import { Heading22, Text14 } from "../../../../sharedComponents/text";
import {
  ContentContainer,
  HeadingTitle,
} from "../../HomePage/components/content";
import { UilUser, UilStore, UilGift, UilSignInAlt } from "@iconscout/react-unicons";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Body } from "../../../../sharedComponents/body";

  const GridBox = styled.div`
    ${tw`
        grid grid-cols-11 gap-10 
    `}
  `;
  const LeftContainer = styled.div`
    ${tw`col-span-3 flex flex-col gap-y-4 bg-white rounded p-4 h-fit-content`}
  `;
    const RightContainer = styled.div`
    ${tw`col-span-8  bg-white rounded p-4 h-fit-content`}
  `;
  const Menu = styled.div`
    ${tw`flex flex-col gap-y-3`}
  `;
  const MenuItem = styled.div`
    ${tw` hover:cursor-pointer w-full flex flex-row px-4 py-3 gap-x-3 border border-solid border-[#EEEEEE] rounded-lg items-center text-blackColor`}
  `;

const ProfilePage = () => {
  const {userInfo} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
      <Body>
      <ContentContainer>
          <GridBox>
            <LeftContainer>
              <HeadingTitle>
                <Avatar src={userInfo.avatar || avatar}></Avatar>
                <Heading22>{userInfo.name}</Heading22>
              </HeadingTitle>
              <Menu>
                <MenuItem onClick={() => navigate("info")}>
                  <UilUser></UilUser>
                  <Text14>Thông tin cá nhân</Text14>
                </MenuItem>
                <MenuItem onClick={() => navigate("invoices")}>
                  <UilStore></UilStore>
                  <Text14>Danh sách đơn hàng</Text14>
                </MenuItem>
                <MenuItem onClick={() => navigate("vouchers")}>
                  <UilGift></UilGift>
                  <Text14>Ví voucher</Text14>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <UilSignInAlt></UilSignInAlt>
                  <Text14>Đăng xuất</Text14>
                </MenuItem>
              </Menu>
            </LeftContainer>
            <RightContainer>
              <Outlet></Outlet>
            </RightContainer> 
          </GridBox>
        </ContentContainer>
      </Body>
  );
}

export default ProfilePage;
