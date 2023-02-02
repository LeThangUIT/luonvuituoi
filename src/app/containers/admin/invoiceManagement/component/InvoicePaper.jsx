import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { formatDate, formatter } from '../../../../sharedComponents/format'
import { Logo } from '../../../../sharedComponents/header/logo'
import { Image, ImageBox, Table, TableBody, TableData, TableHead, TableHeading, TableNameData, TableRow, TableRowHead } from '../../../../sharedComponents/table'
import { BoldText14, Heading14, PinkHeading30, Text14, Text20 } from '../../../../sharedComponents/text'

const InvoiceFrame = styled.div`
  ${tw`w-[794px] bg-white m-auto p-8`}
`
const GridContainer = styled.div`
  ${tw` grid grid-cols-10 mb-10`}
`
const LeftColumn = styled.div`
  ${tw` col-start-1 col-span-5 flex flex-col gap-12`}
`
const RightColumn = styled.div`
  ${tw` col-start-7 col-span-4 flex flex-col gap-4`}
`
const InfoGroup = styled.div`
  ${tw` flex flex-col gap-3`}
`
const Cost = styled.div`
  ${tw` flex flex-col gap-2 p-2 bg-primaryColor w-60  ml-auto`}
`
const CostItem = styled.div`
  ${tw` flex flex-row justify-between text-white`}
`
const InvoicePaper = ({invoiceDetail}) => {
  return (
    <InvoiceFrame>
        <GridContainer>
            <LeftColumn>
              <Logo></Logo>
              <InfoGroup>
                <Text20>Khách hàng: {invoiceDetail?.receiverName}</Text20>
                <BoldText14>Điện thoại: {invoiceDetail?.receiverPhone}</BoldText14>
                <BoldText14>Địa chỉ: {invoiceDetail?.receiverAddress}</BoldText14>
              </InfoGroup>
            </LeftColumn>
            <RightColumn>
              <PinkHeading30>Hóa đơn</PinkHeading30> 
              {/* <Text14>No. {invoiceDetail?.id}</Text14> */}
               <InfoGroup>
                <BoldText14>Ngày đặt: {formatDate(invoiceDetail?.orderDate)}</BoldText14>
                <BoldText14>Ngày phát hành: {formatDate(Date.now())}</BoldText14>
                <BoldText14>Thanh toán: {invoiceDetail?.payment}</BoldText14>
              </InfoGroup>
            </RightColumn>
          </GridContainer>
          <Table>
            <TableHead>
              <TableRowHead>
                <TableHeading>STT</TableHeading>
                <TableHeading>Hình ảnh</TableHeading>
                <TableHeading>Tên</TableHeading>
                <TableHeading>Giá</TableHeading>
                <TableHeading>Số lượng</TableHeading>
                <TableHeading>Biến thể</TableHeading>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {invoiceDetail?.details?.map((item, index) => (
                <TableRow key={index}>
                  <TableData>{index+1}</TableData>
                  <TableData>
                        <ImageBox>
                          <Image src={item.imageMain}></Image>
                        </ImageBox>
                      </TableData>
                  <TableNameData>{item.name}</TableNameData>
                  <TableData>{formatter.format(item.price)}</TableData>
                  <TableData>{item.quantity}</TableData>
                  <TableData>
                        {item?.optionValues?.map((op, index) => (
                          <div key={index}>
                            <Heading14>{op.option}: </Heading14>
                            <Text14>{op.value}</Text14>
                            <br />
                          </div>
                        ))}
                      </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Cost>
            <CostItem>
                <span>Tổng</span>
                <span>{formatter.format(invoiceDetail?.total)}</span>
            </CostItem>
            <CostItem>
                <span>Phí vận chuyển</span>
                <span>+ {formatter.format(invoiceDetail?.fee)}</span>
            </CostItem>
            <CostItem>
                <span>Giảm giá</span>
                <span>- {formatter.format(invoiceDetail?.discount)}</span>
            </CostItem>
            <CostItem>
                <b>Thành tiền</b>
                <b>{formatter.format(invoiceDetail?.paid)}</b>
            </CostItem>
          </Cost>
    </InvoiceFrame>
  )
}

export default InvoicePaper