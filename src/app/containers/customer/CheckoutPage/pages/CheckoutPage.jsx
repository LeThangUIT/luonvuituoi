import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { toast } from "react-toastify";
import {
  Heading14,
  Heading16,
  Heading26,
  PinkHeading14,
  PinkHeading26,
  Text14,
} from "../../../../sharedComponents/text";
import { ContentContainer } from "../../HomePage/components/content";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { PinkButton, WhiteButton } from "../../../../sharedComponents/button";
import AddressApi from "../../../../api/addressApi";
import { useDispatch, useSelector } from "react-redux";
import CartMini from "../components/CartMini";
import { Body } from "../../../../sharedComponents/body";
import { BoxText } from "../../../../sharedComponents/formikCustom/formikCustomControl/Input";
import InvoiceApi from "../../../../api/invoiceApi";
import { removeSelectedItem } from "../../CartPage/CartSlice";
import { useNavigate } from "react-router-dom";

const GridBox = styled.div`
  ${tw`
        grid grid-cols-8 gap-10 
    `}
`;

const LeftContainer = styled.div`
  ${tw` w-full col-span-5 bg-white rounded p-5 shadow-sm`}
`;

const FormContainer = styled.div`
  ${tw` w-full  bg-white rounded p-5`}
`;

export const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between gap-x-4 `}
`;

const RightContainer = styled.div`
  ${tw`col-span-3 flex flex-col gap-y-4 `}
`;
const TotalContainer = styled.div`
  ${tw` w-full  bg-white rounded p-5 flex flex-col gap-y-6 h-fit-content shadow-sm`}
`;

function CheckoutPage() {
  // function navigateCart()
  // {
  //   window.location.href = "/cart"
  // }
  // window.onbeforeunload = navigateCart;
  const { userInfo } = useSelector((state) => state.auth);
  const { cart, isCheckAll } = useSelector((state) => state.cart);
  const [provinces, setProvinces] = useState([
    { id: "", name: "Chọn tỉnh/thành" },
  ]);
  const [districts, setDistricts] = useState([
    { id: "", name: "Chọn quận/huyện" },
  ]);
  const [wards, setWards] = useState([{ id: "", name: "chọn phường/xã" }]);
  const [fee, setFee] = useState(0);
  const userToken = localStorage.getItem("userToken");
  const checkoutOptions = [
    {
      key: "cash",
      value: "Thanh toán khi nhận hàng",
    },
    {
      key: "momo",
      value: "Thanh toán MoMo",
    },
    {
      key: "zalopay",
      value: "Thanh toán ZaloPay",
    },
    {
      key: "vnpay",
      value: "Thanh toán VNPay",
    },
  ];
  const initialValues = {
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
    provinceId: "",
    districtId: "",
    wardId: "",
    address: "",
    payment: "cod",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn cần phải nhập trường này!"),
    phone: Yup.string().required("Bạn cần phải nhập trường này!"),
    wardId: Yup.string().required("Bạn cần phải nhập trường này!"),
    address: Yup.string().required("Bạn cần phải nhập trường này!"),
  });
  const dispatch = useDispatch()
  const onSubmit = async (values) => {
    setLoading(true);
    let items = [];
    if (!isCheckAll) {
      items = selectedCart.map((item) => {
        if (item.checked) {
          return {
            productId: item.productId,
            variantId: item?.variantId || 0,
            quantity: item.quantity,
          };
        }
      });
    }
    const res = await InvoiceApi.addInvoice({
      userToken,
      data: {
        receiverName: values.name,
        receiverPhone: values.phone,
        wardId: values.wardId,
        payment: values.payment,
        address: values.address,
        couponCode: code,
        items: items,
      },
    });
    if (res.data.success) {
      setLoading(false);
      dispatch(removeSelectedItem())
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setLoading(false);
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  useEffect(() => {
    async function fetchData() {
      const res = await AddressApi.getProvince(userToken);
      setProvinces((prev) => [prev[0], ...res.data.data]);
    }
    fetchData();
  }, []);
  let selectedCart = cart.filter((item) => {
    if (item.checked) {
      console.log(item);
      return item;
    }
  });
  let totalPrice = selectedCart.reduce(
    (currentValue, item) => item.price * item.quantity + currentValue,
    0
  );
  let quantityItem = selectedCart.reduce(
    (currentValue, item) => item.quantity + currentValue,
    0
  );
  const [reduce, setReduce] = useState(0);

  const [code, setCode] = useState("");
  const handleChangeCode = (e) => {
    setCode(e.target.value);
    setReduce(0)
  };
  const { listVoucher } = useSelector((state) => state.voucher);
  const [loading, setLoading] = useState(false);
  const checkCode = () => {
    let message = {
      text: "Mã không hợp lệ!",
      type: "error",
    };
    listVoucher.map((item) => {
      if (item.code == code) {
        const day = new Date(item.beginDate);
        if (day <= Date.now()) {
          switch (item.discountType) {
            case "money":
              if (item.condition <= totalPrice) {
                setReduce(item.value);
                message.text = "Áp dụng thành công!";
                message.type = "success";
              } else {
                message.text = "Đơn hàng chưa đủ giá trị!";
                message.type = "error";
              }
              break;
            case "quantity":
              if (item.condition <= quantityItem) {
                setReduce(Math.round((totalPrice * item.value) / 100));
                message.text = "Áp dụng thành công!";
                message.type = "success";
              } else {
                message.text = "Đơn chưa đủ số lượng!";
                message.type = "error";
              }
              break;
            default:
            // code block
          }
        } else {
          message.text = "Mã chưa đến hạn sử dụng!";
          message.type = "error";
        }
      }
    });
    if (message.type == "error") {
      toast.error(message.text, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (message.type == "success") {
      toast.success(message.text, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Body>
      <ContentContainer>
        <GridBox>
          <LeftContainer>
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
                          setLoading={setLoading}
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
                        name="payment"
                        options={checkoutOptions}
                      />
                      <PinkButton type="submit" disabled={loading}>
                        Thanh toán
                      </PinkButton>
                    </FormContainer>
                  </Form>
                );
              }}
            </Formik>
          </LeftContainer>
          <RightContainer>
            <TotalContainer>
              <CartMini cart={selectedCart}></CartMini>
            </TotalContainer>
            <TotalContainer>
              <BoxText
                value={code}
                onChange={handleChangeCode}
                placeholder="Nhập mã giảm giá"
              ></BoxText>
              <WhiteButton disabled={code == ""} onClick={checkCode}>
                Áp dụng
              </WhiteButton>
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
                <Text14>Giảm giá</Text14>
                <Heading14>-{formatter.format(reduce)} đ</Heading14>
              </FlexContainer>
              <FlexContainer>
                <Text14>Tổng</Text14>
                <PinkHeading26>
                  {formatter.format(totalPrice + fee - reduce)} đ
                </PinkHeading26>
              </FlexContainer>
            </TotalContainer>
          </RightContainer>
        </GridBox>
      </ContentContainer>
    </Body>
  );
}

export default CheckoutPage;
