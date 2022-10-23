import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { DropDownIcon } from "../../../icon/dropDownIcon/DropDownIcon";
import { IconUser } from "../../rightHeader/IconUser";
import { RightIcon } from "../../../icon/rightIcon";
import { UpIcon } from "../../../icon/upIcon/UpIcon";
import { SubMenuResponsive2 } from "./children";
interface ISubMenuProps {item: {name: string, subMenu: {name1: string, subMenu1: string[]}[]}}

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
export const SubMenuResponsive:React.FC<ISubMenuProps> = ({item}) => {
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
                     ? <UpIcon size="17" color="white"></UpIcon>
                     : item.subMenu.length > 0
                     ? <DropDownIcon size="17" color="white"></DropDownIcon> : null
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