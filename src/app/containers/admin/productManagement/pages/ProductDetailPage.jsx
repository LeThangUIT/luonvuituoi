import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { PinkButton } from "../../../../sharedComponents/button";
import { formatDate } from "../../../../sharedComponents/format";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { Avatar } from "../../../../sharedComponents/header/rightHeader/RightHeader";
import { StarIcon } from "../../../../sharedComponents/icon/starIcon";
import { ModalFooter } from "../../../../sharedComponents/modal";
import ProductImageSlider from "../../../../sharedComponents/slider/ProductImageSlider";
import avatar from "../../../../assets/images/avatar.png"
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from "../../../../sharedComponents/table";
import { Heading16, Heading30, LightText12, Text14 } from "../../../../sharedComponents/text";
import { CommentFrame, FlexFrame, StarGroup } from "../../../customer/DetailPage/pages/DetailPage";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import { getAllCategoriesByAdmin } from "../../categoryManagement/categorySlice";
import { MainDash } from "../../components/MainDash/MainDash";
import { fetchProductDetailByAdmin, setLoading, updateProduct } from "../productSlice";
import { ScrollContainer } from "./ProductManagementPage";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";


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
    images: [],
    imageMain: "",
    imageDescription: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn cần phải nhập trường này!"),
    categoryId: Yup.string().required("Bạn cần phải chọn trường này!"),
    price: Yup.number()
      .typeError("Giá phải là số!")
      .required("Bạn cần phải nhập trường này!")
      .positive("Giá phải là số dương!")
      .integer("Giá phải là số nguyên!")
      .min(10000, "Giá phải lớn hơn 10000!"),
    details: Yup.string().required("Bạn cần phải nhập trường này!"),
    description: Yup.string().required("Bạn cần phải nhập trường này!"),
    quantity: Yup.number()
      .typeError("Số lượng phải là số!")
      .required("Bạn cần phải chọn trường này!")
      .positive("Số lượng phải là số dương!")
      .integer("Số lượng phải là số nguyên!"),
    images: Yup.array().length(4, "Phải đủ 4 hình ảnh!"),
  });
  const [update, setUpdate] = useState(false)
  useEffect(() => {
      dispatch(fetchProductDetailByAdmin({ productId, adminToken }));
      dispatch(getAllCategoriesByAdmin({ adminToken, noPagination: "0" }));
  }, [update]);
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

  const onSubmit = async (values) => {
    dispatch(setLoading());
    for (let i = 0; i < values.images.length; i++) {
      let blob = await fetch(values.images[i])
        .then((r) => r.blob())
        .catch((error) => console.log(error));
      const imageRef = ref(storage, "image " + values.name + i);
      await uploadBytes(imageRef, blob);
      let URL = await getDownloadURL(imageRef);
      if (i == 0) {
        values.imageMain = URL;
      } else {
        values.imageDescription += `${URL} `;
      }
    }
    const { images, ...rest } = values;
    var {payload} = await dispatch(updateProduct({productId, data: rest, adminToken }));
    if (!payload.data.success) {
      toast.error(payload.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setUpdate(!update)
      toast.success(payload.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <MainDash>
      <Heading30>Chi tiết sản phẩm</Heading30>
      <ScrollContainer>
        <GridContainer>
          <LeftSide>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
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
                   control="imagesInput"
                   type="file"
                   label="Thay hình ảnh mới"
                   name="images"
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
              { productDetail?.variants == null ? (
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
                        {productDetail?.variants !=null && productDetail?.variants[0]?.variantDetails.map(
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
                  <FlexFrame className="pt-2">
                    <Avatar src={item?.user?.avatar || avatar}/>
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
                  </FlexFrame>
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
