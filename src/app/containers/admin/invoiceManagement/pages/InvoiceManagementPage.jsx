import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage';
import InvoiceModal from '../component/InvoiceModal';
import InvoiceTable from '../component/InvoiceTable';
import { getAllInvoiceByAdmin } from '../InvoiceSlice';
import excelIcon from "../../../../assets/images/excelIcon.png";
import { GreenBorderButton } from '../../../../sharedComponents/button';
import InvoiceApi from '../../../../api/invoiceApi';

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
const ButtonGroup = styled.div`
  ${tw` flex flex-row items-center gap-4`}
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
  
  const handleExport = () => {
    InvoiceApi.exportFile(adminToken).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoices.xlsx");
      link.click();
    });
  };
  return (
    <>
    <MainDash>
      <Heading30>Invoice Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
        <ButtonGroup>
          <GreenBorderButton onClick={handleExport}>
                <img className="w-6 h-6" src={excelIcon}></img>
                Export
          </GreenBorderButton>
        </ButtonGroup>
      </FlexContainer>
      <ScrollContainer>
        <InvoiceTable listInvoice={listInvoice}></InvoiceTable>
      </ScrollContainer>
      <PagingComponent type={"invoiceByAdmin"} pageCount={listInvoice?.totalPage}></PagingComponent>
    </MainDash>
    {isShow && <InvoiceModal></InvoiceModal>}
  </>
);
}

export default InvoiceManagementPage