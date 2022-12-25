import { ErrorMessage, Field } from "formik";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ErrorContainer, FormControl, Label } from "./Input";
import TextError from "./TextError";

const RadioCustom = styled.div`
  ${tw`flex flex-row items-center gap-2`}
`
const Radiobutton = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <FormControl>
      {label && <Label>{label}</Label>}
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <RadioCustom>
                    <input
                      className="cursor-pointer"
                      type="radio"
                      id={option.key}
                      {...field}
                      value={option.key}
                      checked={field.value == option.key}
                    ></input>
                    <label className="cursor-pointer"  htmlFor={option.key}>{option.value}</label>
                  </RadioCustom>
                </React.Fragment>
              );
            });
          }}
        </Field>
        <ErrorContainer>
          <ErrorMessage name={name} component={TextError} />
        </ErrorContainer>
    </FormControl>
  );
};

export default Radiobutton;
