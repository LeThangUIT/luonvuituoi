import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import logo from "../../../assets/images/Lamborghini-Logo.png"


const LogoContainer = styled.div`
    ${tw`
        md:w-28
        sm:w-24
        w-16
    `}
`
export function Logo () {
    return (
        <LogoContainer>
            <img src={logo}/>
        </LogoContainer>
    )
}