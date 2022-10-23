import React from "react";
import styled from "styled-components";
import tw from 'twin.macro'
import { Body } from "../../../../sharedComponents/body";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { Banner } from "../components/banner";
import { Content } from "../components/content";

export const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        relative
    `}
`;

export default function HomePage() {
    return (
        <PageContainer>
            <Header></Header>
            <Body>
                <Banner></Banner>
                <Content></Content>
                <Footer></Footer>
            </Body>
        </PageContainer>
    )
}


