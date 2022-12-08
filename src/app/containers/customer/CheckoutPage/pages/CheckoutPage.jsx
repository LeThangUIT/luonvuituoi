import React, { useEffect, useState } from "react";
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
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { PinkButton } from "../../../../sharedComponents/button";
import { Image, ImageBox } from "../../../../sharedComponents/table";
import AddressApi from "../../../../api/addressApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../Auth/authSlice";

const GridBox = styled.div`
  ${tw`
        grid grid-cols-8 gap-10 
    `}
`;

const FormContainer = styled.div`
  ${tw` w-full col-span-5 bg-white rounded p-5`}
`;

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between gap-x-4`}
`;

const RightContainer = styled.div`
  ${tw`col-span-3 flex flex-col gap-y-4 `}
`;
const TotalContainer = styled.div`
  ${tw` w-full  bg-white rounded p-5 flex flex-col gap-y-6 h-fit-content`}
`;

const ItemInfo = styled.div`
  ${tw`w-full flex-1 flex flex-col gap-2`}
`;

function CheckoutPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [provinces, setProvinces] = useState([
    { id: "", name: "Chọn tỉnh/thành" },
  ]);
  const [districts, setDistricts] = useState([
    { id: "", name: "Chọn quận/huyện" },
  ]);
  const [wards, setWards] = useState([{ id: "", name: "chọn phường/xã" }]);
  const [fee, setFee] = useState(0)
  const userToken = localStorage.getItem("userToken");
  const checkoutOptions = [
    {
      key: "cod",
      value: "Thanh toán khi nhận hàng",
    },
    {
      key: "momo",
      value: "Thanh toán MoMo",
    },
    {
      key: "zaloPay",
      value: "Thanh toán ZaloPay",
    },
    {
      key: "vnPay",
      value: "Thanh toán VNPay",
    },
  ];
  const initialValues = {
    name: userInfo?.name,
    phone: userInfo?.phone,
    email: userInfo?.email,
    provinceId: "",
    districtId: "",
    wardId: "",
    address: "",
    payments: "cod",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn cần phải nhập trường này!"),
    phone: Yup.string().required("Bạn cần phải nhập trường này!"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  // const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      const res = await AddressApi.getProvince(userToken);
      setProvinces((prev) => [prev[0], ...res.data.data]);
      // dispatch(fetchUserInfo(userToken))
    }
    fetchData();
  }, []);
  let totalPrice = 0
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
                        />
                        <FormikControl
                          control="input"
                          type="email"
                          label="Email"
                          name="email"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Số điện thoại"
                          name="phone"
                        />

                        <FlexContainer>
                          <FormikControl
                            control="dependentSelect"
                            name="provinceId"
                            options={provinces}
                            setDistricts={setDistricts}
                          />
                          <FormikControl
                            control="dependentSelect"
                            name="districtId"
                            options={districts}
                            setWards={setWards}
                          />
                          <FormikControl
                            control="dependentSelect"
                            name="wardId"
                            options={wards}
                            setFee={setFee}
                          />
                        </FlexContainer>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Địa chỉ"
                          name="address"
                        />
                        <FormikControl
                          control="radio"
                          label="Phương thức thanh toán"
                          name="payments"
                          options={checkoutOptions}
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
                {cart.map((item, index) => {
                  totalPrice += item.price*item.quantity
                  return (
                    <FlexContainer key={index}>
                      <ImageBox>
                        <Image src={item.imageMain}></Image>
                      </ImageBox>
                      <ItemInfo>
                        <Heading16>{item.name}</Heading16>
                        {item.optionValues && (
                          <Text14>
                            {item.optionValues.map((option, index) => {
                              if (index == 0) {
                                return <>{option.value}</>;
                              } else {
                                return <> / {option.value}</>;
                              }
                            })}
                          </Text14>
                        )}
                        <PinkHeading22>
                          {formatter.format(item.price*item.quantity)} đ
                        </PinkHeading22>
                      </ItemInfo>
                      <Text14>x{item.quantity}</Text14>
                    </FlexContainer>
                  );
                })}
              </TotalContainer>
              <TotalContainer>
                <Heading16>Tổng tiền giỏ hàng</Heading16>
                <FlexContainer>
                  <Text14>Tạm tính</Text14>
                  <Heading14>{formatter.format(totalPrice)} đ</Heading14>
                </FlexContainer>
                <FlexContainer>
                  <Text14>Phí giao hàng</Text14>
                  <Heading14>+{formatter.format(fee)} đ</Heading14>
                </FlexContainer>
                <FlexContainer>
                  <Text14>Tổng</Text14>
                  <PinkHeading26>{formatter.format(totalPrice+fee)} đ</PinkHeading26>
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
