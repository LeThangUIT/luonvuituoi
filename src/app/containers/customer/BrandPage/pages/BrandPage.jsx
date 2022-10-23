import React from "react";
import styled from "styled-components";
import tw from 'twin.macro'
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { RightIcon } from "../../../../sharedComponents/icon/rightIcon";
import { ContentContainer, HeadingTitle, ListProductContainer } from "../../HomePage/components/content";
import { listProduct } from "../../HomePage/components/content/data";
import { PageContainer } from "../../HomePage/pages/HomePage";
import { Heading26 } from "../../../../sharedComponents/text";
import ProductCard from "../components/ProductCard";

export const Body = styled.div`
    ${tw`
        flex flex-col items-start absolute top-[40px] md:top-[137px] left-0 right-0 w-full
    `}
`
export default function BrandPage() {
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
      });
    return (
        <PageContainer>
            <Header></Header>
            <Body>
                <ContentContainer>
                    <HeadingTitle>
                        <Heading26>Sữa bộ cao cấp</Heading26>
                        <RightIcon></RightIcon>
                    </HeadingTitle>
                    <ListProductContainer>
                        {listProduct.map((item, index) => {
                            return (
                                <ProductCard data={item}></ProductCard>
                                
                            );
                        })}
                    </ListProductContainer>
                </ContentContainer>
                <Footer></Footer>
            </Body>
        </PageContainer>
    )
}


