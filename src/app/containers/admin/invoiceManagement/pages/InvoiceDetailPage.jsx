import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Heading30 } from '../../../../sharedComponents/text'
import { MainDash } from '../../components/MainDash/MainDash'
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage'
import InvoicePaper from '../component/InvoicePaper'
import { fetchInvoiceDetailByAdmin } from '../InvoiceSlice'



const InvoiceDetailPage = () => {
  const dispatch = useDispatch()
  const {invoiceId} = useParams()
  const adminToken = localStorage.getItem("adminToken")
  const {invoiceDetail} = useSelector((state) => state.invoice)
  console.log(invoiceDetail)
  const currentURL = window.location.href
  useEffect(() => {
    dispatch(fetchInvoiceDetailByAdmin({invoiceId, adminToken}))
  }, [currentURL])
  return (
    <MainDash>
      <Heading30>Invoice Detail</Heading30>
      <ScrollContainer>
        <InvoicePaper invoiceDetail={invoiceDetail}>
        </InvoicePaper>
      </ScrollContainer>
    </MainDash>
  )
}

export default InvoiceDetailPage