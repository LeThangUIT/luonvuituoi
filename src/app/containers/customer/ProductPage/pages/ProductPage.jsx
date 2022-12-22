import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from 'twin.macro'
import { Body } from "../../../../sharedComponents/body";
import { UilAngleRightB } from "@iconscout/react-unicons";

import LoadingComponent from "../../../../sharedComponents/loading";
import { Heading26 } from "../../../../sharedComponents/text";
import { getAllProducts } from "../../../admin/productManagement/productSlice";
import { ContentContainer, HeadingTitle, ListProductContainer } from "../../HomePage/components/content";
import ProductCard from "../components/ProductCard";
import PagingComponent from "../../../../sharedComponents/pagination/PagingComponent";
import EmptyComponent from "../../../../sharedComponents/empty";

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

export default function ProductPage() {
    const dispatch = useDispatch();
    const {categoryId} = useParams()
    const { listProducts, loading } = useSelector((state) => state.product);
    const {listCategories} = useSelector(state => state.category)
    const [orderByPrice, setOrderByPrice] = useState("")
    useEffect(() => {
      dispatch(getAllProducts({ page: "1", perPage: "2", categoryId, orderByPrice }));
    }, [categoryId, orderByPrice]);
    console.log(listProducts)
    return (
        <Body>
        <ContentContainer>
          {loading ? (
            <LoadingComponent></LoadingComponent>
          ) : listProducts?.items.length > 0 ? (
            <>
              <HeadingTitle>
                {!categoryId ? <Heading26>Tất cả sản phẩm</Heading26> : 
                listCategories?.items.map((item, index) => {
                  if(item.id == categoryId) {
                    return (
                      <Heading26>{item.name}</Heading26>
                    )
                  }
                })
                }
                <UilAngleRightB></UilAngleRightB>
              </HeadingTitle>
              {listProducts && (
                <ListProductContainer>
                  {listProducts.items.map((item, index) => {
                    return <ProductCard key={index} data={item}></ProductCard>;
                  })}
                </ListProductContainer>
              )}
              <PagingComponent
                type={"product"}
                pageCount={listProducts?.totalPage}
                categoryId={categoryId}
                orderByPrice={orderByPrice}
              ></PagingComponent>
            </>
          ) : (
            <EmptyComponent>Không có sản phẩm</EmptyComponent>
          )}
        </ContentContainer>
      </Body>
    )
}


