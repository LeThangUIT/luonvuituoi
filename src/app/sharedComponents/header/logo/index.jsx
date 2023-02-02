import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import logo from "../../../assets/images/Logo.png"


const LogoContainer = styled.div`
    ${tw`
        lg:w-32
        md:w-28
        w-24
        hover:cursor-pointer
        flex 
        items-center
    `}
`
export function Logo () {
    return (
        <LogoContainer>
            <img src={logo}/>
        </LogoContainer>
    )
}