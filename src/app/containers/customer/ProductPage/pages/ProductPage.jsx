import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../admin/productManagement/productSlice";

export const Body = styled.div`
    ${tw`
        flex flex-col items-start absolute top-[40px] md:top-[137px] left-0 right-0 w-full
    `}
`
export default function ProductPage() {
    const dispatch = useDispatch()
    const {listProducts} = useSelector(state => state.product)
    useEffect(() => {
        console.log("first")
        dispatch(getAllProducts())
    }, [])
    console.log(listProducts)
    
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
      });
    return (
        <PageContainer>
            <Header></Header>
            <Body>
                <ContentContainer>
                    <HeadingTitle>
                        <Heading26>Tất cả sản phẩm</Heading26>
                        <RightIcon></RightIcon>
                    </HeadingTitle>
                    {listProducts.length > 0 && <ListProductContainer>
                        {listProducts.map((item, index) => {
                            return (
                                <ProductCard key={index} data={item}></ProductCard>  
                            );
                        })}
                    </ListProductContainer>}
                    
                </ContentContainer>
                <Footer></Footer>
            </Body>
        </PageContainer>
    )
}


