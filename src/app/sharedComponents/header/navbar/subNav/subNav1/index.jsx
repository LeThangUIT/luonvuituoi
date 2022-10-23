import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SubMenuItem } from "..";
import { Heading14 } from "../../../../text";
const SubNav = styled.div`
    ${tw`
        bg-white min-w-[200px] absolute top-0 left-[100%] min-h-full py-3
    `}
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

`
export const SubMenu1= ({display, subMenu1}) => {
    return (
        <SubNav className={display}>
            {subMenu1.map((item, index) => {
                return (
                    <SubMenuItem>
                        <Heading14>{item}</Heading14>
                    </SubMenuItem>
                )
            })}
        </SubNav>
    )
}