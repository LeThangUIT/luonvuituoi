import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Body } from "../../../../sharedComponents/body";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { HeadingTitle } from "../../HomePage/components/content";
import { PageContainer } from "../../HomePage/pages/HomePage";
import { UilAngleRightB } from '@iconscout/react-unicons'
import { DisableButton, WhiteButton } from "../../../../sharedComponents/button";
import { UilShoppingCart } from '@iconscout/react-unicons'
import {
  Heading14,
  Heading16,
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
  fetchProductDetail,
  getByOptionAnother,
} from "../../../admin/productManagement/productSlice";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ProductApi from "../../../../api/productApi";
import { addCartLocal, addToCart } from "../../CartPage/CartSlice";
import { setBeforeLoginRoute } from "../../Auth/authSlice";

const ContentContainer = styled.div`
  ${tw`
        w-full 
        lg:py-5
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
        not-italic font-bold text-[30px] leading-[36px] text-[#300F19] text-center
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
  ${tw` bg-white rounded-lg px-5 py-2 border border-solid border-[#EEEEEE]`}
`;
const CommentFrame = styled.div`
  ${tw` flex flex-col items-start gap-2 pl-12 pb-8`}
`;
const StarGroup = styled.div`
  ${tw` flex flex-row items-center gap-1`}
`;
function DetailPage() {
  const navigate = useNavigate()
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  let { productId } = useParams();
  const { productDetail, variantId } = useSelector((state) => state.product);
  const userToken = localStorage.getItem("userToken")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductDetail(productId));
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
  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = (data) => {
    if(userToken) {
      dispatch(addToCart({...data, userToken}))
    }
    else {
      // dispatch(setBeforeLoginRoute(currentPath.pathname))
      navigate("/login")
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
  }
  return (
    <PageContainer>
      <Header></Header>
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
                    <StartFrame>
                      <StarIcon size="20" color="#F0A500"></StarIcon>
                      <StarIcon size="20" color="#F0A500"></StarIcon>
                      <StarIcon size="20" color="#F0A500"></StarIcon>
                      <StarIcon size="20" color="#F0A500"></StarIcon>
                      <StarIcon size="20" color="#818181"></StarIcon>
                    </StartFrame>
                    <Line></Line>
                    <LightText14>Xem 21 đánh giá</LightText14>
                    <Line></Line>
                    <LightText14>Đã bán 16</LightText14>
                  </EvaluationFrame>
                  <Price>đ {formatter.format(productDetail.price)}</Price>
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
                    <QuantityComponent quantity={quantity} setQuantity={setQuantity}></QuantityComponent>
                  </Container>
                  <ButtonGroup>
                    {variantId && productDetail.options.length != 0 || productDetail.options.length == 0 ? (
                      <WhiteButton onClick={() => handleAddToCart({variantId, quantity,productId: productDetail.id, imageMain: productDetail.imageMain, name: productDetail.name, price: productDetail.price})}>
                        <UilShoppingCart />
                        Thêm vào giỏ hàng
                      </WhiteButton>
                    ) : (
                      <DisableButton >
                        <UilShoppingCart />
                        Thêm vào giỏ hàng
                      </DisableButton>
                    )}

                    <WhiteButton>Mua ngay</WhiteButton>
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
                      <PinkHeading48>5</PinkHeading48>
                      <PinkHeading16>/</PinkHeading16>
                      <PinkHeading16>5</PinkHeading16>
                      <StarIcon size="16" color="#F0A500"></StarIcon>
                    </RatingFrame>
                    <RatingGroup>
                      <RatingButton>
                        <Text14>Tất cả</Text14>
                      </RatingButton>
                      <RatingButton>
                        <Text14>5 sao</Text14>
                      </RatingButton>{" "}
                      <RatingButton>
                        <Text14>4 sao</Text14>
                      </RatingButton>{" "}
                      <RatingButton>
                        <Text14>3 sao</Text14>
                      </RatingButton>{" "}
                      <RatingButton>
                        <Text14>2 sao</Text14>
                      </RatingButton>
                      <RatingButton>
                        <Text14>1 sao</Text14>
                      </RatingButton>
                    </RatingGroup>
                  </FilterEvaluationFrame>
                  <CommentFrame>
                    <Heading16>Le Duc Thang</Heading16>
                    <StarGroup>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                    </StarGroup>
                    <LightText12>2:06 11/10/2022</LightText12>
                    <Text14>Giao hàng nhanh, đẹp, bé nhà mình thích lắm</Text14>
                  </CommentFrame>
                  <CommentFrame>
                    <Heading16>Bui Thanh Tra</Heading16>
                    <StarGroup>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#F0A500"></StarIcon>
                      <StarIcon size="12" color="#818181"></StarIcon>
                    </StarGroup>
                    <LightText12>2:06 11/10/2022</LightText12>
                    <Text14>Giao hàng nhanh, đẹp, bé nhà mình thích lắm</Text14>
                  </CommentFrame>
                </DescriptionSection>
              </ContentSection>
            </ContentContainer>
          </>
        ) : (
          <span>loading</span>
        )}
        <Footer></Footer>
      </Body>
    </PageContainer>
  );
}

export default DetailPage;
