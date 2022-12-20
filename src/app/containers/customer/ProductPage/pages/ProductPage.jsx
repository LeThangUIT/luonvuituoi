import React, { useEffect } from "react";
import { UilAngleRightB } from "@iconscout/react-unicons";
import {
  ContentContainer,
  HeadingTitle,
  ListProductContainer,
} from "../../HomePage/components/content";
import { Heading26 } from "../../../../sharedComponents/text";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../admin/productManagement/productSlice";
import PagingComponent from "../../../../sharedComponents/pagination/PagingComponent";
import { Body } from "../../../../sharedComponents/body";
import LoadingComponent from "../../../../sharedComponents/loading";
import EmptyComponent from "../../../../sharedComponents/empty";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { listProducts, loading } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts({ page: "1", perPage: "16" }));
  }, []);

  return (
    <Body>
      <ContentContainer>
        {loading ? (
          <LoadingComponent></LoadingComponent>
        ) : listProducts?.items.length > 0 ? (
          <>
            <HeadingTitle>
              <Heading26>Tất cả sản phẩm</Heading26>
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
            ></PagingComponent>
          </>
        ) : (
          <EmptyComponent>Không có sản phẩm</EmptyComponent>
        )}
      </ContentContainer>
    </Body>
  );
}
