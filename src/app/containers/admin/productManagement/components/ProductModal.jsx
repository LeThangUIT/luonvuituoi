import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { UilTimes} from "@iconscout/react-unicons";

import { useDispatch, useSelector } from "react-redux";
import {
  ButtonClose,
  ModalBackground,
  ModalContainer,
  ModalFooter,
  ModalTitle,
} from "../../../../sharedComponents/modal";
import { Heading16, Heading22 } from "../../../../sharedComponents/text";
import { addProduct, hideProductModal, setLoading } from "../productSlice";
import styled from "styled-components";
import tw from "twin.macro";
import { Form, Formik } from "formik";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import { FormContainer } from "../../../customer/LoginPage/pages/LoginPage";
import { PinkButton } from "../../../../sharedComponents/button";
import Input, {
  BoxText,
} from "../../../../sharedComponents/formikCustom/formikCustomControl/Input";
import { Label } from "../../../../sharedComponents/formikCustom/formikCustomControl/ImagesInput";
import { ButtonGroup } from "../../../customer/DetailPage/pages/DetailPage";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from "../../../../sharedComponents/table";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

const Frame = styled.div`
  ${tw` p-5 mb-8 rounded-lg bg-white border border-black flex flex-col gap-y-4 `}
`;
const FrameHeader = styled.div`
  ${tw` flex flex-row gap-x-2`}
`;
const FrameBody = styled.div`
  ${tw` relative flex flex-col gap-y-4 border border-solid rounded-lg p-4 mb-2 shadow-sm`}
`;
const FlexCol = styled.div`
  ${tw` flex flex-col gap-y-1 justify-between`}
`;
const FlexRow = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
const AddOptionBtn = styled.span`
  ${tw` mt-4 p-2 hover:cursor-pointer hover:bg-gray-100 rounded-lg`}
`
const BoxValue = styled.div`
  ${tw` flex flex-row gap-x-2 items-center justify-between 
    py-2 px-5 border border-solid border-[#EEEEEE] rounded-lg text-[14px]  text-[ #300F19] font-normal leading-[17px] hover:opacity-90 hover:cursor-pointer
  `}
`;

const DeleteIcon = styled(UilTimes)`
  ${tw` absolute top-2 right-2 hover:cursor-pointer hover:bg-gray-50 rounded-full`}
`
function ProductModal() {
  const adminToken = localStorage.getItem("adminToken");
  const { loading } = useSelector((state) => state.product);
  const { listCategories } = useSelector((state) => state.category);
  let listCate = [{id: "", name: "Chọn danh mục"}, ...listCategories?.items]
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
    imageDescription: "",
  };
  const validationSchema = Yup.object({
    categoryId: Yup.string().required("Bạn cần phải chọn trường này!"),
    details: Yup.string().required("Bạn cần phải nhập trường này!"),
  });

  const onSubmit = async (values) => {
    dispatch(setLoading());
    if (values.images.length != 4) {
      //ko cho them
    } else {
      for (let i = 0; i < values.images.length; i++) {
        let blob = await fetch(values.images[i])
          .then((r) => r.blob())
          .catch((error) => console.log(error));
        const imageRef = ref(storage, "image " + values.name + i);
        await uploadBytes(imageRef, blob);
        let URL = await getDownloadURL(imageRef);
        if (i == 0) {
          values.imageMain = URL;
        } else {
          values.imageDescription += `${URL} `;
        }
      }
      const { images, ...rest } = values;
      let data
      if(isChecked) {
         data = { variants, options, ...rest };
      }
      else {
         data = rest
      }
      console.log(data)
      dispatch(addProduct({ data, adminToken }));
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const [options, setOptions] = useState([
    {
      key: "",
      items: [],
    },
  ]);
  let [variants, setVariants] = useState([]);
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
      ]);
      setIsChecked(false);
    }
  };

  useEffect(() => {
    let initialVariants = [];
    let valueVariantLoop = [];
    for (const option of options) {
      if (valueVariantLoop.length == 0) {
        for (const item of option.items) {
          const newVariantValue = {
            optionValues: [
              {
                option: option.key,
                value: item,
              },
            ],
            quantity: 0,
            price: 0,
          };
          initialVariants.push(newVariantValue);
        }
        valueVariantLoop = initialVariants;
        initialVariants = [];
      } else {
        for (const item of option.items) {
          const newOptionValues = {
            option: option.key,
            value: item,
          };
          valueVariantLoop.forEach((variant, index) => {
            let arrayValue = [...variant.optionValues];
            arrayValue.push(newOptionValues);
            initialVariants.push({
              optionValues: [...arrayValue],
              quantity: 0,
              price: 0,
            });
          });
        }
        valueVariantLoop = initialVariants;
        initialVariants = [];
      }
    }
    setVariants(valueVariantLoop);
  }, [options]);

  const handleValueChange = (event, index) => {
    if (event.keyCode == 13) {
      options[index].items.push(event.target.value);
      event.target.value = "";
      setOptions([...options]);
      event.preventDefault();
      return false;
    }
  };
  const handleDeleteValue = (index, indexValue) => {
    options[index].items.splice(indexValue, 1);
    setOptions([...options]);
  };

  const handleChangeQuantity = (event, index) => {
    variants[index].quantity = event.target.value;
    setVariants([...variants]);
  };
  const handleChangePrice = (event, index) => {
    variants[index].price = event.target.value;
    setVariants([...variants]);
  };
  return (
    <ModalBackground>
      <ModalContainer>
        <DeleteIcon onClick={() => handleClose()}>
        </DeleteIcon>
        <ModalTitle>
          <Heading22>Thêm sản phẩm</Heading22>
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
                  ></FormikControl>
                  <FormikControl
                    control="select"
                    label="Danh mục"
                    name="categoryId"
                    options={listCate}
                  />
                  <FormikControl
                    control="editorInput"
                    type="text"
                    label="Mô tả"
                    name="description"
                  ></FormikControl>
                  <FormikControl
                    control="editorInput"
                    type="text"
                    label="Chi tiết"
                    name="details"
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Giá sản phẩm"
                    name="price"
                  ></FormikControl>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Số lượng"
                    name="quantity"
                  ></FormikControl>
                  <FormikControl
                    control="imagesInput"
                    type="file"
                    label="Thêm hình ảnh"
                    name="images"
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
                              <FlexCol>
                                  <Label> Tên tùy chọn</Label>
                                  <DeleteIcon
                                    onClick={() => handleDeleteOption(index)}
                                  ></DeleteIcon>
                                <BoxText
                                  onChange={(event) =>
                                    handleOptionChange(event, index)
                                  }
                                  onKeyPress={(e) => {
                                    e.key === "Enter" && e.preventDefault();
                                  }}
                                ></BoxText>
                              </FlexCol>
                              <FlexCol>
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
                                        <UilTimes size="17"
                                          onClick={() =>
                                            handleDeleteValue(index, indexValue)
                                          }
                                        >
                                        </UilTimes>
                                      </BoxValue>
                                    );
                                  })}
                                </ButtonGroup>
                              </FlexCol>
                            </FrameBody>
                          );
                        })}
                        <AddOptionBtn onClick={handleAddOption}>+ Thêm tùy chọn</AddOptionBtn>
                      </div>
                    )}
                  </Frame>
                  {options[0].items.length > 0 && (
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
                                    if (index == 0) {
                                      return (
                                        <Heading16>{name.value}</Heading16>
                                      );
                                    } else {
                                      return (
                                        <Heading16> / {name.value}</Heading16>
                                      );
                                    }
                                  })}
                                </TableData>
                                <TableData>
                                  <BoxText
                                    value={item.price}
                                    onChange={(event) =>
                                      handleChangePrice(event, index)
                                    }
                                    onKeyPress={(e) => {
                                      e.key === "Enter" && e.preventDefault();
                                    }}
                                  ></BoxText>
                                </TableData>
                                <TableData>
                                  <BoxText
                                    value={item.quantity}
                                    onChange={(event) =>
                                      handleChangeQuantity(event, index)
                                    }
                                    onKeyPress={(e) => {
                                      e.key === "Enter" && e.preventDefault();
                                    }}
                                  ></BoxText>
                                </TableData>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Frame>
                  )}
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
