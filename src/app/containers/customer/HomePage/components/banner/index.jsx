import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import lambor from "../../../../../assets/images/lambor.png"

const BannerContainer = styled.div`
  ${tw`
        w-full 
        lg:px-40
        md:px-10
        px-2 
        sm:px-5
        sm:pb-10 
    `}
`;
const Rectangle = styled.div`
  ${tw`
         h-[455px] bg-[#FDEDF2] rounded-lg relative
    `}
`;
const TextContainer = styled.div`
  ${tw`
        flex flex-col items-start absolute 
        sm:p-8 sm:gap-y-6 sm:top-[74px] sm:left-[-15px]
        p-8 gap-y-6 top-[10px] left-[-15px] w-full
    `}
`;
const Text1 = styled.span`
  ${tw`
       sm:w-[486px] not-italic font-bold sm:text-5xl sm:leading-[58px] text-[#300F19] text-3xl
    `}
`;
const Text2 = styled.span`
  ${tw`
        sm:w-[450px] not-italic font-normal text-base self-stretch leading-[19px] text-[#300F19] opacity-60
    `}
`;
const StartButton = styled.button`
  ${tw`
        box-border flex items-center py-2.5 pl-4 pr-2 bg-[#EE4C7E] rounded-lg color[white] gap-x-2 border hover:bg-[white] hover:color[#EE4C7E] border-[#EE4C7E]
    `}
`;
const StartButtonText = styled.span`
  ${tw`
        not-italic font-semibold text-[14px] text-center leading-[17px] 
    `}
`;
const StartButtonIcon = styled.svg`
    ${tw``}
`
const ImageContainer = styled.div`
    ${tw`
        absolute sm:w-[350px] md:w-[420px] xl:w-[600px] h-auto right-0 bottom-10
    `}
`
export function Banner() {
  return (
    <BannerContainer>
      <Rectangle>
        <TextContainer>
          <Text1>Lựa chọn tối ưu của mẹ và bé</Text1>
          <Text2>
            {" "}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s{" "}
          </Text2>
          <StartButton>
            <StartButtonText>Bắt đầu</StartButtonText>
            <StartButtonIcon
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="white" />
              <g clip-path="url(#clip0_2_80)">
                <path
                  d="M13.561 13.197L15.5205 11.2375C15.8387 10.9041 16.0162 10.4609 16.0162 10C16.0162 9.53912 15.8387 9.09594 15.5205 8.76251L13.561 6.803C13.4204 6.66231 13.2296 6.58324 13.0307 6.58319C12.8317 6.58314 12.6409 6.66212 12.5003 6.80275C12.3596 6.94339 12.2805 7.13415 12.2804 7.33308C12.2804 7.53201 12.3594 7.72281 12.5 7.86351L13.89 9.25401L4.76501 9.26551C4.5661 9.26551 4.37534 9.34452 4.23468 9.48518C4.09403 9.62583 4.01501 9.81659 4.01501 10.0155C4.01501 10.2144 4.09403 10.4052 4.23468 10.5458C4.37534 10.6865 4.5661 10.7655 4.76501 10.7655L13.8805 10.754L12.5 12.1365C12.3634 12.278 12.2878 12.4674 12.2895 12.6641C12.2912 12.8607 12.3701 13.0488 12.5091 13.1879C12.6482 13.3269 12.8363 13.4058 13.033 13.4075C13.2296 13.4092 13.4191 13.3336 13.5605 13.197H13.561Z"
                  fill="#EE4C7E"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_80">
                  <rect
                    width="12"
                    height="12"
                    fill="white"
                    transform="translate(4 4)"
                  />
                </clipPath>
              </defs>
            </StartButtonIcon>
          </StartButton>
        </TextContainer>
        <ImageContainer>
            <img src={lambor}/>
        </ImageContainer>
      </Rectangle>
    </BannerContainer>
  );
}
