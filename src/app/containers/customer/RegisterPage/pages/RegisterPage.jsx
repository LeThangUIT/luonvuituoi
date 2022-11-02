import { Form, Formik } from "formik";
import React from 'react';
import { useEffect, useState } from "react";
import { PinkButton } from "../../../../sharedComponents/button";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import * as Yup from "yup";
import { toast } from 'react-toastify';

import {
  Content,
  FormContainer,
  Label,
  LoginFrame,
  Navigate,
  PageContainer,
  Register as Login,
  RightSection,
} from "../../LoginPage/pages/LoginPage";
import { useNavigate } from "react-router-dom";
import VerifyEmail from "../components/VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Auth/authSlice";

const initialValues = {
  name: "",
  password: "",
  passwordConfirmation: "",
  email: "",
  phone: "",
};
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const validationSchema = Yup.object({
  name: Yup.string().required("Bạn cần phải nhập trường này!"),
  email: Yup.string()
    .required("Bạn cần phải nhập trường này!")
    .email("Định dạng email chưa đúng!"),
  phone: Yup.string()
    .required("Bạn cần phải nhập trường này!")
    .matches(phoneRegExp, "Số điện thoại không đúng!"),
  password: Yup.string()
    .required("Bạn cần phải nhập trường này!")
    .min(0, "Quá ngắn!")
    .max(50, "Quá dài!"),
  passwordConfirmation: Yup.string()
    .required("Bạn cần phải nhập trường này!")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp!"),
});

export default function RegisterPage() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  const dispatch = useDispatch()
  const {userToken, loading} = useSelector((state) => state.auth)
  const onSubmit = async (values) => {
    setEmailValue(values.email)
    const res = await dispatch(register(values))
    if(!res.payload.success){
      console.log(res.payload.message)
      toast.error(res.payload.message, {
        position: toast.POSITION.TOP_RIGHT
    })
  }
    else {
      toast.success(res.payload.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setOpenModal(true)
    }
  }

  useEffect(() => {
    if (userToken) {
      navigate("/")
    }
  }, [navigate, userToken])
  
  return (
    <PageContainer>
    <Content>
      <LoginFrame>
        <Label>Đăng ký</Label>
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
                    label="Họ và tên"
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
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Nhập lại mật khẩu"
                    name="passwordConfirmation"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
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
                  <PinkButton disabled={loading} type="submit">Đăng ký</PinkButton>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </LoginFrame>
      <Navigate>
        Bạn đã có tài khoản? <Login onClick={() => navigate("/login", {replace: true})}>Đăng nhập ngay</Login>
      </Navigate>
    </Content>
    <RightSection></RightSection>
      {openModal && <VerifyEmail closeModal={setOpenModal} email={emailValue}/>}
  </PageContainer>
   
  );
  }
