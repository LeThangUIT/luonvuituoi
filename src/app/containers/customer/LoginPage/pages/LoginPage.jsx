import { Form, Formik } from "formik";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import * as Yup from "yup";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { PinkButton } from "../../../../sharedComponents/button";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, login } from "../../Auth/authSlice";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import VerifyEmail from "../../RegisterPage/components/VerifyEmail";
import AuthApi from "../../../../api/authApi";
import { Logo } from "../../../../sharedComponents/header/logo";

export const PageContainer = styled.div`
  ${tw`
        flex
        flex-col
        w-full
        h-screen
        relative
        bg-white
    `}
`;
export const RightSection = styled.div`
  ${tw`
            w-1/2
            h-full
            bg-secondaryColor
            absolute
            top-0
            right-0
        `}
`;
export const Content = styled.div`
  transform: translate(0, -50%);
  ${tw`
        absolute
        top-1/2
        left-[160px]
        flex
        flex-col
        content-center
        items-center
        gap-4
    `}
`;
export const LoginFrame = styled.div`
  ${tw`
        flex 
        flex-col
        gap-4
        w-[360px]
    `}
`;
export const Label = styled.span`
  ${tw`
        text-primaryColor
        font-bold
        text-3xl
        leading-9
        text-center
    `}
`;
export const FormContainer = styled.div`
  ${tw`
        flex
        flex-col
        content-center
    `}
`;
export const FormFrame = styled.div`
  ${tw`flex flex-col gap-1`}
`;

export const FormLabel = styled.span`
  ${tw`

        text-[#300F19]
        font-semibold 
        text-[14px]
        leading-[17px]
    `}
`;
export const BoxText = styled.input`
  ${tw` border border-solid border-[#EEEEEE] w-full px-[20px] py-3 rounded-lg bg-[#FAFAFA] placeholder:text-[14px] placeholder:text-[#818181] placeholder:not-italic placeholder:font-normal placeholder:leading-[17px] `}
`;

export const Navigate = styled.span`
  ${tw`
        text-[#300F19] text-[14px] text-center
    `}
`;
export const Register = styled.span`
  ${tw`
        text-primaryColor text-[14px] text-center font-medium hover:cursor-pointer hover:opacity-75
    `}
`;
const FacebookButton = styled.button`
  ${tw`
        w-full box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-[#2374E1] rounded-lg  border hover:opacity-80
        text-white not-italic font-semibold text-sm leading-[17px]
        disabled:cursor-wait disabled:opacity-50
    `}
`;
const GoogleButton = styled.button`
  ${tw`
        w-full box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-[#DD4B39] rounded-lg  border hover:opacity-80
        text-white not-italic font-semibold text-sm leading-[17px]
        disabled:cursor-wait disabled:opacity-50
    `}
`;
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Bạn cần phải nhập trường này!")
    .email("Định dạng email chưa đúng!"),
  password: Yup.string()
    .required("Bạn cần phải nhập trường này!")
    .min(0, "Quá ngắn!")
    .max(50, "Quá dài!"),
});

export default function LoginPage() {
  const { pathname } = useLocation();
  const pathBeforeLogin = localStorage.getItem("currentPath")
  const deviceId = uuidv4();
  const { loading } = useSelector((state) => state.auth);
  const userToken = localStorage.getItem("userToken")
  const adminToken = localStorage.getItem("adminToken")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const onSubmit = async (values) => {
    setEmailValue(values.email);
    const data = { deviceId, ...values };
    if (pathname === "/login") {
      var res = await dispatch(login(data));
      if (!res.payload.success) {
        if (res.payload.message === "Account is not activated") {
          setOpenModal(true);
        }
        toast.error(res.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      var res = await dispatch(adminLogin(data));
      if (!res.payload.success) {
        toast.error(res.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const loginWithFB = async () => {
    try {
      const res = await AuthApi.socialLogin("facebook");
      const url = res.data.data;
      window.location.href = url;
    } catch (e) {}
  };
  const loginWithGG = async () => {
    try {
      const res = await AuthApi.socialLogin("google");
      const url = res.data.data;
      window.location.href = url;
    } catch (e) {}
  };
  useEffect(() => {
    console.log(userToken)
    if (userToken && pathname === "/login") {
      navigate(pathBeforeLogin);
    }
    if (adminToken && pathname === "/adminLogin") {
      navigate("/admin");
    }
  }, [navigate, userToken, adminToken]);
  return (
    <PageContainer>
      <div onClick={() => navigate("/")}>
        <Logo></Logo>
      </div>
      <Content>
        <LoginFrame>
          {pathname === "/login" ? (
            <Label>Đăng nhập</Label>
          ) : (
            <Label>Admin, Đăng nhập</Label>
          )}
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
                      label="Email"
                      type="email"
                      name="email"
                    />
                    <FormikControl
                      control="input"
                      label="Password"
                      type="password"
                      name="password"
                    />
                    <PinkButton disabled={loading} type="submit">
                      Đăng nhập
                    </PinkButton>
                  </FormContainer>
                </Form>
              );
            }}
          </Formik>
        </LoginFrame>
        <Navigate>
          Bạn chưa có tài khoản?{" "}
          <Register onClick={() => navigate("/register", { replace: true })}>
            Đăng ký ngay
          </Register>
        </Navigate>
        {pathname === "/login" && (
          <>
            <span>Hoặc</span>
            <FacebookButton onClick={() => loginWithFB()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="17px"
                height="17px"
                fill="white"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
              Đăng nhập với Facebook
            </FacebookButton>
            <GoogleButton onClick={() => loginWithGG()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
                width="17px"
                height="17px"
                fill="white"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
              </svg>
              Đăng nhập với Google
            </GoogleButton>
          </>
        )}
      </Content>
      <RightSection></RightSection>
      {openModal && (
        <VerifyEmail closeModal={setOpenModal} email={emailValue} />
      )}
    </PageContainer>
  );
}
