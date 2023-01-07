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
import {
  addCategory,
  hideCategoryModal,
  updateCategory,
} from "../categorySlice";
import { Form, Formik } from "formik";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { PinkButton } from "../../../../sharedComponents/button";
import { toast } from "react-toastify";

function CategoryModal() {
  const adminToken = localStorage.getItem("adminToken");
  const { isUpdate, newCategory, loading } = useSelector(
    (state) => state.category
  );
  let initialValues = {};
  if (isUpdate && newCategory) {
    initialValues = {
      name: newCategory.name,
    };
  } else {
    initialValues = {
      name: "",
    };
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn cần phải nhập trường này!"),
  });

  const onSubmit = async (values) => {
    if (isUpdate) {
      var { payload } = await dispatch(
        updateCategory({
          category: { id: newCategory.id, ...values },
          adminToken,
        })
      );
    } else {
        var {payload} = await dispatch(
          addCategory({ data: values, adminToken })
        );
    }
    if (!payload.res.data.success) {
      dispatch(hideCategoryModal());
      toast.error(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch(hideCategoryModal());
      toast.success(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideCategoryModal());
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
            <Heading22>Cập nhật danh mục</Heading22>
          ) : (
            <Heading22>Thêm danh mục</Heading22>
          )}
        </ModalTitle>
        <Formik
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
                    label=""
                    name="name"
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

export default CategoryModal;
