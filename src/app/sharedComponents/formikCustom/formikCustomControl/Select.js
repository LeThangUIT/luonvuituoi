import { ErrorMessage, Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ErrorContainer, FormControl, Label } from './Input';
import TextError from './TextError';

const SelectBox = styled.select`
  ${tw` focus:outline-none w-full border border-solid border-[#EEEEEE] px-[20px] py-2 rounded-lg bg-[#FAFAFA]`}
`;
const SelectField = styled.option`
${tw`border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none`}
`
const CustomSelect = (props) => {
    const {field, form,options, ...rest} = props
    return (
      <SelectBox {...field} {...rest}>
            {
                options?.map((option, index) => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    )
                })
                }
      </SelectBox>
    )
}
    const Select = (props) => {
    let {label, name, ...rest} = props
    return (
        <FormControl>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Field component={CustomSelect} as="select" id={name} name={name} {...rest}>
            
            </Field>
            <ErrorContainer>
                <ErrorMessage name={name} component={TextError}/>
            </ErrorContainer>
        </FormControl>
    );
}

export default Select;
