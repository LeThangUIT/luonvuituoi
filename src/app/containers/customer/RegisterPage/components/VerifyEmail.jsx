import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { PinkButton } from "../../../../sharedComponents/button";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { Heading22, LightText14 } from "../../../../sharedComponents/text";
import { verify } from "../../Auth/authSlice";
import { FormContainer } from "../../LoginPage/pages/LoginPage";
import { toast } from 'react-toastify';

const ModalBackground = styled.div`
  ${tw` w-screen h-screen bg-[rgba(200, 200, 200, 0.7)] fixed flex justify-center items-center`}
`;
const ModalContainer = styled.div`
  ${tw` max-w-xs relative rounded-xl bg-white flex flex-col gap-4 p-6`}
`;
const ButtonClose = styled.div`
  ${tw` absolute z-10 w-3  top-4 right-4`}
`;
const ModalTitle = styled.div`
  ${tw` mt-2 flex justify-center`}
`;
const ModalFooter = styled.div``;
const initialValues = {
    codeVerify: "",
};
const validationSchema = Yup.object({
    codeVerify: Yup.number().typeError('Vui lòng chi nhập kí tự số')
    .required("Bạn cần phải nhập trường này!")
       
  });

function VerifyEmail({ closeModal, email }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading} = useSelector((state) => state.auth)

    const onSubmit = async (values) => {
        const data = { email, ...values };
        const res = await dispatch(verify(data));
        if(!res.payload.success){
            toast.error(res.payload.message, {
              position: toast.POSITION.TOP_RIGHT
          });
        }
        else {
            toast.success(res.payload.message, {
                position: toast.POSITION.TOP_RIGHT
              });
            navigate("/login")
        }
    };
    
    return (
        <ModalBackground>
            <ModalContainer>
                <ButtonClose onClick={() => closeModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                    </svg>
                </ButtonClose>
                        <ModalTitle>
                            <Heading22>Xác thực email của bạn</Heading22>
                        </ModalTitle>
                        <LightText14>
                            Xin hãy nhập mã xác thực được gửi đến {email}
                        </LightText14>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                            {(formik) => {
                                return (
                                    <Form>
                                        <FormContainer>
                                            <FormikControl
                                                control="input"
                                                type="text"
                                                label=""
                                                name="codeVerify"
                                                onChange={formik.handleChange}
                                                value={formik.values.codeVerify}
                                                onBlur={formik.handleBlur}
                                            ></FormikControl>
                                            <ModalFooter>
                                                <PinkButton disabled={loading} type="submit">Xác thực</PinkButton>
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

export default VerifyEmail;
