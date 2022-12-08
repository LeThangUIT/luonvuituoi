import React, { useEffect } from "react";
import styled from "styled-components";
import tw from 'twin.macro'
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { UilAngleRightB } from '@iconscout/react-unicons'
import { ContentContainer, HeadingTitle, ListProductContainer } from "../../HomePage/components/content";
import { PageContainer } from "../../HomePage/pages/HomePage";
import { Heading26 } from "../../../../sharedComponents/text";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../admin/productManagement/productSlice";
import PagingComponent from "../../../../sharedComponents/pagination/PagingComponent";

export const Body = styled.div`
    ${tw`
        flex flex-col items-start absolute top-[40px] md:top-[137px] left-0 right-0 w-full
    `}
`
export default function ProductPage() {
    const dispatch = useDispatch()
    const {listProducts} = useSelector(state => state.product)
    useEffect( () => {
        dispatch(getAllProducts({page:"1", perPage:"2"}))
    }, [])
    
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
                        <UilAngleRightB></UilAngleRightB>
                    </HeadingTitle>
                    {listProducts && <ListProductContainer>
                        {listProducts.items.map((item, index) => {
                            return (
                                <ProductCard key={index} data={item}></ProductCard>  
                            );
                        })}
                    </ListProductContainer>}
                    <PagingComponent type={"product"} pageCount={listProducts?.totalPage}></PagingComponent>
                </ContentContainer>
                <Footer></Footer>
            </Body>
        </PageContainer>
    )
}


