import { Form, Formik } from 'formik';
import * as Yup from "yup"
import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { Heading16, Heading22 } from '../../../../sharedComponents/text'
import { FormContainer } from '../../LoginPage/pages/LoginPage';
import { PinkButton } from '../../../../sharedComponents/button';
import FormikControl from '../../../../sharedComponents/formikCustom/FormikControl';

const Container = styled.div`
  ${tw` flex flex-col gap-y-4 h-fit-content`}
`
function Info() {
  const initialValues = {
    email: "",
    name: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Bạn cần phải nhập trường này!")
      .email("Định dạng email chưa đúng!"),
    name: Yup.string()
      .required("Bạn cần phải nhập trường này!"),
    phone: Yup.string()
      .required("Bạn cần phải nhập trường này!")

  });
  const onSubmit = () => {

  }
  return (
    <Container>
      <Heading16>Thông tin tài khoản</Heading16>
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
                    <PinkButton type="submit">
                      Cập nhật tài khoản
                    </PinkButton>
                  </FormContainer>
                </Form>
              );
            }}
      </Formik>
    </Container>
  )
}

export default Info