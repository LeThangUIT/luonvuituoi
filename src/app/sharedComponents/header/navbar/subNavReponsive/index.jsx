import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { UilAngleDown } from '@iconscout/react-unicons'
import { UilAngleUp } from '@iconscout/react-unicons'
import { SubMenuResponsive2 } from "./children";

const SubMenu = styled.div`
    ${tw` `}
`
const SubMenuItem = styled.div`
  ${tw`
        flex flex-row items-center py-3 px-5 border-b
        border-b-[#EEEEEE]
        border-solid
        border-opacity-20
    `}
`;
const SubMenuText = styled.div`
  ${tw`
       not-italic text-xl leading-[17px] text-white flex-1
    `}
`;
export const SubMenuResponsive = ({item}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => {
        setSubnav(!subnav)
    }
    return(
        <SubMenu>
            <SubMenuItem >
                <SubMenuText>{item.name}</SubMenuText>
                <div onTouchStart={item.subMenu && showSubnav}>
                    {item.subMenu && subnav 
                     ? <UilAngleUp size="17" color="white"></UilAngleUp>
                     : item.subMenu.length > 0
                     ? <UilAngleDown size="17" color="white"></UilAngleDown> : null
                    }
                </div>
            </SubMenuItem>
            {subnav && item.subMenu.map((item, index) => {
                return (
                    <SubMenuResponsive2 item={item} key={index}></SubMenuResponsive2>
                )
            })}
        </SubMenu>
    )
}