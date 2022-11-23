import { ErrorMessage, Field } from 'formik';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ErrorContainer, FormControl, Label } from './Input';
import TextError from './TextError';

const SelectField = styled.input`
${tw`border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none`}
`
  
const Select = (props) => {
    const {label, name, options, ...rest} = props
    return (
        <FormControl>
            <Label htmlFor={name}>{label}</Label>
            <Field  as="select" id={name} name={name} {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorContainer>
                <ErrorMessage name={name} component={TextError}/>
            </ErrorContainer>
        </FormControl>
    );
}

export default Select;
