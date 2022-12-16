import { Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { PinkButton } from "../../../../sharedComponents/button";
import { formatDate } from "../../../../sharedComponents/format";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { StarIcon } from "../../../../sharedComponents/icon/starIcon";
import { ModalFooter } from "../../../../sharedComponents/modal";
import ProductImageSlider from "../../../../sharedComponents/slider/ProductImageSlider";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from "../../../../sharedComponents/table";
import { Heading16, Heading30, LightText12, Text14 } from "../../../../sharedComponents/text";
import { CommentFrame, StarGroup } from "../../../customer/DetailPage/pages/DetailPage";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import { getAllCategoriesByAdmin } from "../../categoryManagement/categorySlice";
import { MainDash } from "../../components/MainDash/MainDash";
import { fetchProductDetailByAdmin } from "../productSlice";
import { ScrollContainer } from "./ProductManagementPage";

const GridContainer = styled.div`
  ${tw` grid grid-cols-10 gap-10 bg-white rounded p-4 h-fit-content`}
`;
const RightSide = styled.div`
  ${tw` col-span-5`}
`;
const LeftSide = styled.div`
  ${tw` col-span-5`}
`;
const Group = styled.div`
  ${tw`flex flex-col gap-1 mb-8`}
`;
const Label = styled.span`
  ${tw`
        text-[#300F19]
        font-semibold 
        text-[14px]
        leading-[17px]
    `}
`;
const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const adminToken = localStorage.getItem("adminToken");
  const { productDetail, loading } = useSelector((state) => state.product);
  const initialValues = {
    name: productDetail?.name,
    categoryId: productDetail?.category?.id,
    price: productDetail?.price,
    quantity: productDetail?.quantity,
    details: productDetail?.details,
    description: productDetail?.description,
  };
  useEffect(() => {
      dispatch(fetchProductDetailByAdmin({ productId, adminToken }));
      dispatch(getAllCategoriesByAdmin({ adminToken, noPagination: "0" }));
  }, []);
  const { listCategories } = useSelector((state) => state.category);
  let listCate;
  if (listCategories) {
    listCate = [{ id: "", name: "Chọn danh mục" }, ...listCategories?.items];
  } else {
    listCate = [{ id: "", name: "Chọn danh mục" }];
  }
  let listImages = [];
  if (productDetail != null) {
    listImages = [
      productDetail.imageMain,
      ...productDetail.imageDescription.split(" "),
    ];
    listImages.pop();
  }

  const onSubmit = (values) => {};
  return (
    <MainDash>
      <Heading30>Detail Product</Heading30>
      <ScrollContainer>
        <GridContainer>
          <LeftSide>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
              // validationSchema={validationSchema}
            >
              {(formik) => {
                return (
                  <Form>
                    <FormContainer>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Tên sản phẩm"
                        name="name"
                      ></FormikControl>
                      <FormikControl
                        control="select"
                        label="Danh mục"
                        name="categoryId"
                        options={listCate}
                      />
                      <FormikControl
                        control="editorInput"
                        type="text"
                        label="Mô tả"
                        name="description"
                      ></FormikControl>
                      <FormikControl
                        control="editorInput"
                        type="text"
                        label="Chi tiết"
                        name="details"
                      ></FormikControl>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Giá sản phẩm"
                        name="price"
                      ></FormikControl>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Số lượng"
                        name="quantity"
                      ></FormikControl>
                      <ModalFooter>
                        <PinkButton disabled={loading} type="submit">
                          Xác nhận
                        </PinkButton>
                      </ModalFooter>
                    </FormContainer>
                  </Form>
                );
              }}
            </Formik>
          </LeftSide>
          <RightSide>
            <Group>
              <Label>Hình ảnh sản phẩm</Label>
              <div>
                <ProductImageSlider images={listImages}></ProductImageSlider>
              </div>
            </Group>
            <Group>
              { productDetail?.variants != null ? (
                <Label>Biến thể: sản phẩm không có biến thể</Label>
              ) : (
                <>
                  <Label>Biển thể</Label>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeading>Sku</TableHeading>
                        <TableHeading>Giá</TableHeading>
                        <TableHeading>Số lượng</TableHeading>
                        {productDetail?.variants !=null && productDetail?.variants[0].variantDetails.map(
                          (item, index) => (
                            <TableHeading>{item.option.name}</TableHeading>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productDetail?.variants !=null && productDetail?.variants.map((item, index) => (
                        <TableRow key={index}>
                          <TableData>{item.sku}</TableData>
                          <TableData>{item.price}</TableData>
                          <TableData>{item.quantity}</TableData>
                          {item.variantDetails.map((variant, index) => (
                            <TableData key={index}>
                              {variant.value.name}
                            </TableData>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </Group>
            <Group>
              <Label>
                Số lượt mua:{" "}
                {productDetail?.countPurchased
                  ? productDetail.countPurchased
                  : "0"}
              </Label>
            </Group>
            <Group>
              <Label>
                Số lượt đánh giá:{" "}
                {productDetail?.countReview ? productDetail.countReview : "0"}
              </Label>
            </Group>
            <Group>
              <Label>
                Điểm đánh giá trung bình:{" "}
                {productDetail?.averageRating
                  ? productDetail.averageRating
                  : "0"}
              </Label>
            </Group>
            <Group>
              <Label>
                Đánh giá từ khách hàng:{" "}
                {productDetail?.reviews.length == 0
                  ? <Text14>không có đánh giá nào.</Text14>
                  : productDetail?.reviews.map((item, index) => 
                    <CommentFrame>
                      <Heading16>{item?.user?.name}</Heading16>
                      <StarGroup>
                        {
                            [...Array(item.rating)].map((i, index) => (
                              <StarIcon size="12" color="#F0A500"></StarIcon>
                            ))
                        }
                        {
                            [...Array(5 - item.rating)].map((i, index) => (
                              <StarIcon size="12" color="#818181"></StarIcon>
                            ))
                        }
                      </StarGroup>
                      <LightText12>{formatDate(item?.createdAt)}</LightText12>
                      <Text14>{item?.content}</Text14>
                  </CommentFrame>
                  )}
              </Label>
            </Group>
          </RightSide>
        </GridContainer>
      </ScrollContainer>
    </MainDash>
  );
};

export default ProductDetailPage;
