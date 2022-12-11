import React, { memo, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "./logo";
import { Navbar } from "./navbar";
import { SCREENS } from "../reponsive";
import { RightHeader } from "./rightHeader/RightHeader";
import { SearchBox, SearchIcon } from "./searchBox";
import { slide as Menu } from "react-burger-menu";
import menuStyles from "./menuStyles";
import { listMenu } from "./data";
import { SubMenuResponsive } from "./navbar/subNavReponsive";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../containers/admin/categoryManagement/categorySlice";
import { fetchUserInfo } from "../../containers/customer/Auth/authSlice";
import { useLocation } from "react-router-dom";


const HeaderContainer = styled.div`
  ${tw`
        w-full
        fixed
        border-b
        border-b-[#EEEEEE]
        border-solid
        border-opacity-50
        z-10
        bg-white
    `}
`;
const Text = styled.span`
  ${tw``}
`;
const TopSection = styled.div`
  ${tw`
        w-full
        md:gap-x-10
        xl:gap-x-24
        flex
        flex-row
        items-center
        md:py-5
        xl:px-40
        lg:px-20
        md:px-10
        sm:px-2
        justify-between
        py-4
        px-4
    `}
`;

const TopChildren = styled.div`
  ${tw` flex items-center justify-between gap-x-8 h-auto relative`}
`;

const LoginButton = styled.button`
  ${tw`
        mt-4 w-max box-border flex justify-between items-center py-2 px-4 rounded-lg gap-x-2 border bg-[white] color[#EE4C7E] border-[#EE4C7E] 
    `}
`;
const LoginButtonText = styled.span`
  ${`
        not-italic font-semibold text-sm leading-[17px]
    `}
`;
const UserIcon = styled.svg`
  ${tw`
  `}
`;
export function Header() {
  const lastHeight = useRef(0)
  const [isShow, setIsShow] = useState(true)
  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset

      if ( st > lastHeight.current) {
        setIsShow(false)
      }
      else {
        setIsShow(true)
      }

      lastHeight.current = st <= 0 ? 0 : st
    }
    window.addEventListener("scroll", handleScroll)
  }, [])
  const currentPath = useLocation()
  const userToken = localStorage.getItem("userToken");
  if(!userToken) {
    localStorage.setItem("currentPath", currentPath.pathname)
  }
  const isMobile = useMediaQuery({ maxWidth: SCREENS.md });
  const [showSearch, setShowSearch] = useState(false);
  if (isMobile) {
    return (
      <HeaderContainer>
        <TopSection>
          <TopChildren>
            <Menu styles={menuStyles}>
              {listMenu.map((item, index) => {
                return (
                  <SubMenuResponsive
                    item={item}
                    key={index}
                  ></SubMenuResponsive>
                );
              })}
              <LoginButton>
                <UserIcon
                  style={{ color: "inherits" }}
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <g >
                    <path
                      d="M14.5 16H13.1667V12.638C13.1661 12.1154 12.9583 11.6143 12.5887 11.2447C12.2191 10.8751 11.718 10.6672 11.1953 10.6667H5.80466C5.282 10.6672 4.78089 10.8751 4.41131 11.2447C4.04173 11.6143 3.83386 12.1154 3.83333 12.638V16H2.5V12.638C2.50106 11.7619 2.84957 10.922 3.46908 10.3025C4.0886 9.68294 4.92854 9.33443 5.80466 9.33337H11.1953C12.0715 9.33443 12.9114 9.68294 13.5309 10.3025C14.1504 10.922 14.4989 11.7619 14.5 12.638V16Z"
                      // fill="currentColor"
                    />
                    <path
                      d="M8.5 8C7.70887 8 6.93552 7.7654 6.27772 7.32588C5.61992 6.88635 5.10723 6.26164 4.80448 5.53073C4.50173 4.79983 4.42252 3.99556 4.57686 3.21964C4.7312 2.44372 5.11216 1.73098 5.67157 1.17157C6.23098 0.612164 6.94371 0.231201 7.71964 0.0768606C8.49556 -0.0774802 9.29983 0.00173314 10.0307 0.304484C10.7616 0.607234 11.3863 1.11992 11.8259 1.77772C12.2654 2.43552 12.5 3.20887 12.5 4C12.4989 5.06054 12.0772 6.07734 11.3273 6.82726C10.5773 7.57717 9.56054 7.99894 8.5 8ZM8.5 1.33333C7.97258 1.33333 7.45701 1.48973 7.01848 1.78275C6.57995 2.07577 6.23815 2.49224 6.03632 2.97951C5.83449 3.46678 5.78168 4.00296 5.88457 4.52024C5.98747 5.03752 6.24144 5.51268 6.61438 5.88562C6.98732 6.25856 7.46248 6.51253 7.97976 6.61543C8.49704 6.71832 9.03322 6.66551 9.52049 6.46368C10.0078 6.26184 10.4242 5.92005 10.7172 5.48152C11.0103 5.04299 11.1667 4.52742 11.1667 4C11.1667 3.29276 10.8857 2.61448 10.3856 2.11438C9.88552 1.61429 9.20724 1.33333 8.5 1.33333Z"
                      // fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_205">
                      <rect width="16" height="16" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </UserIcon>
                <LoginButtonText>Đăng nhập</LoginButtonText>
              </LoginButton>
            </Menu>
            <Logo></Logo>
          </TopChildren>
          <TopChildren>
            {showSearch ? (
              <svg
                onTouchStart={() => setShowSearch(false)}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 17 16"
                fill="#EE4C7E"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            ) : (
              <svg
                onTouchStart={() => setShowSearch(true)}
                width="20"
                height="20"
                viewBox="0 0 17 16"
                fill="#EE4C7E"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g >
                  <path
                    d="M16.2073 14.2968L13.1106 11.1987C15.4277 8.10223 14.7959 3.71356 11.6994 1.39641C8.60288 -0.920736 4.21422 -0.288925 1.89707 2.80759C-0.42008 5.90411 0.211731 10.2928 3.30825 12.6099C5.79563 14.4713 9.21199 14.4713 11.6994 12.6099L14.7975 15.708C15.1868 16.0973 15.818 16.0973 16.2073 15.708C16.5966 15.3187 16.5966 14.6875 16.2073 14.2982L16.2073 14.2968ZM7.52964 12.012C4.7776 12.012 2.54666 9.78102 2.54666 7.02899C2.54666 4.27695 4.7776 2.04601 7.52964 2.04601C10.2817 2.04601 12.5126 4.27695 12.5126 7.02899C12.5097 9.77978 10.2805 12.009 7.52964 12.012Z"
                    fill="#EE4C7E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_192_194">
                    <rect
                      width="16"
                      height="16"
                      fill="#EE4C7E"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}

            <svg
              width="20"
              height="20"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_50_198)">
                <path
                  d="M16.5 2H3.328L3.3 1.766C3.2427 1.27961 3.00892 0.831155 2.64299 0.505652C2.27706 0.180149 1.80442 0.000227862 1.31467 0L0.5 0V1.33333H1.31467C1.47796 1.33335 1.63556 1.3933 1.75758 1.50181C1.8796 1.61032 1.95756 1.75983 1.97667 1.922L3.03333 10.9007C3.09063 11.3871 3.32441 11.8355 3.69034 12.161C4.05627 12.4865 4.52891 12.6664 5.01867 12.6667H13.8333V11.3333H5.01867C4.85528 11.3333 4.69759 11.2733 4.57555 11.1646C4.45351 11.056 4.37562 10.9063 4.35667 10.744L4.26933 10H15.0573L16.5 2ZM13.9427 8.66667H4.11267L3.48533 3.33333H14.9047L13.9427 8.66667Z"
                  fill="#EE4C7E"
                />
                <path
                  d="M5.16668 16.0001C5.90306 16.0001 6.50001 15.4031 6.50001 14.6667C6.50001 13.9303 5.90306 13.3334 5.16668 13.3334C4.4303 13.3334 3.83334 13.9303 3.83334 14.6667C3.83334 15.4031 4.4303 16.0001 5.16668 16.0001Z"
                  fill="#EE4C7E"
                />
                <path
                  d="M11.8333 16.0001C12.5697 16.0001 13.1667 15.4031 13.1667 14.6667C13.1667 13.9303 12.5697 13.3334 11.8333 13.3334C11.097 13.3334 10.5 13.9303 10.5 14.6667C10.5 15.4031 11.097 16.0001 11.8333 16.0001Z"
                  fill="#EE4C7E"
                />
              </g>
              <defs>
                <clipPath id="clip0_50_198">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </TopChildren>
        </TopSection>
        {showSearch && <SearchBox></SearchBox>}
      </HeaderContainer>
    );
  }
  return (
    <HeaderContainer style={{transform: isShow ? "" : "translateY(-100%)"}}>
      <TopSection>
        <Logo></Logo>
        <SearchBox></SearchBox>
        <RightHeader></RightHeader>
      </TopSection>
      <Navbar></Navbar>
    </HeaderContainer>
  );
}

