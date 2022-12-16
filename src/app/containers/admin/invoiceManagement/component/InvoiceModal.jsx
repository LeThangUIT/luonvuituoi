import React from "react";
import * as Yup from "yup";
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
import { hideInvoiceModal, updateInvoice } from "../InvoiceSlice";

function InvoiceModal() {
  const adminToken = localStorage.getItem("adminToken");
  const { invoice, loading } = useSelector((state) => state.invoice);
  let initialValues = {
    status: invoice.status,
  };  
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    console.log(values)
    var { payload } = await dispatch(
      updateInvoice({ invoice: { id: invoice.id, ...values }, adminToken })
      );
      console.log(payload)
    if (!payload.res.data.success) {
      dispatch(hideInvoiceModal());
      toast.error(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch(hideInvoiceModal());
      toast.success(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleClose = () => {
    dispatch(hideInvoiceModal());
  };
  const statusOptions = [
    {
      key: 0,
      value: "Chờ xử lý",
    },
    {
      key: 1,
      value: "Chuẩn bị giao",
    },
    {
      key: 2,
      value: "Đang giao",
    },
    {
      key: 3,
      value: "Đã giao",
    },
    {
      key: 4,
      value: "Đã hủy",
    },
  ];
  return (
    <ModalBackground>
      <ModalContainer>
        <ButtonClose onClick={() => handleClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </ButtonClose>

        <ModalTitle>
          <Heading22>Cập nhật trạng thái</Heading22>
        </ModalTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <FormContainer>
                  <FormikControl
                    control="radio"
                    label="Trạng thái giao hàng"
                    name="status"
                    options={statusOptions}
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

export default InvoiceModal;
