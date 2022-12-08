import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import AddressApi from '../../../api/addressApi';
import { ErrorContainer, FormControl, Label } from './Input';
import TextError from './TextError';

const SelectBox = styled.select`
  ${tw` focus:outline-none w-full border border-solid border-[#EEEEEE] px-[20px] py-2 rounded-lg bg-[#FAFAFA]`}
`;
const SelectField = styled.input`
${tw`border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none`}
`
const CustomSelect = (props) => {
  const userToken = localStorage.getItem("userToken")
    const {field, form, options, setDistricts, setWards,setFee, ...rest} = props
    const {value, name, onBlur} = field
    const handleChange = async (value) => {
        form.setFieldValue(name, value)
        if(setDistricts) {
            const res = await AddressApi.getDistrict({provinceId: value, userToken})
            setDistricts(prev => [prev[0], ...res.data.data])
            form.setFieldValue("districtId", "")
            form.setFieldValue("wardId", "")
        }
        if(setWards) {
            const res = await AddressApi.getWard({districtId: value, userToken})
            setWards(prev => [prev[0], ...res.data.data])
            form.setFieldValue("wardId", "")
        }
        if(setFee) {
            const res = await AddressApi.getTransportFee({wardId: value, userToken})
            setFee(res.data.data)
        }
    }
    return (
      <SelectBox value={value} name={name} onBlur={onBlur} {...rest} onChange={(e) => handleChange(e.target.value)}> 
            {
                options.map((option, index) => {
                    return (
                        <option  key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    )
                })
            }
      </SelectBox>
    )
  }
    const DependentSelect = (props) => {
    let {label, name,...rest} = props
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

export default DependentSelect;
