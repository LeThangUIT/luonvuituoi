import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { PinkButton } from "../../button";


const RightContainer = styled.div`
  ${tw`
        flex justify-between items-center gap-x-6
    `}
`;
const ShoppingCartIcon = styled.svg`
  ${tw`
       cursor-pointer hover:opacity-80
    `}
`;
const UserIcon = styled.svg`
  ${tw`
  `}
`;
export function RightHeader() {
  const [color, setColor] = useState("white")
  const handleMouseEvent = () => {
    setColor("#EE4C7E")
  }
  const handleMouseLeave = () => {
    setColor("white")
  }
  const navigate = useNavigate()
  return (
    <RightContainer>
      <ShoppingCartIcon
        width="17"
        height="16"
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
      </ShoppingCartIcon>
      <PinkButton onMouseOver={handleMouseEvent} onMouseLeave={handleMouseLeave} onClick={() => navigate("/login")}>
        {/* <IconUser style={{color: "inherits"}}></IconUser> */}
        <UserIcon style={{color: "inherits"}}
        width="17"
        height="16"
        viewBox="0 0 17 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <g clip-path="url(#clip0_50_205)">
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
            <rect
              width="16"
              height="16"
              transform="translate(0.5)"
            />
          </clipPath>
        </defs>
      </UserIcon>
      Đăng nhập
      </PinkButton>
    </RightContainer>
  );
}
