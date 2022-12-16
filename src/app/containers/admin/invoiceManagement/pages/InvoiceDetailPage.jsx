import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { formatDate, formatter } from '../../../../sharedComponents/format'
import { Logo } from '../../../../sharedComponents/header/logo'
import { Table, TableBody, TableData, TableHead, TableHeading, TableNameData, TableRow, TableRowHead } from '../../../../sharedComponents/table'
import { BoldText14, Heading14, Heading22, Heading30, LightText12, PinkHeading30, Text14, Text20 } from '../../../../sharedComponents/text'
import { MainDash } from '../../components/MainDash/MainDash'
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage'
import { fetchInvoiceDetailByAdmin } from '../InvoiceSlice'

const InvoicePaper = styled.div`
  ${tw`w-[794px] h-[1123px] bg-white m-auto p-8`}
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
const InvoiceDetailPage = () => {
  const dispatch = useDispatch()
  const {invoiceId} = useParams()
  const adminToken = localStorage.getItem("adminToken")
  const {invoiceDetail, invoice} = useSelector((state) => state.invoice)
  useEffect(() => {
    dispatch(fetchInvoiceDetailByAdmin({invoiceId, adminToken}))
  }, [])
  return (
    <MainDash>
      <Heading30>Invoice Detail</Heading30>
      <ScrollContainer>
        <InvoicePaper>
          <GridContainer>
            <LeftColumn>
              <Logo></Logo>
              <InfoGroup>
                <Text20>To, {invoice.user.name}</Text20>
                <BoldText14>M {invoice.user.email}</BoldText14>
                <BoldText14>P {invoice.receiverPhone}</BoldText14>
                <BoldText14>A {invoice.receiverAddress}</BoldText14>
              </InfoGroup>
            </LeftColumn>
            <RightColumn>
              <PinkHeading30>Invoice</PinkHeading30>
              <Text14>No. {invoice.id}</Text14>
              <InfoGroup>
                <BoldText14>Invoice Date: {formatDate(invoice.orderDate)}</BoldText14>
                <BoldText14>Issue Date: {formatDate(Date.now())}</BoldText14>
                <BoldText14>Payment method: {invoice.payment}</BoldText14>
              </InfoGroup>
            </RightColumn>
          </GridContainer>
          <Table>
            <TableHead>
              <TableRowHead>
                <TableHeading>SL</TableHeading>
                <TableHeading>Name</TableHeading>
                <TableHeading>Price</TableHeading>
                <TableHeading>Quantity</TableHeading>
                <TableHeading>Option</TableHeading>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {invoiceDetail.map((item, index) => (
                <TableRow key={index}>
                  <TableData>{index+1}</TableData>
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
                <span>Sub-Total</span>
                <span>{formatter.format(invoice.paid)}</span>
            </CostItem>
            <CostItem>
                <span>Delivery-Fee</span>
                <span>+ {formatter.format(invoice.fee)}</span>
            </CostItem>
            <CostItem>
                <span>Discount</span>
                <span>- {formatter.format(invoice.discount)}</span>
            </CostItem>
            <CostItem>
                <b>Total</b>
                <b>{formatter.format(invoice.total)}</b>
            </CostItem>
          </Cost>
        </InvoicePaper>
      </ScrollContainer>
    </MainDash>
  )
}

export default InvoiceDetailPage