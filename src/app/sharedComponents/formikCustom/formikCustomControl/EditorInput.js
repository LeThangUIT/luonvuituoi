import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextError from "./TextError";
import styled from "styled-components";
import tw from "twin.macro";

export const FormControl = styled.div`
  ${tw`flex flex-col gap-1`}
`;

export const Label = styled.span`
  ${tw`

        text-[#300F19]
        font-semibold 
        text-[14px]
        leading-[17px]
    `}
`;
const ErrorContainer = styled.div`
  ${tw` h-7`}
`;
const MyInput = ({form, field, ...props}) => {
  // const {value} = field;
  const {setFieldValue} = form
  return (
    <CKEditor
          // {...field}
          // {...props}
          data = {field.value}    
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = (editor.getData());
            setFieldValue(field.name , data)
          }}
    >
    </CKEditor>
  );
};

const EditorInput = (props) => {
  const { label, name, ...rest } = props;
  return (
    <FormControl>
      <Label htmlFor={name}>{label}</Label>
      <Field id={name} name={name} {...rest} component={MyInput}>
      </Field>
      <ErrorContainer>
        <ErrorMessage name={name} component={TextError} />
      </ErrorContainer>
    </FormControl>
  );
};

export default EditorInput;
