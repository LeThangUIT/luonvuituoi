import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import tw from 'twin.macro'
import { PinkButton } from "../../../../sharedComponents/button";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import * as Yup from "yup";

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
    ${
        tw`
            w-1/2
            h-full
            bg-secondaryColor
            absolute
            top-0
            right-0
        `
    }
`
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
`
export const LoginFrame = styled.div`
    ${tw`
        flex 
        flex-col
        gap-4
        w-[360px]
    `}
`
export const Label = styled.span`
    ${tw`
        text-primaryColor
        font-bold
        text-3xl
        leading-9
        text-center
    `}
`
export const FormContainer = styled.div`
    ${tw`
        flex
        flex-col
        content-center
    `}

`
export const FormFrame = styled.div`
    ${tw`flex flex-col gap-1`}
`

export const FormLabel = styled.span`
    ${tw`

        text-[#300F19]
        font-semibold 
        text-[14px]
        leading-[17px]
    `}
`
export const BoxText = styled.input`
  ${tw` border border-solid border-[#EEEEEE] w-full px-[20px] py-3 rounded-lg bg-[#FAFAFA] placeholder:text-[14px] placeholder:text-[#818181] placeholder:not-italic placeholder:font-normal placeholder:leading-[17px] `}
`;

export const Navigate = styled.span`
    ${tw`
        text-[#300F19] text-[14px] text-center
    `}
`
export const Register = styled.span`
    ${tw`
        text-primaryColor text-[14px] text-center font-medium
    `}
`
const initialValues = {
    email: "",
    password:""
  };
const validationSchema = Yup.object({
    email: Yup.string()
      .required("Bạn cần phải nhập trường này!")
      .email("Định dạng email chưa đúng!"),
    password: Yup.string()
       .required("Bạn cần phải nhập trường này!")
       .min(8, 'Quá ngắn!')
        .max(50, 'Quá dài!')
  });
  
const onSubmit = (values) => console.log("Form data ", values);
export default function LoginPage() {
    return (
        <PageContainer>
            <Content>
                <LoginFrame>
                    <Label>Đăng nhập</Label>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(formik) => {
                            return(
                                <Form>
                                    <FormContainer>
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
                                            label="Password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                        />
                                        <PinkButton type="submit">Đăng nhập</PinkButton>
                                    </FormContainer>
                                </Form>
                            )
                        }}
                    </Formik>
                </LoginFrame>
                <Navigate>Bạn chưa có tài khoản? <Register>Đăng ký ngay</Register></Navigate>
            </Content>
            <RightSection></RightSection>
        </PageContainer>
    )
}


