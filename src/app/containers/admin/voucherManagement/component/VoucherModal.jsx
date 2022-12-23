import React from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  ButtonClose,
  ModalBackground,
  ModalContainer,
  ModalFooter,
  ModalTitle
} from "../../../../sharedComponents/modal";
import { Heading22 } from "../../../../sharedComponents/text";

import { Form, Formik } from "formik";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { PinkButton } from "../../../../sharedComponents/button";
import { toast } from "react-toastify";
import { addVoucher, hideVoucherModal, updateVoucher } from "../VoucherSlice";

function VoucherModal() {
  const adminToken = localStorage.getItem("adminToken");
  const { isUpdate, newVoucher, loading } = useSelector(
    (state) => state.voucher
  );
  const DiscountType = [
    {key: "money" , value: "money"},
    {key: "quantity" , value: "quantity"},
  ]
  let initialValues = {};
  if (isUpdate && newVoucher) {
    initialValues = {
      // title: newVoucher.title,
      code: newVoucher.code,
      // description: newVoucher.description,
      discountType: newVoucher.discountType,
      condition: newVoucher.condition,
      value: newVoucher.value,
      beginDate: Date.parse(newVoucher.beginDate),
      endDate: Date.parse(newVoucher.endDate),
    };
  } else {
    initialValues = {
      // title: "",
      code: "",
      // description: "",
      discountType: "money",
      condition: "",
      value: "",
      beginDate: "",
      endDate: "",
    };
  }
  const validationSchema = Yup.object({
    title: Yup.string().required("Bạn cần phải nhập trường này!"),
  });

  const onSubmit = async (values) => {
    console.log(values)
    if (isUpdate) {
      var {payload} = await dispatch(
        dispatch(updateVoucher({id: newVoucher.id,data: values, adminToken}))
      );
    } else {
      var {payload} = await dispatch(addVoucher({data: values, adminToken}));
    }
    if (!payload.res.data.success) {
      dispatch(hideVoucherModal());
      toast.error(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch(hideVoucherModal());
      toast.success(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideVoucherModal());
  };
  return (
    <ModalBackground>
      <ModalContainer>
        <ButtonClose onClick={() => handleClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </ButtonClose>

        <ModalTitle>
          {isUpdate ? (
            <Heading22>Cập nhật voucher</Heading22>
          ) : (
            <Heading22>Thêm voucher</Heading22>
          )}
        </ModalTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            console.log(formik)
            return (
              <Form>
                <FormContainer>
                  {/* <FormikControl
                    control="input"
                    type="text"
                    label="Tiêu đề"
                    name="title"
                  ></FormikControl> */}
                   <FormikControl
                    control="input"
                    type="Mã"
                    label="Mã giảm giá"
                    name="code"
                  ></FormikControl>
                   {/* <FormikControl
                    control="input"
                    type="text"
                    label="Mô tả"
                    name="description"
                  ></FormikControl> */}
                  <FormikControl
                    control="radio"
                    label="Loại giảm giá"
                    name="discountType"
                    options={DiscountType}
                  >
                  </FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label={formik.values.discountType == "money" ? "Số tiền đơn hàng tối thiểu" : "Số lượng sản phẩm tối thiểu"}
                    name="condition"
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label={formik.values.discountType == "money" ? "Số tiền được giảm" : "Phần trăm giảm"}
                    name="value"
                  ></FormikControl>
                  <FormikControl
                    control="time"
                    label="Ngày bắt đầu"
                    name="beginDate"
                  ></FormikControl>
                  <FormikControl
                    control="time"
                    label="Ngày kết thúc"
                    name="endDate"
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
      </ModalContainer>
    </ModalBackground>
  );
}

export default VoucherModal;
