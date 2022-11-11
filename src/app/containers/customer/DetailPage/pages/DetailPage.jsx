import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { AddToCartIcon } from "../../../../sharedComponents/icon/addToCartIcon";
import { Body } from "../../../../sharedComponents/body";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { HeadingTitle } from "../../HomePage/components/content";
import { PageContainer } from "../../HomePage/pages/HomePage";
import { RightIcon } from "../../../../sharedComponents/icon/rightIcon";
import { WhiteButton } from "../../../../sharedComponents/button";
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
import { ImageList } from "../../../../assets/ImageList";
import { StarIcon } from "../../../../sharedComponents/icon/starIcon";
import Quantity from "../components/Quantity";
import QuantityComponent from "../components/Quantity";

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
const Size = styled.span`
  ${tw` py-2 px-5 border border-solid border-[#EEEEEE] rounded-lg text-[14px]  text-[ #300F19] font-normal leading-[17px] hover:opacity-90 hover:cursor-pointer`}
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
`
const StarGroup = styled.div`
  ${tw` flex flex-row items-center gap-1`}
`
function DetailPage() {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  return (
    <PageContainer>
      <Header></Header>
      <Body>
        <ContentContainer>
          <GridContainer>
            <ImageSection>
              <ProductImageSlider images={ImageList}></ProductImageSlider>
            </ImageSection>
            <ContentSection>
              <NameProduct>Giày Air Force 1</NameProduct>
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
              <Price>đ {formatter.format(300000)}</Price>
              <Container>
                <Label>Size</Label>
                <ButtonGroup>
                  <Size>35</Size>
                  <Size>36</Size>
                  <Size>37</Size>
                  <Size>38</Size>
                  <Size>39</Size>
                  <Size>40</Size>
                  <Size>41</Size>
                  <Size>42</Size>
                </ButtonGroup>
              </Container>
              <Container>
                <Label>Số lượng</Label>
                <QuantityComponent></QuantityComponent>
              </Container>
              <ButtonGroup>
                <WhiteButton>
                  <AddToCartIcon />
                  Thêm vào giỏ hàng
                </WhiteButton>
                <WhiteButton>Mua ngay</WhiteButton>
              </ButtonGroup>
            </ContentSection>
          </GridContainer>
        </ContentContainer>
        <ContentContainer>
          <ContentSection>
            <HeadingTitle>
              <Heading26>Chi tiết sản phẩm</Heading26>
              <RightIcon></RightIcon>
            </HeadingTitle>
            <DescriptionSection>
              <Heading14>Đặc điểm sản phẩm</Heading14>
              <Text14>
                - Bé hãy cùng với mẹ hoặc các bạn tạo ra những chiếc bánh pizza
                thật hấp dẫn với nhiều hình trang trí thật dễ thương và ngộ
                nghĩnh.
              </Text14>
              <Heading14>Thông tin sản phẩm</Heading14>
            </DescriptionSection>
          </ContentSection>
        </ContentContainer>
        <ContentContainer>
          <ContentSection>
            <HeadingTitle>
              <Heading26>Đánh giá sản phẩm</Heading26>
              <RightIcon></RightIcon>
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

        <Footer></Footer>
      </Body>
    </PageContainer>
  );
}

export default DetailPage;
