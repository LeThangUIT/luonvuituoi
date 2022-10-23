import React from "react";

import styled from "styled-components";
import tw from "twin.macro";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { Heading14, PinkHeading16, Text14 } from "../../../../sharedComponents/text";
import {
  ContentContainer,
  ListProductContainer,
} from "../../HomePage/components/content";
import { PageContainer } from "../../HomePage/pages/HomePage";
import Rose from "../../../../assets/images/Rose.jpg";
import TrashIcon from "../../../../sharedComponents/icon/trashIcon";
import QuantityComponent from "../../DetailPage/components/Quantity";
import { PinkButton } from "../../../../sharedComponents/button";

const Body = styled.div`
  ${tw`
        flex flex-col items-start absolute top-[40px] md:top-[137px] left-0 right-0 w-full
    `}
`;
const TableProduct = styled.table`
  ${tw` w-full col-span-3 table-auto  box-border`}
`;
const TableHead = styled.thead`
  ${tw` h-[57px] bg-white border border-[#EEEEEE] rounded-lg `}
`;
const TableBody = styled.tbody`
  ${tw``}
`;
const TableRow = styled.tr`
  ${tw` h-[140px] border border-[#EEEEEE] bg-white`}
`;
const RowSpace = styled.tr`
  ${tw` h-3`}
`;
const TableHeading = styled.th`
  ${tw`text-left pl-4 px-4`}
`;
const TableData = styled.td`
  ${tw`px-4 whitespace-nowrap`}
`;
const TableNameData = styled.td`
  ${tw`px-4`}
`;


const ImageBox = styled.div`
  ${tw`
      h-[100px] w-[100px] rounded-lg overflow-hidden flex 
  `}
`;
const Image = styled.img`
  ${tw`
     object-cover w-full h-full relative flex-basis[100%] flex-grow-0 flex-shrink-0
  `}
`;

const TotalContainer = styled.div`
  ${tw`  w-full height[fit-content] box-border  bg-white rounded-lg  border border-[#EEEEEE] flex flex-col p-5 items-start gap-y-6`}
`
const FlexContainer = styled.div`
  ${tw` w-full flex flex-row items-center justify-between`}
`
function CartPage() {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  return (
    <PageContainer>
      <Header></Header>
      <Body>
        <ContentContainer>
          <ListProductContainer>
            <TableProduct>
              <TableHead>
                <TableHeading>
                  <Heading14>Sản phẩm</Heading14>
                </TableHeading>
                <TableHeading>
                  <Heading14>Tên sản phẩm</Heading14>
                </TableHeading>
                <TableHeading>
                  <Heading14>Đơn giá</Heading14>
                </TableHeading>
                <TableHeading>
                  <Heading14>Số lượng</Heading14>
                </TableHeading>
                <TableHeading>
                  <Heading14>Số tiền</Heading14>
                </TableHeading>
                <TableHeading>
                  <Heading14>Xóa</Heading14>
                </TableHeading>
              </TableHead>
              <TableBody>
                <RowSpace></RowSpace>
                <TableRow>
                  <TableData>
                    <ImageBox>
                      <Image src={Rose}></Image>
                    </ImageBox>
                  </TableData>
                  <TableNameData>
                    <Heading14>
                      Xe hơi đồ chơi hiện đại nhiều màu sắc hàng Việt Nam chất
                      lượng cao
                    </Heading14>
                  </TableNameData>
                  <TableData>
                    <Heading14>{formatter.format(300000)} đ</Heading14>
                  </TableData>
                  <TableData>
                    <QuantityComponent></QuantityComponent>
                  </TableData>
                  <TableData>
                    <PinkHeading16>{formatter.format(300000)} đ</PinkHeading16>
                  </TableData>
                  <TableData>
                    <TrashIcon></TrashIcon>
                  </TableData>
                </TableRow>
                <RowSpace></RowSpace>
                <TableRow>
                  <TableData class="">Ohio</TableData>
                  <TableData class="">Columbus</TableData>
                </TableRow>
                <RowSpace></RowSpace>
                <TableRow>
                  <TableData class="">Michigan</TableData>
                  <TableData class="">DeTableRowoit</TableData>
                </TableRow>
              </TableBody>
            </TableProduct>
            <TotalContainer>
              <Heading14>Tổng tiền giỏ hàng</Heading14>
              <FlexContainer>
                <Text14>Số sản phẩm</Text14>
                <Heading14>1</Heading14>
              </FlexContainer>
              <FlexContainer>
                <Text14>Thành tiền</Text14>
                <Heading14>{formatter.format(300000)} đ</Heading14>
              </FlexContainer>
              <FlexContainer>
                <Text14>Tạm tính</Text14>
                <Heading14>{formatter.format(300000)} đ</Heading14>
              </FlexContainer>
              <PinkButton>Đặt hàng</PinkButton>

            </TotalContainer>
          </ListProductContainer>

        </ContentContainer>
        <Footer></Footer>
      </Body>
    </PageContainer>
  );
}

export default CartPage;
