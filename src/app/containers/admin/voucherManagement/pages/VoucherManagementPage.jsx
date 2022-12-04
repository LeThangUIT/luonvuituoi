import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton } from '../../../../sharedComponents/button';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import VoucherTable from '../component/VoucherTable';


const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function VoucherManagementPage() {
  const listVoucher = []
  return (
    <>
    <MainDash>
      <Heading30>Voucher Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
        <AddButton>Thêm voucher</AddButton>
      </FlexContainer>
      <VoucherTable listVoucher={listVoucher}></VoucherTable>
      {/* <PagingComponent type={"categoryByAdmin"} pageCount={listCategories?.totalPage}></PagingComponent> */}
    </MainDash>
  </>
);
}

export default VoucherManagementPage