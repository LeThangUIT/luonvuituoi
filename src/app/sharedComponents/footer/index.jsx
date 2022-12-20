import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { UilFacebook, UilInstagramAlt, UilTwitter } from '@iconscout/react-unicons'

const FooterContainer = styled.div`
  ${tw` bg-[ #EE4C7E] grid sm:grid-cols-4 grid-cols-1 gap-5 py-10  p-5 lg:px-40 md:px-10  w-full `}
`;
const ColumnContainer = styled.div`
  ${tw` flex flex-col space-y-6 col-span-1 h-auto `}
`;
const ColumnContainer4 = styled.div`
  ${tw` flex flex-col space-y-10 col-span-1 h-auto `}
`;
const HeaderColumn4 = styled.span`
  ${tw` flex flex-col space-y-5 col-span-1 h-auto`}
`;
const IconSocialGroup = styled.div`
  ${tw` flex space-x-4 col-span-1 h-auto`}
`;
const HeaderColumnText = styled.span`
  ${tw` not-italic font-bold text-base leading-[19px] text-[#FFFFFF]`}
`;
const BodyColumn = styled.div`
  ${tw` flex flex-col space-y-3`}
`;
const BodyColumnText = styled.span`
  ${tw` not-italic font-normal text-[14px] leading-[17px] text-[#FFFFFF]`}
`;
const ButtonFooter = styled.button`
  ${tw` w-max flex items-center py-[10px] pt-2 px-4 space-x-2 bg-[#ffffff] rounded-lg hover:opacity-90 `}
`;
const ButtonFooterText = styled.span`
  ${tw`not-italic font-semibold text-[14px] leading-[17px] text-[#EE4C7E]`}
`;
export function Footer() {
  return (
    <FooterContainer>
      <ColumnContainer>
        <HeaderColumnText>Về chúng tôi</HeaderColumnText>
        <BodyColumn>
          <BodyColumnText>Trường Đại học Công nghệ Thông tin</BodyColumnText>
          <BodyColumnText>
            Địa chỉ: Khu phố 6, Phường Linh Trung, TP. Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam
          </BodyColumnText>
          <BodyColumnText>Điện thoại: 0123456789</BodyColumnText>
          <BodyColumnText>Email: uit@gmail.com</BodyColumnText>
        </BodyColumn>
      </ColumnContainer>
      <ColumnContainer>
        <HeaderColumnText>Hỗ trợ mua hàng</HeaderColumnText>
        <BodyColumn>
          <BodyColumnText>Chính sách Thành viên</BodyColumnText>
          <BodyColumnText>Chính sách Đổi trả</BodyColumnText>
          <BodyColumnText>Giao hàng - thanh toán</BodyColumnText>
          <BodyColumnText>Chính sách bảo mật thông tin</BodyColumnText>
          <BodyColumnText>Tuyển dụng</BodyColumnText>
          <BodyColumnText>Hệ thống 5 cửa hàng</BodyColumnText>
        </BodyColumn>
      </ColumnContainer>
      <ColumnContainer>
        <HeaderColumnText>Thông tin liên hệ</HeaderColumnText>
        <BodyColumn>
          <BodyColumnText>
            CSKH 19522197 - Đơn hàng 19522226
          </BodyColumnText>
          <BodyColumnText>Mua hàng 0123456789</BodyColumnText>
          <BodyColumnText>Email</BodyColumnText>
        </BodyColumn>
      </ColumnContainer>
      <ColumnContainer4>
        <HeaderColumn4>
          <HeaderColumnText>Kết nối với chúng tối</HeaderColumnText>
          <IconSocialGroup>
            <UilFacebook></UilFacebook>
            <UilTwitter/>
            <UilInstagramAlt/>
          </IconSocialGroup>
        </HeaderColumn4>
        <ButtonFooter>
          <ButtonFooterText>Hệ thống cửa hàng</ButtonFooterText>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="#EE4C7E" />
            <g >
              <path
                d="M13.561 13.1969L15.5205 11.2374C15.8387 10.904 16.0162 10.4608 16.0162 9.99995C16.0162 9.53906 15.8387 9.09588 15.5205 8.76244L13.561 6.80294C13.4204 6.66225 13.2296 6.58318 13.0307 6.58313C12.8317 6.58308 12.6409 6.66206 12.5003 6.80269C12.3596 6.94332 12.2805 7.13409 12.2804 7.33302C12.2804 7.53195 12.3594 7.72275 12.5 7.86344L13.89 9.25395L4.76501 9.26545C4.5661 9.26545 4.37534 9.34446 4.23468 9.48512C4.09403 9.62577 4.01501 9.81653 4.01501 10.0154C4.01501 10.2144 4.09403 10.4051 4.23468 10.5458C4.37534 10.6864 4.5661 10.7654 4.76501 10.7654L13.8805 10.7539L12.5 12.1364C12.3634 12.2779 12.2878 12.4674 12.2895 12.664C12.2912 12.8606 12.3701 13.0488 12.5091 13.1878C12.6482 13.3269 12.8363 13.4057 13.033 13.4075C13.2296 13.4092 13.4191 13.3336 13.5605 13.1969H13.561Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_209">
                <rect
                  width="12"
                  height="12"
                  fill="white"
                  transform="translate(4 4)"
                />
              </clipPath>
            </defs>
          </svg>
        </ButtonFooter>
      </ColumnContainer4>
    </FooterContainer>
  );
}
