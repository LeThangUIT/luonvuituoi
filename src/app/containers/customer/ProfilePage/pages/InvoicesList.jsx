import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import tw from 'twin.macro'
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent'
import { Heading16, Text16 } from '../../../../sharedComponents/text'
import InvoiceTable from '../../../admin/invoiceManagement/component/InvoiceTable'
import { getAllInvoiceByUser } from '../../../admin/invoiceManagement/InvoiceSlice'

const Container = styled.div`
  ${tw` flex flex-col gap-y-4 h-fit-content`}
  `
function InvoicesList() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem("userToken");
  const { listInvoice, isShow, loading } = useSelector(
    (state) => state.invoice
  );
  useEffect(() => {
    dispatch(getAllInvoiceByUser({userToken, page:"1", perPage:"8"}))
  }, [])
  console.log(listInvoice)
  return (
    <Container>
      <Heading16>Danh sách hóa đơn</Heading16>
      {listInvoice?.items.length > 0 ? <>
        <InvoiceTable listInvoice={listInvoice}></InvoiceTable>
        <PagingComponent type={"invoiceByUser"} pageCount={listInvoice?.totalPage}></PagingComponent>
      </> : <Text16>Chưa có hóa đơn nào!</Text16>}
    </Container>
  )
}

export default InvoicesList

