import React from "react";
import * as Yup from "yup";
import parse from "date-fns/parse";
import { useDispatch, useSelector } from "react-redux";
import {
  ButtonClose,
  ModalBackground,
  ModalContainer,
  ModalFooter,
  ModalTitle,
} from "../../../../sharedComponents/modal";
import { Heading22 } from "../../../../sharedComponents/text";
import { Form, Formik } from "formik";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { PinkButton } from "../../../../sharedComponents/button";
import { toast } from "react-toastify";
import { addVoucher, hideVoucherModal, updateVoucher } from "../VoucherSlice";
import { formatDate } from "../../../../sharedComponents/format";

function VoucherModal() {
  const adminToken = localStorage.getItem("adminToken");
  const { isUpdate, newVoucher, loading } = useSelector(
    (state) => state.voucher
  );
  const DiscountType = [
    { key: "money", value: "money" },
    { key: "quantity", value: "quantity" },
  ];
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
    // title: Yup.string().required("Bạn cần phải nhập trường này!"),
    code: Yup.string()
      .required("Bạn cần phải nhập trường này!")
      .max(12, "Vui lòng không nhập quá 12 kí tự!"),
    discountType: Yup.string().required("Bạn cần phải nhập trường này!"),
    condition: Yup.number()
      .typeError("Giá phải là số!")
      .required("Bạn cần phải nhập trường này!")
      .positive("Giá phải là số dương!")
      .integer("Giá phải là số nguyên!"),
    value: Yup.number()
      .typeError("Giá phải là số!")
      .required("Bạn cần phải nhập trường này!")
      .positive("Giá phải là số dương!")
      .integer("Giá phải là số nguyên!"),
    beginDate: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(
          formatDate(originalValue),
          "dd/MM/yyyy",
          new Date()
        );
        return result;
      })
      .typeError("Vui lòng nhập ngày hợp lệ!")
      .required("Bạn cần phải nhập trường này!"),
    endDate: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(
          formatDate(originalValue),
          "dd/MM/yyyy",
          new Date()
        );
        return result;
      })
      .typeError("Vui lòng nhập ngày hợp lệ!")
      .required("Bạn cần phải nhập trường này!"),
  });

  const validate = (values, props) => {
    const errors = {};
    if (values.discountType === "money") {
      if (values.value > values.condition) {
        errors.value = "Số tiền giảm không được lớn hơn số tiền tối thiểu!";
      }
    } else {
      if (values.value < 0 || values.value > 100) {
        errors.value = "Phần trăm giảm phải từ 0 đến 100%!";
      }
    }
    //const date = new Date();
    // if(values.beginDate < date) {
    //   errors.beginDate = "Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại!";
    // }
    if (values.beginDate > values.endDate) {
      errors.endDate = "Ngày kết thúc phải lớn hơn ngày bắt đầu!";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    if (isUpdate) {
      values.beginDate = new Date(values.beginDate);
      values.endDate = new Date(values.endDate);
      var { payload } = await dispatch(updateVoucher({ id: newVoucher.id, data: values, adminToken }));
      console.log(payload);
    } else {
      var { payload } = await dispatch(
        addVoucher({ data: values, adminToken })
        );
        console.log(payload);
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
            <Heading22>Cập nhật khuyến mãi</Heading22>
          ) : (
            <Heading22>Thêm khuyến mãi</Heading22>
          )}
        </ModalTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          validationSchema={validationSchema}
        >
          {(formik) => {
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
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="number"
                    label={
                      formik.values.discountType == "money"
                        ? "Số tiền đơn hàng tối thiểu"
                        : "Số lượng sản phẩm tối thiểu"
                    }
                    name="condition"
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="number"
                    label={
                      formik.values.discountType == "money"
                        ? "Số tiền được giảm"
                        : "Phần trăm giảm"
                    }
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
