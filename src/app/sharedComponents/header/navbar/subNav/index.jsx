import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Heading14 } from "../../../text";
export const SubNav = styled.div`
    ${tw`
        bg-white min-w-[200px] absolute top-[100%] left-0  py-3 z-10
    `}
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
export const SubMenuItem = styled.div`
    ${tw`
        flex flex-row items-center  hover:bg-[#F8F8F8] py-3 px-5 
    `}
`
export const ArrowIconRight = styled.svg`
  ${tw` `}
`

export const SubMenu = ({display, data}) => {
    return (
        <SubNav className={display}>
            {data.map((item, index) => {
                return(
                    <SubMenuItem key={index}>
                        <Heading14>{item.name}</Heading14>
                    </SubMenuItem>
                )
            })}
            
        </SubNav>
    )
}