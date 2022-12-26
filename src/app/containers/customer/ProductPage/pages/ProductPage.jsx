import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Body } from "../../../../sharedComponents/body";
import { UilAngleRightB } from "@iconscout/react-unicons";

import LoadingComponent from "../../../../sharedComponents/loading";
import { Heading26 } from "../../../../sharedComponents/text";
import { getAllProducts } from "../../../admin/productManagement/productSlice";
import {
  ContentContainer,
  HeadingTitle,
  ListProductContainer,
} from "../../HomePage/components/content";
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

const FlexFrame = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`
export default function ProductPage() {
  const [remountComponent, setRemountComponent] = useState(0);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { listProducts, loading, keyword } = useSelector((state) => state.product);
  const { listCategories } = useSelector((state) => state.category);
  const [orderByPrice, setOrderByPrice] = useState("");
  useEffect(() => {
    dispatch(
      getAllProducts({ page: "1", perPage: "8", categoryId, orderByPrice, keyword })
    );
    setRemountComponent(Math.random());
  }, [categoryId, orderByPrice, keyword]);

  const options = [
    { value: "", text: "sắp xếp" },
    { value: "asc", text: "tăng dần" },
    { value: "desc", text: "giảm dần" },
  ];
  const handleChange = (event) => {
    console.log(event.target.value);
    setOrderByPrice(event.target.value);
  };

  return (
    <Body>
      <ContentContainer>
        {loading ? (
          <LoadingComponent></LoadingComponent>
        ) : listProducts?.items.length > 0 ? (
          <>
          <FlexFrame>
              <HeadingTitle>
                {!categoryId ? (
                  <Heading26>Tất cả sản phẩm</Heading26>
                ) : (
                  listCategories?.items.map((item, index) => {
                    if (item.id == categoryId) {
                      return <Heading26>{item.name}</Heading26>;
                    }
                  })
                )}
                <UilAngleRightB></UilAngleRightB>
              </HeadingTitle>
              <select value={orderByPrice} onChange={handleChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
          </FlexFrame>
            {listProducts && (
              <ListProductContainer>
                {listProducts.items.map((item, index) => {
                  return <ProductCard key={index} data={item}></ProductCard>;
                })}
              </ListProductContainer>
            )}
          </>
        ) : (
          <EmptyComponent>Không có sản phẩm</EmptyComponent>
          )}
          <PagingComponent  key={remountComponent}
            type={"product"}
            pageCount={listProducts?.totalPage}
            categoryId={categoryId}
            orderByPrice={orderByPrice}
            keyword = {keyword}
          ></PagingComponent>
      </ContentContainer>
    </Body>
  );
}
