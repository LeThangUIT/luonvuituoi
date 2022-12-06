import { ErrorMessage, Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ErrorContainer, FormControl, Label } from './Input';
import TextError from './TextError';

const SelectBox = styled(Field)`
  ${tw` focus:outline-none w-full border border-solid border-[#EEEEEE] px-[20px] py-2 rounded-lg bg-[#FAFAFA]`}
`;
const SelectField = styled.input`
${tw`border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none`}
`
const CustomSelect = (props) => {
    const {field, form, ...rest} = props
    return (
      <SelectBox {...field} {...rest}>
      </SelectBox>
    )
  }
    const Select = (props) => {
    let {label, name, options, ...rest} = props
    return (
        <FormControl>
            {label && <Label htmlFor={name}>{label}</Label>}
            <SelectBox as="select" id={name} name={name} {...rest}>
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
            <ErrorContainer>
                <ErrorMessage name={name} component={TextError}/>
            </ErrorContainer>
        </FormControl>
    );
}

export default Select;
