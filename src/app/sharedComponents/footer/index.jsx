import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

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
          <BodyColumnText>CÔNG TY CỔ PHẦN BẢO ANH ANH</BodyColumnText>
          <BodyColumnText>
            Địa chỉ: Số 6, Đường 22, Khu phố 2, Phường An Khánh, Thành phố Thủ
            Đức, Thành phố Hồ Chí Minh, Việt Nam
          </BodyColumnText>
          <BodyColumnText>Điện thoại: 0768865858</BodyColumnText>
          <BodyColumnText>Email: hello@baababy.com.vn</BodyColumnText>
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
            CSKH 028 2262 5858 - Đơn hàng 07 6886 5858
          </BodyColumnText>
          <BodyColumnText>Mua hàng 07 6886 5858</BodyColumnText>
          <BodyColumnText>Email</BodyColumnText>
        </BodyColumn>
      </ColumnContainer>
      <ColumnContainer4>
        <HeaderColumn4>
          <HeaderColumnText>Kết nối với chúng tối</HeaderColumnText>
          <IconSocialGroup>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="#3B5998"
              />
              <path
                d="M20.0224 16.6263H17.1674V27.0858H12.8418V16.6263H10.7845V12.9505H12.8418V10.5718C12.8418 8.87078 13.6498 6.20715 17.2059 6.20715L20.41 6.22056V9.7886H18.0852C17.7039 9.7886 17.1677 9.97912 17.1677 10.7906V12.9539H20.4003L20.0224 16.6263Z"
                fill="white"
              />
            </svg>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="#FF0000"
              />
              <path
                d="M21.2358 9.98108H10.7642C10.3457 9.98108 9.93137 10.0635 9.54478 10.2237C9.15819 10.384 8.80695 10.6188 8.51115 10.9148C8.21534 11.2108 7.98076 11.5622 7.82081 11.9489C7.66086 12.3355 7.57867 12.75 7.57895 13.1684V18.8316C7.57867 19.2501 7.66086 19.6645 7.82081 20.0512C7.98076 20.4379 8.21534 20.7893 8.51115 21.0853C8.80695 21.3813 9.15819 21.6161 9.54478 21.7763C9.93137 21.9365 10.3457 22.019 10.7642 22.019H21.2358C21.6543 22.019 22.0686 21.9365 22.4552 21.7763C22.8418 21.6161 23.193 21.3813 23.4888 21.0853C23.7847 20.7893 24.0192 20.4379 24.1792 20.0512C24.3391 19.6645 24.4213 19.2501 24.421 18.8316V13.1684C24.4213 12.75 24.3391 12.3355 24.1792 11.9489C24.0192 11.5622 23.7847 11.2108 23.4888 10.9148C23.193 10.6188 22.8418 10.384 22.4552 10.2237C22.0686 10.0635 21.6543 9.98108 21.2358 9.98108ZM13.7811 18.5811V13.419L18.2189 16L13.7811 18.5811Z"
                fill="white"
              />
            </svg>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                fill="url(#paint0_linear_2_200)"
              />
              <path
                d="M19.3991 7.11108H12.608C9.57864 7.11108 7.11819 9.57153 7.11819 12.6009V19.392C7.11819 22.4213 9.57864 24.8818 12.608 24.8818H19.3991C22.4284 24.8818 24.8889 22.4213 24.8889 19.392V12.6009C24.8889 9.57153 22.4284 7.11108 19.3991 7.11108ZM22.9049 19.3991C22.9049 21.3333 21.3333 22.912 19.392 22.912H12.6009C10.6666 22.912 9.08797 21.3404 9.08797 19.3991V12.608C9.08797 10.6738 10.6595 9.09508 12.6009 9.09508H19.392C21.3262 9.09508 22.9049 10.6666 22.9049 12.608V19.3991Z"
                fill="white"
              />
              <path
                d="M16 11.4561C13.4969 11.4561 11.456 13.4969 11.456 16.0001C11.456 18.5032 13.4969 20.5441 16 20.5441C18.5031 20.5441 20.544 18.5032 20.544 16.0001C20.544 13.4969 18.5031 11.4561 16 11.4561ZM16 18.7592C14.4782 18.7592 13.2409 17.5218 13.2409 16.0001C13.2409 14.4783 14.4782 13.2409 16 13.2409C17.5218 13.2409 18.7591 14.4783 18.7591 16.0001C18.7591 17.5218 17.5218 18.7592 16 18.7592Z"
                fill="white"
              />
              <path
                d="M20.8901 11.9543C21.3087 11.8865 21.5931 11.4921 21.5252 11.0734C21.4573 10.6548 21.0629 10.3704 20.6443 10.4383C20.2257 10.5061 19.9413 10.9005 20.0092 11.3192C20.077 11.7378 20.4714 12.0222 20.8901 11.9543Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2_200"
                  x1="3.81717"
                  y1="28.1828"
                  x2="26.555"
                  y2="5.44505"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FEE411" />
                  <stop offset="0.0518459" stop-color="#FEDB16" />
                  <stop offset="0.1381" stop-color="#FEC125" />
                  <stop offset="0.2481" stop-color="#FE983D" />
                  <stop offset="0.3762" stop-color="#FE5F5E" />
                  <stop offset="0.5" stop-color="#FE2181" />
                  <stop offset="1" stop-color="#9000DC" />
                </linearGradient>
              </defs>
            </svg>
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
            <g clip-path="url(#clip0_2_209)">
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
