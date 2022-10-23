import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { DropDownIcon } from "../../../../icon/dropDownIcon/DropDownIcon";
import { IconUser } from "../../../rightHeader/IconUser";
import { RightIcon } from "../../../../icon/rightIcon";
import { UpIcon } from "../../../../icon/upIcon/UpIcon";

interface ISubMenuProps {item: {name1: string, subMenu1: string[]}}

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
       ml-6 not-italic text-lg leading-[17px] text-white flex-1
    `}
`;

const SubMenuText1 = styled.div`
  ${tw`
       ml-12 not-italic text-base leading-[17px] text-white flex-1
    `}
`;
export const SubMenuResponsive2:React.FC<ISubMenuProps> = ({item}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => {
        setSubnav(!subnav)
    }
    return(
        <SubMenu>
            <SubMenuItem >
                <SubMenuText>{item.name1}</SubMenuText>
                <div onTouchStart={item.subMenu1 && showSubnav}>
                    {item.subMenu1 && subnav 
                     ? <UpIcon size="17" color="white"></UpIcon>
                     : item.subMenu1.length > 0
                     ? <DropDownIcon size="17" color="white"></DropDownIcon> : null
                    }
                </div>
            </SubMenuItem>
            {subnav && item.subMenu1.map((item, index) => {
                return (
                    <SubMenuItem>
                        <SubMenuText1>{item}</SubMenuText1>
                    </SubMenuItem>
                )
            })}
        </SubMenu>
    )
}