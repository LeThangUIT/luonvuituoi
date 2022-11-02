import React from "react";
import styled from "styled-components";
import tw from 'twin.macro'
import { Body } from "../../../../sharedComponents/body";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { ContentContainer } from "../../HomePage/components/content";

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        relative
    `}
`;

export default function ProductPageByCategory() {
    return (
        <PageContainer>
            <Header></Header>
            <Body>
                <ContentContainer>
                    
                </ContentContainer>
                <Footer></Footer>
            </Body>
        </PageContainer>
    )
}


