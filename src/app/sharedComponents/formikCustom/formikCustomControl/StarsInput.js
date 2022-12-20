import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { StarIcon } from "../../icon/starIcon";
import { ErrorContainer, FormControl, Label } from "./Input";
import TextError from "./TextError";


const StarGroup = styled.div`
${tw` w-full flex flex-row gap-4 justify-center`}
`
const CustomStars = (props) => {
  const {field, form, ...rest} = props
  const [count, setCount] = useState(0)
  const setValue = (number) => {
    setCount(number)
    form.setFieldValue(field.name , number)
  }
  return (
    <StarGroup>
      {
        [...Array(5)].map((i, index) => (
          <div onClick={() => setValue(index+1)}>
            <StarIcon size="30" color={index < count ? "#F0A500" : "#818181"}></StarIcon>
          </div>
          ))
      }
    </StarGroup>
  )
}

const StarsInput = (props) => {
  let {label, name, ...rest} = props
  return (
    <FormControl>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Field component={CustomStars} id={name} name={name} {...rest}>
        </Field>
        <ErrorContainer>
            <ErrorMessage name={name} component={TextError}/>
        </ErrorContainer>
    </FormControl>
);
}

export default StarsInput;
