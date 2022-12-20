import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Body } from "../../../../sharedComponents/body";
import { Heading26 } from "../../../../sharedComponents/text";
import { getAllVouchers } from "../../../admin/voucherManagement/VoucherSlice";
import { HeadingTitle } from "../../HomePage/components/content";
import { UilAngleRightB } from "@iconscout/react-unicons";
import tw from "twin.macro";
import styled from "styled-components";
import logo from "../../../../assets/images/Lamborghini-Logo.png";
import { useState } from "react";
import { formatDate } from "../../../../sharedComponents/format";
import LoadingComponent from "../../../../sharedComponents/loading";
import EmptyComponent from "../../../../sharedComponents/empty";

const ContentContainer = styled.div`
  ${tw`
        p-5 lg:px-40 md:p-10 w-full flex flex-col space-y-6
     `}
`;
const ListCoupons = styled.div`
  ${tw` grid grid-cols-3 gap-6`}
`;
const CouponCart = styled.div`
  /* width: fit-content; */
  ::before {
    transform: translate(-50%, -50%);
  }
  ::after {
    transform: translate(50%, -50%);
  }
  ${tw` col-span-1 relative bg-gradient-to-br from-purple-500 to-pink-500 text-white py-3 px-8 shadow-lg rounded-2xl flex flex-col gap-2 items-center justify-center
        before:bg-white before:w-[30px] before:h-[30px] before:rounded-full before:absolute before:top-1/2  before:left-0
        after:bg-white after:w-[30px] after:h-[30px] after:rounded-full after:absolute after:top-1/2  after:right-0
    `}
`;
const Logo = styled.img`
  ${tw`w-16 rounded-lg`}
`;
const Heading = styled.span`
  ${tw` text-[16px] font-normal leading-[19px] text-center`}
`;
const CouponRow = styled.div`
  ${tw`flex flex-row items-center`}
`;
const CouponCode = styled.span`
  ${tw`border border-dashed font-medium border-white border-r-0 py-[6px] px-4`}
`;
const CouponBtn = styled.span`
  ${tw`border border-solid border-white bg-white py-[6px] px-4 text-primaryColor hover:cursor-pointer`}
`;
const ExpText = styled.span`
  ${tw` text-[13px]`}
`;

function VoucherPage() {
  const { listVoucher, loading } = useSelector((state) => state.voucher);
  

  const [copy, setCopy] = useState(-1);
  const copyCode = ({ index, code }) => {
    console.log(index);
    setCopy(index);
    navigator.clipboard.writeText(code);
  };
  return (
    <Body>
      <ContentContainer>
        <HeadingTitle>
          <Heading26>Danh sách voucher</Heading26>
          <UilAngleRightB></UilAngleRightB>
        </HeadingTitle>
        {loading ? (
          <LoadingComponent></LoadingComponent>
        ) : listVoucher.length > 0 ? (
          <ListCoupons>
            {listVoucher.map((item, index) => {
              return (
                <CouponCart key={index}>
                  <Logo src={logo}></Logo>
                  {item.discountType === "money" ? (
                    <Heading>
                      Giảm ngay {item.value / 1000}k cho đơn hàng từ{" "}
                      {item.condition / 1000}k
                    </Heading>
                  ) : (
                    <Heading>
                      Giảm {item.value}% cho đơn hàng từ {item.condition} sản
                      phẩm
                    </Heading>
                  )}
                  <CouponRow>
                    <CouponCode>{item.code}</CouponCode>
                    {copy == index ? (
                      <CouponBtn
                      >
                        Đã lưu!
                      </CouponBtn>
                    ) : (
                      <CouponBtn onClick={() => copyCode({ index, code: item.code })}>Sao chép</CouponBtn>
                    )}
                  </CouponRow>
                  <ExpText>HSD: {formatDate(item.endDate)}</ExpText>
                </CouponCart>
              );
            })}
          </ListCoupons>
        ) : (
          <EmptyComponent></EmptyComponent>
        )}
      </ContentContainer>
    </Body>
  );
}

export default VoucherPage;
