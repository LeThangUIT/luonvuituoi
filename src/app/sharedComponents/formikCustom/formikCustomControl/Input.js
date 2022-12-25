import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import styled from "styled-components";
import tw from "twin.macro";

export const FormControl = styled.div`
    ${tw`flex flex-col gap-1`}
`

export const Label = styled.span`
    ${tw`

        text-[#300F19]
        font-semibold 
        text-[14px]
        leading-[17px]
    `}
`
export const BoxText = styled.input`
  ${tw` focus:outline-none w-full border border-solid border-[#EEEEEE] px-[20px] py-2 rounded-lg bg-[#FAFAFA] placeholder:text-[14px] placeholder:text-[#818181] placeholder:not-italic placeholder:font-normal placeholder:leading-[17px]`}
`;


const CustomInput = (props) => {
  const {field, form, ...rest} = props
  return (
    <BoxText {...field} {...rest}></BoxText>
  )
}

export const ErrorContainer = styled.div`
  ${tw` h-6`}
`
const Input = (props) => {
  const { label, name, ...rest} = props;
  return (
    <FormControl>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Field component={CustomInput}  id={name} name={name} {...rest}/>
      <ErrorContainer>
        <ErrorMessage name={name} component={TextError}/> 
      </ErrorContainer>
    </FormControl>
  );
};

export default Input;
