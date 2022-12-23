import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import logo from "../../../assets/images/LzavaLogo.png"


const LogoContainer = styled.div`
    ${tw`
        md:w-28
        sm:w-24
        h-16
        hover:cursor-pointer
    `}
`
export function Logo () {
    return (
        <LogoContainer>
            <img src={logo}/>
        </LogoContainer>
    )
}