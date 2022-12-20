import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Body } from "../../../../sharedComponents/body";
import LoadingComponent from "../../../../sharedComponents/loading";
import InvoicePaper from "../../../admin/invoiceManagement/component/InvoicePaper";
import { fetchInvoiceDetailByUser } from "../../../admin/invoiceManagement/InvoiceSlice";
import { ContentContainer } from "../../HomePage/components/content";

function InvoicePage() {
  const dispatch = useDispatch()
  const {invoiceId} = useParams()
  const userToken = localStorage.getItem("userToken")
  const {invoiceDetail} = useSelector((state) => state.invoice)
  const currentURL = window.location.href
  useEffect(() => {
    dispatch(fetchInvoiceDetailByUser({invoiceId, userToken}))
  }, [currentURL])
  return (
    <Body>
      {invoiceDetail ? (
        <>
          <ContentContainer>
            <InvoicePaper invoiceDetail={invoiceDetail}></InvoicePaper>
          </ContentContainer>
        </>
      ) : (
        <LoadingComponent></LoadingComponent>
      )}
    </Body>
  );
}

export default InvoicePage;
