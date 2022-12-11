import React, { useEffect } from "react";
import styled from "styled-components";
import tw from 'twin.macro'
import { UilAngleRightB } from '@iconscout/react-unicons'
import { ContentContainer, HeadingTitle, ListProductContainer } from "../../HomePage/components/content";
import { Heading26 } from "../../../../sharedComponents/text";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../admin/productManagement/productSlice";
import PagingComponent from "../../../../sharedComponents/pagination/PagingComponent";
import { Body } from "../../../../sharedComponents/body";

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
            </Body>
    )
}


