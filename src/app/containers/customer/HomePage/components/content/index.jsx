import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { UilAngleRightB } from '@iconscout/react-unicons'
import { Heading26, LightText14, Heading14 } from "../../../../../sharedComponents/text";
import { ProductsSlider } from "../../../../../sharedComponents/slider/ProductSlider";
import { useSelector } from "react-redux";


export const ContentContainer = styled.div`
  ${tw`
        p-5 lg:px-40 md:p-10 w-full flex flex-col space-y-6 bg-[ #FAFAFA]
     `}
`;
export const Title = styled.div`
  ${tw`
        flex flex-col space-y-4
    `}
`;
export const HeadingTitle = styled.div`
  ${tw`
        flex items-center space-x-2.5 
    `}
`;
const Time = styled.div`
  ${tw`flex space-x-2 items-center`}
`;
const TimeBox = styled.div`
  ${tw`p-1 bg-[ #300F19] rounded-lg flex justify-center`}
`;
const TimeText = styled.div`
  ${tw` not-italic font-semibold text-[14px] leading-[17px] text-[#ffffff] min-w-[17px] flex justify-center`}
`;
const TowDotsText = styled.div`
  ${tw` not-italic font-semibold text-[14px] leading-[17px] text-[#300F19] `}
`;

const FlashIcon = styled.svg`
  ${tw``}
`;
export const ListProductContainer = styled.div`
  ${tw`
        grid grid-cols-4 gap-5  
    `}
`;


const SaleContainer = styled.div`
  ${tw`
    py-1 px-2 border rounded-lg border-[#EE4C7E] not-italic font-normal text-[14px] leading-[17px] text-[ #EE4C7E]
  `}
`;
const ProgressBar = styled.div`
  ${tw` h-5 bg-[#FDEDF2] rounded-[20px] relative flex items-center justify-center`}
`;
const ProgressText = styled.span`
  ${tw` not-italic font-normal text-[12px] leading-[15px] text-[#300F19]`}
`;
const Progress = styled.div`
  ${tw` absolute left-0 top-0 bg-[#EE4C7E] rounded-[20px] w-[46px] h-full`}
`;

const RelativeDiv = styled.div`
  ${tw` relative`}
`;

export function Content() {
  const {listProducts} = useSelector(state => state.product)
  const [gio, setGio] = useState(1);
  const [phut, setPhut] = useState(0);
  const [giay, setGiay] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (giay != 0) {
        setGiay(giay - 1);
      } else {
        setGiay(59);
        if (phut != 0) {
          setPhut(phut - 1);
        } else {
          setPhut(59);
          if (gio != 0) {
            setGio(gio - 1);
          } else {
            setGio(1);
          }
        }
      }
    }, 1000);
  }, [giay]);
  
  return (
    <>
      <ContentContainer>
        <Title>
          <HeadingTitle>
            <FlashIcon
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2_89)">
                <path
                  d="M11.8156 28.3532L22.6157 9.75706C22.8602 9.33602 22.5134 8.81791 22.031 8.88353L14.847 9.85998L16.5635 0.848455C16.6213 0.544665 16.2297 0.370595 16.0429 0.617072L5.42406 14.634C5.11475 15.0423 5.44227 15.6228 5.95163 15.5692L13.8719 14.7355L11.2754 28.1508C11.2128 28.4744 11.65 28.6383 11.8156 28.3532Z"
                  fill="#F0A500"
                />
                <path
                  d="M8.74479 13.6407C8.54644 13.6565 8.4147 13.4397 8.52014 13.271L16.4596 0.567849C16.3415 0.474388 16.1556 0.468372 16.0429 0.617013L5.42406 14.634C5.11475 15.0423 5.44227 15.6227 5.95163 15.5691L13.8719 14.7354L11.2754 28.1507C11.2404 28.3316 11.3625 28.459 11.5051 28.4894L15.9545 14.4103C16.163 13.7504 15.6368 13.0893 14.947 13.1445L8.74479 13.6407Z"
                  fill="#F0A500"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_89">
                  <rect
                    width="28"
                    height="28"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </FlashIcon>
            <Heading26>Flash sale</Heading26>
            <Time>
              <TimeBox>
                <TimeText>{gio < 10 ? "0" + gio : gio}</TimeText>
              </TimeBox>
              <TowDotsText>:</TowDotsText>
              <TimeBox>
                <TimeText>{phut < 10 ? "0" + phut : phut}</TimeText>
              </TimeBox>
              <TowDotsText>:</TowDotsText>
              <TimeBox>
                <TimeText>{giay < 10 ? "0" + giay : giay}</TimeText>
              </TimeBox>
            </Time>
            <UilAngleRightB></UilAngleRightB>
          </HeadingTitle>
          <LightText14>135 khuyến mãi</LightText14>
        </Title>
        <RelativeDiv>
          {listProducts && <ProductsSlider data={listProducts.items}></ProductsSlider>}
        </RelativeDiv>
      </ContentContainer>
    </>
  );
}
