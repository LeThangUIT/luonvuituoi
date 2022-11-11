import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import {
  ButtonClose,
  ModalBackground,
  ModalContainer,
  ModalFooter,
  ModalTitle,
} from "../../../../sharedComponents/modal";
import { Heading16, Heading22 } from "../../../../sharedComponents/text";
import { hideProductModal } from "../productSlice";
import styled from "styled-components";
import tw from "twin.macro";
import { Form, Formik } from "formik";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import { PinkButton } from "../../../../sharedComponents/button";
import Input, { BoxText } from "../../../../sharedComponents/formikCustom/formikCustomControl/Input";
import { Label } from "../../../../sharedComponents/formikCustom/formikCustomControl/ImagesInput";
import { ButtonGroup } from "../../../customer/DetailPage/pages/DetailPage";
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow } from "../../../../sharedComponents/table";

const Frame = styled.div`
  ${tw` p-5 rounded-lg bg-white border border-black flex flex-col gap-y-4 `}
`;
const FrameHeader = styled.div`
  ${tw` flex flex-row gap-x-2`}
`;
const FrameBody = styled.div`
  ${tw` flex flex-col gap-x-4`}
`;
const FlexFrame = styled.div`
  ${tw` flex flex-row gap-x-3 items-center justify-between`}
`;
const BoxValue = styled.div`
  ${tw` flex flex-row gap-x-2 items-center justify-between 
    py-2 px-5 border border-solid border-[#EEEEEE] rounded-lg text-[14px]  text-[ #300F19] font-normal leading-[17px] hover:opacity-90
  `}
`;
function ProductModal() {
  const { isUpdate, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideProductModal());
  };

  const initialValues = {
    name: "",
    description: "",
    images: "",
    price: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn cần phải nhập trường này!"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [options, setOptions] = useState([
    {
      Key: "",
      Items: [],
    },
  ]);
  const [variants, setVariants] = useState([])
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAddOption = () => {
    const newOption = {
      Key: "",
      Items: [],
    };
    setOptions((prevState) => [...prevState, newOption]);
  };

  const handleOptionChange = (event, index) => {
    options[index].Key = event.target.value;
    setOptions(options);
  };
  const handleDeleteOption = (index) => {
    options.splice(index, 1);
    setOptions([...options]);
    if (options.length == 0) {
      setOptions([
        {
          Key: "",
          Items: [],
        },
      ])
      setIsChecked(false);
    }
  };

  useEffect(() => {
    const valueVariants = [];
    for (const option of options) {
      for ( const item of option.Items) {
        if(options.length == 1) {
          const optionValue = {
            OptionValues: [
              {
                Option: option.Key,
                Value: item
              }
            ]
          }
          valueVariants.push(optionValue)
        }
        else {
          for(const variant of variants) {
            const newOptionValue = {
              Option: option.Key,
              Value: item,
            };
            valueVariants.push({
              OptionValues: [newOptionValue, ...variant.OptionValues]
            })
          }
        }
      }
    }
    console.log(valueVariants)
    setVariants(valueVariants)
  }, [options])
  
  const handleValueChange = (event, index) => {
    if (event.keyCode == 13) {
      options[index].Items.push(event.target.value);
      event.target.value = "";
      setOptions([...options]);
    }
  };
  const handleDeleteValue = (index, indexValue) => {
    options[index].Items.splice(indexValue, 1);
    setOptions([...options]);
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <ButtonClose onClick={() => handleClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </ButtonClose>

        <ModalTitle>
          {isUpdate ? (
            <Heading22>Cập nhật sản phẩm</Heading22>
          ) : (
            <Heading22>Thêm sản phẩm</Heading22>
          )}
        </ModalTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <FormContainer>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Tên sản phẩm"
                    name="name"
                    // onChange={formik.handleChange}
                    // value={formik.values.name}
                    // onBlur={formik.handleBlur}
                  ></FormikControl>
                  <FormikControl
                    control="editorInput"
                    type="text"
                    label="Mô tả"
                    name="description"
                    // onChange={formik.handleChange}
                    // value={formik.values.description}
                    // onBlur={formik.handleBlur}
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Giá sản phẩm"
                    name="price"
                    // onChange={formik.handleChange}
                    // value={formik.values.price}
                    // onBlur={formik.handleBlur}
                  ></FormikControl>
                  <FormikControl
                    control="imagesInput"
                    type="file"
                    label="Thêm hình ảnh"
                    name="images"
                    // onChange={formik.handleChange}
                    // value={formik.values.images}
                    // onBlur={formik.handleBlur}
                  ></FormikControl>
                  <Frame>
                    <FrameHeader>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleOnChange}
                      ></input>
                      <Heading16>Tùy chọn</Heading16>
                    </FrameHeader>
                    {isChecked && (
                      <div>
                        {options.map((item, index) => {
                          return (
                            // <div key={index}>
                            //   <FormikControl
                            //     control="input"
                            //     type="text"
                            //     label="Tên tùy chọn"
                            //     name={item.Key}
                            //   ></FormikControl>
                            // </div>
                            <FrameBody key={index}>
                              <Label> Tên tùy chọn</Label>
                              <FlexFrame>
                                <BoxText
                                  onChange={(event) =>
                                    handleOptionChange(event, index)
                                  }
                                ></BoxText>
                                <span onClick={() => handleDeleteOption(index)}>
                                  x
                                </span>
                              </FlexFrame>
                              <Label> Giá trị tùy chọn</Label>
                              <BoxText
                                onKeyDown={(event) =>
                                  handleValueChange(event, index)
                                }
                              ></BoxText>
                              <ButtonGroup>
                                {item.Items.map((value, indexValue) => {
                                  return (
                                    <BoxValue>
                                      <span key={indexValue}>{value}</span>
                                      <span
                                        onClick={() =>
                                          handleDeleteValue(index, indexValue)
                                        }
                                      >
                                        x
                                      </span>
                                    </BoxValue>
                                  );
                                })}
                              </ButtonGroup>
                            </FrameBody>
                          );
                        })}
                        <span onClick={handleAddOption}>Thêm tùy chọn</span>
                      </div>
                    )}
                  </Frame>
                  {options[0].Items.length > 0 &&
                  <Frame>
                    {console.log(variants)}
                      <Heading16>Biến thể</Heading16>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeading>Biến thể</TableHeading>
                            <TableHeading>Số lượng</TableHeading>
                            {/* <TableHeading>Xóa</TableHeading> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableData>Xanh / M</TableData>
                            <TableData>
                              <BoxText></BoxText>
                            </TableData>
                          </TableRow>
                        </TableBody>
                      </Table>
                     </Frame>
                  }

                  <ModalFooter>
                    <PinkButton disabled={loading} type="submit">
                      Xác nhận
                    </PinkButton>
                  </ModalFooter>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ProductModal;
