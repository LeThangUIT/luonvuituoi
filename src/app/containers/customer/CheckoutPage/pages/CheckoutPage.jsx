import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import {
  Heading14,
  Heading16,
  Heading22,
  Heading26,
  Heading30,
  PinkHeading14,
  PinkHeading16,
  PinkHeading22,
  PinkHeading26,
  Text14,
} from "../../../../sharedComponents/text";
import { ContentContainer } from "../../HomePage/components/content";
import { PageContainer } from "../../HomePage/pages/HomePage";
import { Body } from "../../ProductPage/pages/ProductPage";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { PinkButton } from "../../../../sharedComponents/button";
import { Image, ImageBox } from "../../../../sharedComponents/table";

const GridBox = styled.div`
  ${tw`
        grid grid-cols-7 gap-10 
    `}
`;

const FormContainer = styled.div`
  ${tw` w-full col-span-4 bg-white rounded p-5`}
`;

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between gap-x-4`}
`;

const RightContainer = styled.div`
  ${tw`col-span-3 flex flex-col gap-y-4 `}
`
const TotalContainer = styled.div`
  ${tw` w-full  bg-white rounded p-5 flex flex-col gap-y-6 h-fit-content`}
`;

const ItemInfo = styled.div`
  ${tw`w-full flex-1 flex flex-col gap-2`}
`


function CheckoutPage() {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address: ""
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn cần phải nhập trường này!"),
    phone: Yup.string().required("Bạn cần phải nhập trường này!"),
  });
  const radioOptions = [
    { key: "option1", value: "Option 1" },
    { key: "option2", value: "Option 2" },
    { key: "option3", value: "Option 3" },
  ];


  const onSubmit = (values) => {
    console.log(values)
  };
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  return (
    <PageContainer>
      <Header></Header>
      <Body>
        <ContentContainer>
          <GridBox>
            <FormContainer>
              <FlexContainer>
                <Heading26>Thông tin vận chuyển</Heading26>
                <PinkHeading14>Đăng nhập ngay</PinkHeading14>
              </FlexContainer>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormContainer>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Họ tên"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          onBlur={formik.handleBlur}
                        />
                        <FormikControl
                          control="input"
                          type="email"
                          label="Email"
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Số điện thoại"
                          name="phone"
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          onBlur={formik.handleBlur}
                        />

                        <FlexContainer>
                          <FormikControl
                            control="select"
                            label="Chọn Tỉnh/thành"
                            name="province"
                          />
                          <FormikControl
                            control="select"
                            label="Chọn Quận/huyện"
                            name="district"
                          />
                          <FormikControl
                            control="select"
                            label="Chọn Phường/xã"
                            name="ward"
                          />
                        </FlexContainer>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Địa chỉ"
                          name="address"
                          onChange={formik.handleChange}
                          value={formik.values.address}
                          onBlur={formik.handleBlur}
                        />
                         <FormikControl
                          control="radio"
                          label="Phương thức thanh toán"
                          name="payments"
                          onChange={formik.handleChange}
                          value={formik.values.payments}
                          onBlur={formik.handleBlur}
                          options={radioOptions}
                        />
                        <PinkButton type="submit">Thanh toán</PinkButton>
                      </FormContainer>
                    </Form>
                  );
                }}
              </Formik>
            </FormContainer>
            <RightContainer>
              <TotalContainer>
                <Heading16>Giỏ hàng</Heading16>
                <FlexContainer>
                  <ImageBox>
                    <Image></Image>
                  </ImageBox>
                  <ItemInfo>
                    <Heading16>Teen sanr pham efdsfs fsd fsdfs dfsd fsf ds fd sfsfsdf</Heading16>
                    <Text14>Xanh / M</Text14>
                    <PinkHeading22>{formatter.format(100000)} đ</PinkHeading22>
                    <Text14>x2</Text14>
                  </ItemInfo>
                </FlexContainer>
              </TotalContainer>
              <TotalContainer>
                  <Heading16>Tổng tiền giỏ hàng</Heading16>
                  <FlexContainer>
                    <Text14>Tạm tính</Text14>
                    <Heading14>{formatter.format(100000)} đ</Heading14>
                  </FlexContainer>
                  <FlexContainer>
                    <Text14>Phí giao hàng</Text14>
                    <Heading14>+{formatter.format(25000)} đ</Heading14>
                  </FlexContainer>
                  <FlexContainer>
                    <Text14>Tổng</Text14>
                    <PinkHeading26>{formatter.format(125000)} đ</PinkHeading26>
                  </FlexContainer>
              </TotalContainer>
            </RightContainer>
          </GridBox>
        </ContentContainer>
        <Footer></Footer>
      </Body>
    </PageContainer>
  );
}

export default CheckoutPage;
