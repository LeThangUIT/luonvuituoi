import React from "react";
import { ErrorMessage, Field } from "formik";
import DateView from 'react-datepicker'
import TextError from "./TextError";
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorContainer, FormControl, Label } from "./Input";

const Datetimepicker = (props) => {
  const { label, name, options, ...rest } = props;
  return (
      <FormControl>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Field name={name}>
          {({ form, field }) => {
            const { setFieldValue } = form;
            const { value } = field;
            return (
              <DateView
                placeholderText="dd/MM/yyyy"
                dateFormat="dd/MM/yyyy"
                className="focus:outline-none w-full border border-solid border-[#EEEEEE] px-[20px] py-2 rounded-lg bg-[#FAFAFA] placeholder:text-[14px] placeholder:text-[#818181] placeholder:not-italic placeholder:font-normal placeholder:leading-[17px]"
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={val =>{setFieldValue(name, val)}}
              />
            );
          }}
        </Field>
        <ErrorContainer>
          <ErrorMessage name={name} component={TextError} />
        </ErrorContainer>
      </FormControl>
  );
};

export default Datetimepicker;
