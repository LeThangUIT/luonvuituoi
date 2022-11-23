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
import { addProduct, hideProductModal } from "../productSlice";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

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
  const adminToken = localStorage.getItem("adminToken")
  const { isUpdate, loading } = useSelector((state) => state.product);
  const {listCategories} = useSelector((state) => state.category)
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideProductModal());
  };

  const initialValues = {
    name: "",
    categoryId: "",
    price: "",
    quantity: 0,
    details: "",
    description: "",
    images: [],
    imageMain: "",
    imageDescription: ""
  };
  const validationSchema = Yup.object({
    // name: Yup.string().required("Bạn cần phải nhập trường này!"),
  });
  
  const onSubmit = async (values) => {
    console.log("first")
    if(values.images.length != 4) {
      //ko cho them
    }
    else {
      await values.images.map(async (url, index) => {
        let blob = await fetch(url).then(r => r.blob()).catch((error) => console.log(error));
        const imageRef = ref(storage, "image " + values.name + index);
        uploadBytes(imageRef, blob)
        .then(() => {
          getDownloadURL(imageRef)
            .then(async (url) => {
              if(index == 0) {
                values.imageMain = url
              }
              else {
                values.imageDescription += `${url} ` 
              }
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
      })
      const {images, ...rest} = values
      let data = {variants,options, ...rest}
      console.log(data)
      dispatch(addProduct({data, adminToken}))
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const [options, setOptions] = useState([
    {
      key: "",
      items: [],
    },
  ]);
  let [variants, setVariants] = useState([])
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAddOption = () => {
    const newOption = {
      key: "",
      items: [],
    };
    setOptions((prevState) => [...prevState, newOption]);
  };

  const handleOptionChange = (event, index) => {
    options[index].key = event.target.value;
    setOptions(options);
  };
  const handleDeleteOption = (index) => {
    options.splice(index, 1);
    setOptions([...options]);
    if (options.length == 0) {
      setOptions([
        {
          key: "",
          items: [],
        },
      ])
      setIsChecked(false);
    }
  };
  
  useEffect(() => {
    let initialVariants = []
    let valueVariantLoop = []
    for (const option of options) {
      if(valueVariantLoop.length == 0) {
        for(const item of option.items) {
          const newVariantValue = {
            optionValues: [
              {
                option: option.key,
                value: item
              }
            ],
            quantity: 0,
            price: 0
          }
          initialVariants.push(newVariantValue)
        }
        valueVariantLoop = initialVariants
        initialVariants = []
      }
      else {
        for(const item of option.items) {
          const newOptionValues = {
                option: option.key,
                value: item
          }
          valueVariantLoop.forEach((variant, index) => {
            let arrayValue = [...variant.optionValues]
            arrayValue.push(newOptionValues)
            initialVariants.push({
              optionValues: [...arrayValue],
              quantity: 0,
              price: 0
            })
          })
        }
        valueVariantLoop = initialVariants
        initialVariants = []
      }
    }
    setVariants(valueVariantLoop)
  }, [options])
  
  const handleValueChange = (event, index) => {
    if (event.keyCode == 13) {
      options[index].items.push(event.target.value);
      event.target.value = "";
      setOptions([...options]);
    }
  };
  const handleDeleteValue = (index, indexValue) => {
    options[index].items.splice(indexValue, 1);
    setOptions([...options]);
  };

  const handleChangeQuantity = (event, index) => {
    variants[index].quantity = event.target.value;
    setVariants([...variants])
  }
  const handleChangePrice = (event, index) => {
    variants[index].price = event.target.value;
    setVariants([...variants])
  }
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
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  ></FormikControl>
                   <FormikControl
                      control="select"
                      label="Danh mục"
                      name="categoryId"
                      options={listCategories}
                      // onChange={formik.handleChange}
                      // value={formik.values.categoryId}
                      // onBlur={formik.handleBlur}
                    />
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
                    control="editorInput"
                    type="text"
                    label="Chi tiết"
                    name="details"
                    // onChange={formik.handleChange}
                    // value={formik.values.description}
                    // onBlur={formik.handleBlur}
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Giá sản phẩm"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Số lượng"
                    name="quantity"
                    onChange={formik.handleChange}
                    value={formik.values.quantity}
                    onBlur={formik.handleBlur}
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
                                {item.items.map((value, indexValue) => {
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
                  {options[0].items.length > 0 &&
                  <Frame>
                      <Heading16>Biến thể</Heading16>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableHeading>Biến thể</TableHeading>
                            <TableHeading>Giá</TableHeading>
                            <TableHeading>Số lượng</TableHeading>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {variants.map((item, index) => {
                            return (
                              <TableRow key={index}>
                                <TableData>
                                  {item.optionValues.map((name, index) => {
                                      if(index == 0) {
                                        return(
                                          <Heading16>{name.value}</Heading16>
                                        )
                                      }
                                      else {
                                        return (
                                          <Heading16> / {name.value}</Heading16>
                                        )
                                      }
                                  })}
                                </TableData>
                                <TableData>
                                  <BoxText value={item.price} onChange={(event) => handleChangePrice(event, index)}></BoxText>
                                </TableData>
                                <TableData>
                                  <BoxText value={item.quantity} onChange={(event) => handleChangeQuantity(event, index)}></BoxText>
                                </TableData>
                              </TableRow>
                            )
                          })}
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
