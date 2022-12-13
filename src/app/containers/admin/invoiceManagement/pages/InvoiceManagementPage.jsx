import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage';
import InvoiceTable from '../component/InvoiceTable';
import { getAllInvoiceByAdmin } from '../InvoiceSlice';

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function InvoiceManagementPage() {
  const dispatch = useDispatch()
  const adminToken = localStorage.getItem("adminToken");
  const { listInvoice, isShow, loading } = useSelector(
    (state) => state.invoice
  );
  useEffect(() => {
    dispatch(getAllInvoiceByAdmin({adminToken, page:"1", perPage:"8"}))
  }, [])
  
  return (
    <>
    <MainDash>
      <Heading30>Invoice Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
      </FlexContainer>
      <ScrollContainer>
        <InvoiceTable listInvoice={listInvoice}></InvoiceTable>
      </ScrollContainer>
      <PagingComponent type={"invoiceByAdmin"} pageCount={listInvoice?.totalPage}></PagingComponent>
    </MainDash>
  </>
);
}

export default InvoiceManagementPage