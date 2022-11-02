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
import { Image, ImageBox, RowSpace, Table, TableBody, TableData, TableHead, TableHeading, TableNameData, TableRow } from "../../../../sharedComponents/table";

const Body = styled.div`
  ${tw`
        flex flex-col items-start absolute top-[40px] md:top-[137px] left-0 right-0 w-full
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
            <Table>
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
            </Table>
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
