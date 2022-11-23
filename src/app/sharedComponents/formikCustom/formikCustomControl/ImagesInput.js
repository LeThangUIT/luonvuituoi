import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import "../form.css";
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

// const Session = styled.div`
//   ${tw` rounded-lg border border-dashed`}
// `
const Labell = styled.label`
  ${tw` p-4 rounded-lg border border-dashed`}
`;
const Input = styled.input`
  ${tw` hidden`}
`;
const ImageGroup = styled.div`
  ${tw` w-full flex flex-row gap-4 flex-wrap`}
`;
const ImageBox = styled.div`
  ${tw`
      h-[175px] rounded-lg overflow-hidden flex relative
  `}
`;
const DeleteIcon = styled.span`
  ${tw` absolute top-2 right-2`}
`;
const Image = styled.img`
  ${tw`
     object-cover w-full h-full 
  `}
`;
const MyInput = ({ form, field, ...props }) => {
  const [images, setImages] = useState([]);
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((prevImages) => prevImages.concat(imagesArray));
  };
  const onDeleteImage = (url) => {
    URL.revokeObjectURL(url)
    setImages(prevImage => prevImage.filter((item) => item !== url))
  }
  useEffect(() => {
    form.setFieldValue(field.name,images);
  }, [images])
  
  return (
    <>
      <Labell>
        + Thêm ảnh{" "}
        <Input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          // onChange={(event) => {
          //     form.setFieldValue(field.name, event.currentTarget.files);
          // }}
          onChange={onSelectFile}
        ></Input>
      </Labell>
      {images && (
        <ImageGroup>
          {images.map((url, index) => {
            return (
              <ImageBox key={index}>
                <Image src={url}></Image>{" "}
                <DeleteIcon
                  onClick={() => onDeleteImage(url)}
                >
                  x
                </DeleteIcon>
              </ImageBox>
            );
          })}
        </ImageGroup>
      )}
    </>
  );
};

const ImagesInput = (props) => {
  const { label, name, ...rest } = props;
  return (
    <FormControl>
      <Label htmlFor={name}>{label}</Label>
      <Field id={name} name={name} {...rest} component={MyInput}></Field>
      <ErrorContainer>
        <ErrorMessage name={name} component={TextError} />
      </ErrorContainer>
    </FormControl>
  );
};
export default ImagesInput;
