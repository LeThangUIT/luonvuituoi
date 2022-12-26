import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { toast } from "react-toastify";
import { Body } from "../../../../sharedComponents/body";
import { HeadingTitle } from "../../HomePage/components/content";
import { UilAngleRightB } from "@iconscout/react-unicons";
import avatar from "../../../../assets/images/avatar.png"
import {
  DisableButton,
  PinkButton,
  WhiteButton,
} from "../../../../sharedComponents/button";
import { UilShoppingCart } from "@iconscout/react-unicons";
import {
  Heading14,
  Heading16,
  Heading22,
  Heading26,
  LightText12,
  LightText14,
  PinkHeading16,
  PinkHeading30,
  PinkHeading48,
  Text14,
} from "../../../../sharedComponents/text";
import ProductImageSlider from "../../../../sharedComponents/slider/ProductImageSlider";
import { StarIcon } from "../../../../sharedComponents/icon/starIcon";
import Quantity from "../components/Quantity";
import QuantityComponent from "../components/Quantity";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  fetchProductDetail,
  getByOptionAnother,
} from "../../../admin/productManagement/productSlice";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ProductApi from "../../../../api/productApi";
import {
  addCartLocal,
  addToCart,
  changeNumber,
  changeQuantity,
} from "../../CartPage/CartSlice";
import { setBeforeLoginRoute } from "../../Auth/authSlice";
import { Avatar } from "../../../../sharedComponents/header/rightHeader/RightHeader";
import { formatDate } from "../../../../sharedComponents/format";
import { Form, Formik } from "formik";
import { FormContainer } from "../../LoginPage/pages/LoginPage";
import FormikControl from "../../../../sharedComponents/formikCustom/FormikControl";
import * as Yup from "yup";
import LoadingComponent from "../../../../sharedComponents/loading";


const ContentContainer = styled.div`
  ${tw`
        w-full 
        lg:py-10
        lg:px-40
        md:px-10
        px-2 
        sm:px-5
        sm:pb-10 
    `}
`;
const EvaluationFrame = styled.div`
  ${tw` w-max flex flex-row gap-8 items-center`}
`;
const StartFrame = styled.div`
  ${tw` w-max flex flex-row gap-1 items-center`}
`;
const NameProduct = styled.span`
  ${tw`
        not-italic font-bold text-[30px] leading-[36px] text-[#300F19]
    `}
`;

const GridContainer = styled.div`
  ${tw` grid grid-cols-10 gap-6 `}
`;
const ImageSection = styled.div`
  ${tw` col-span-4`}
`;
const ContentSection = styled.div`
  ${tw` col-span-5 col-start-6 flex flex-col items-start gap-7 `}
`;
const Price = styled.span`
  ${tw` w-full bg-secondaryColor rounded-lg py-[35px] pl-[20px] text-[26px] text-primaryColor font-bold leading-[31px]`}
`;
const Container = styled.div`
  ${tw` flex flex-row items-start gap-3`}
`;
const Label = styled.span`
  ${tw` min-w-[140px] box-border text-[14px]  text-[ #300F19] font-normal leading-[17px]`}
`;
export const ButtonGroup = styled.div`
  ${tw` flex flex-row gap-[10px] flex-wrap`}
`;
const Size = styled.button`
  ${tw` py-2 px-5 border border-solid border-[#EEEEEE] rounded-lg text-[14px]  text-[ #300F19] font-normal leading-[17px] hover:opacity-90 hover:cursor-pointer`}
`;
const ActiveSize = styled.button`
  ${tw` py-2 px-5 border border-solid border-primaryColor rounded-lg text-[14px]  text-[ #300F19] font-normal leading-[17px] hover:opacity-90 hover:cursor-pointer`}
`;
const DescriptionSection = styled.div`
  ${tw` flex flex-col items-start gap-5 w-full`}
`;
const Line = styled.div`
  ${tw` w-0 h-5 bg-[#818181] border border-solid border-[#818181]`}
`;
const FilterEvaluationFrame = styled.div`
  ${tw` w-full flex bg-secondaryColor flex-row content-start items-center gap-[60px] p-10 rounded-lg`}
`;
const RatingFrame = styled.div`
  ${tw` flex items-end flex-row`}
`;
const RatingGroup = styled.div`
  ${tw` flex flex-row items-center gap-3`}
`;
const RatingButton = styled.button`
  ${tw` bg-white rounded-lg px-5 py-2 border border-solid border-[#EEEEEE] disabled:opacity-50 disabled:border-primaryColor`}
`;
export const FlexFrame = styled.div`
  ${tw` flex flex-row items-start gap-1`}
`
export const CommentFrame = styled.div`
  ${tw` flex flex-col items-start gap-2 pb-8`}
`;
export const StarGroup = styled.div`
  ${tw` flex flex-row items-center gap-1`}
`;
const ReviewFrame = styled.div`
  ${tw` p-8 flex flex-col gap-8 border border-solid mt-8`}
`
function DetailPage() {
  const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  let { productId } = useParams();
  const { productDetail, variantId, loading } = useSelector((state) => state.product);
  const { loading: loadingOption } = useSelector((state) => state.cart);
  const userToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductDetail({ userToken: userToken, productId }));
  }, []);
  let listImages = [];
  if (productDetail != null) {
    listImages = [
      productDetail.imageMain,
      ...productDetail.imageDescription.split(" "),
    ];
    listImages.pop();
  }

  const [optionValues, setOptionValues] = useState([]);
  const handleOnclickOption = (data) => {
    let index = optionValues.findIndex(
      (option) => option.optionId == data.optionId
    );
    if (index == -1) {
      optionValues.push(data);
    } else {
      optionValues[index].valueId = data.valueId;
    }
    dispatch(getByOptionAnother(optionValues));
    setOptionValues([...optionValues]);
  };
  const [quantity, setQuantity] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const duplicateCheck = (cart, data) => {
    let i = -1;
    cart.map((item, index) => {
      if (item.productId == data.productId) {
        if (item.variantId == data.variantId) {
          i = index;
        }
      }
    });
    return i;
  };
  const handleAddToCart = async (data) => {
    if (userToken) {
      let index = duplicateCheck(cart, data);
      if (index == -1) {
        const { imageMain, price, name, ...rest } = data;
        const { payload } = await dispatch(addToCart({ ...rest, userToken }));
        if (payload.data.success) {
          toast.success(payload.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(payload.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        if(data.quantity + cart[index].quantity <= 10) {
          dispatch(
            changeNumber({
              quantity: data.quantity + cart[index].quantity,
              variantId: data.variantId,
              productId: data.productId,
            })
          );
          dispatch(
            changeQuantity({
              userToken,
              quantity: data.quantity + cart[index].quantity,
              variantId: data.variantId,
              productId: data.productId,
            })
          );
          toast.success("Thêm giỏ hàng thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        else {
          toast.error("Vui lòng giảm số lượng sản phẩm!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } else {
      // dispatch(setBeforeLoginRoute(currentPath.pathname))
      navigate("/login");
    }
    // else {
    //   dispatch(addCartLocal(data))
    //   let cartLocal = localStorage.getItem("cart")
    //   const {productId, variantId, quantity, ...rest} = data
    //   let newItem = {productId, variantId, quantity}
    //   if(!cartLocal) {
    //     localStorage.setItem("cart", JSON.stringify([newItem]))
    //   }
    //   else{
    //     let storedCart = JSON.parse(cartLocal)
    //     storedCart.push(newItem)
    //     localStorage.setItem("cart", JSON.stringify(storedCart))
    //   }
    // }
  };
  const [selected, setSelected] = useState(0)
  const [listReview, setListReview] = useState(productDetail?.reviews)
  useEffect(() => { setListReview(productDetail?.reviews)}, [productDetail] )
  const setReviews = (number) => {
    setSelected(number)
    if(number) {
      setListReview(productDetail.reviews.filter(item => item.rating == number))
    }
    else {
      setListReview(productDetail.reviews)
    }
  }
  const initialValues = {
    content: "",
    rating: "",
  };
  const validationSchema = Yup.object({
    content: Yup.string()
      .required("Bạn cần phải nhập trường này!"),
    rating: Yup.string()
      .required("Bạn cần phải nhập trường này!")
  });

  const [reviewForm, setReviewForm] = useState(true)
  const onSubmit = (values) => {
    dispatch(addReview({userToken, data: {productId: productDetail.id, ...values}}))
  }
  return (
    <Body>
      {productDetail ? (
        <>
          <ContentContainer>
            <GridContainer>
              <ImageSection>
                <ProductImageSlider images={listImages}></ProductImageSlider>
              </ImageSection>
              <ContentSection>
                <NameProduct>{productDetail.name}</NameProduct>
                <EvaluationFrame>
                  {productDetail.averageRating == null ? (
                    <StartFrame>
                      {[...Array(5)].map((i, index) => (
                        <StarIcon size="20" color="#F0A500"></StarIcon>
                      ))}
                    </StartFrame>
                  ) : (
                    <StartFrame>
                      {[...Array(productDetail.averageRating)].map(
                        (i, index) => (
                          <StarIcon size="20" color="#F0A500"></StarIcon>
                        )
                      )}
                      {[...Array(5 - productDetail.averageRating)].map(
                        (i, index) => (
                          <StarIcon size="20" color="#818181"></StarIcon>
                        )
                      )}
                    </StartFrame>
                  )}
                  <Line></Line>
                  {productDetail.countReview == 0 ? (
                    <LightText14>Chưa có đánh giá</LightText14>
                  ) : (
                    <LightText14>{productDetail.countReview} lượt đánh giá</LightText14>
                  )}

                  <Line></Line>
                  <LightText14>
                    Đã bán {productDetail.countPurchased}
                  </LightText14>
                </EvaluationFrame>
                {productDetail.priceMax == 0 || productDetail.price == productDetail.priceMax ? 
                <Price>{formatter.format(productDetail.price)} đ</Price> : 
                <Price>{formatter.format(productDetail.price)} ~ {formatter.format(productDetail.priceMax)} đ</Price>
              }
                {productDetail.options.map((option, index) => (
                  <Container key={index}>
                    <Label>{option.name}</Label>
                    <ButtonGroup>
                      {option.values.map((item, index) => {
                        if (
                          optionValues.findIndex(
                            (optionValue) =>
                              optionValue.optionId == option.id &&
                              optionValue.valueId == item.id
                          ) == -1
                        ) {
                          return (
                            <Size
                              onClick={() =>
                                handleOnclickOption({
                                  optionId: option.id,
                                  valueId: item.id,
                                })
                              }
                              key={index}
                            >
                              {item.name}
                            </Size>
                          );
                        } else {
                          return (
                            <ActiveSize key={index}>{item.name}</ActiveSize>
                          );
                        }
                      })}
                    </ButtonGroup>
                  </Container>
                ))}
                <Container>
                  <Label>Số lượng</Label>
                  <QuantityComponent
                    quantity={quantity}
                    setQuantity={setQuantity}
                  ></QuantityComponent>
                </Container>
                <ButtonGroup>
                  {(variantId && productDetail.options.length != 0) ||
                  productDetail.options.length == 0 ? (
                    <PinkButton
                      disabled={loadingOption}
                      onClick={() =>
                        handleAddToCart({
                          variantId,
                          quantity,
                          productId: productDetail.id,
                          imageMain: productDetail.imageMain,
                          name: productDetail.name,
                          price: productDetail.price,
                          // optionValues,
                        })
                      }
                    >
                      <UilShoppingCart />
                      Thêm vào giỏ hàng
                    </PinkButton>
                  ) : (
                    <DisableButton>
                      <UilShoppingCart />
                      Thêm vào giỏ hàng
                    </DisableButton>
                  )}

                  {/* <WhiteButton>Mua ngay</WhiteButton> */}
                </ButtonGroup>
              </ContentSection>
            </GridContainer>
          </ContentContainer>
          <ContentContainer>
            <ContentSection>
              <HeadingTitle>
                <Heading26>Chi tiết sản phẩm</Heading26>
                <UilAngleRightB></UilAngleRightB>
              </HeadingTitle>
              <DescriptionSection>
                <Heading14>Đặc điểm sản phẩm</Heading14>
                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetail.description,
                  }}
                ></div>
                <Heading14>Thông tin sản phẩm</Heading14>
                <div
                  dangerouslySetInnerHTML={{ __html: productDetail.details }}
                ></div>
              </DescriptionSection>
            </ContentSection>
          </ContentContainer>
          <ContentContainer>
            <ContentSection>
              <HeadingTitle>
                <Heading26>Đánh giá sản phẩm</Heading26>
                <UilAngleRightB></UilAngleRightB>
              </HeadingTitle>
              <DescriptionSection>
                <FilterEvaluationFrame>
                  <RatingFrame>
                    <PinkHeading48>{productDetail.averageRating}</PinkHeading48>
                    <PinkHeading16>/</PinkHeading16>
                    <PinkHeading16>5</PinkHeading16>
                    <StarIcon size="16" color="#F0A500"></StarIcon>
                  </RatingFrame>
                  <RatingGroup>
                    <RatingButton onClick={() => setReviews(0)} disabled={selected == 0}>
                      <Text14>Tất cả</Text14>
                    </RatingButton>
                    <RatingButton onClick={() => setReviews(5)} disabled={selected == 5}>
                      <Text14>5 sao</Text14>
                    </RatingButton>{" "}
                    <RatingButton onClick={() => setReviews(4)} disabled={selected == 4}>
                      <Text14>4 sao</Text14>
                    </RatingButton>{" "}
                    <RatingButton onClick={() => setReviews(3)} disabled={selected == 3}>
                      <Text14>3 sao</Text14>
                    </RatingButton >{" "}
                    <RatingButton onClick={() => setReviews(2)} disabled={selected == 2}>
                      <Text14>2 sao</Text14>
                    </RatingButton>
                    <RatingButton onClick={() => setReviews(1)} disabled={selected == 1}>
                      <Text14>1 sao</Text14>
                    </RatingButton>
                  </RatingGroup>
                </FilterEvaluationFrame>
                {listReview?.length == 0 ? <LightText14>Chưa có đánh giá</LightText14> :
                <>
                  {listReview?.map(item => (
                    <FlexFrame>
                      <Avatar src={item.user.avatar || avatar}/>
                      <CommentFrame>
                        <Heading16>{item.user.name}</Heading16>
                        <StarGroup>
                          {
                              [...Array(item.rating)].map((i, index) => (
                                <StarIcon size="12" color="#F0A500"></StarIcon>
                              ))
                          }
                          {
                              [...Array(5 - item.rating)].map((i, index) => (
                                <StarIcon size="12" color="#818181"></StarIcon>
                              ))
                          }
                        </StarGroup>
                        <LightText12>{formatDate(item.createdAt)}</LightText12>
                        <Text14>{item.content}</Text14>
                      </CommentFrame>
                    </FlexFrame>           
                  ))}
                </> 
                }
              </DescriptionSection>
            </ContentSection>
            {productDetail.isCanReview && 
              <ReviewFrame>
                <HeadingTitle>
                <Heading22>Đánh giá của bạn</Heading22>
                <UilAngleRightB></UilAngleRightB>
              </HeadingTitle>
              <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormContainer>
                    <FormikControl
                      control="input"
                      type="text"
                      name="content"
                    />
                    <FormikControl
                      control="stars"
                      name="rating"
                    />
                    <PinkButton disabled={loading} type="submit">
                      Gửi đánh giá
                    </PinkButton>
                  </FormContainer>
                </Form>
              );
            }}
          </Formik>
              </ReviewFrame>
            }
          </ContentContainer>
        </>
      ) : (
        <LoadingComponent></LoadingComponent>
      )}
    </Body>
  );
}

export default DetailPage;
