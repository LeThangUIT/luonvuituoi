import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton } from '../../../../sharedComponents/button';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage';
import VoucherModal from '../component/VoucherModal';
import VoucherTable from '../component/VoucherTable';
import { getAllVouchersByAdmin, showVoucherModal } from '../VoucherSlice';


const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function VoucherManagementPage() {
  const adminToken = localStorage.getItem("adminToken")
  const {isShow, listVoucher} = useSelector(state => state.voucher)
  const dispatch = useDispatch()
  const handleAdd = () => {
    dispatch(showVoucherModal({ isUpdate: false, data: null }));
  };
  useEffect(() => {
    dispatch(getAllVouchersByAdmin({page:"1", perPage:"8", adminToken}))
  }, [])
  
  return (
    <>
    <MainDash>
      <Heading30>Voucher Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
        <AddButton onClick={handleAdd}>Thêm voucher</AddButton>
      </FlexContainer>
      <ScrollContainer>
        <VoucherTable listVoucher={listVoucher}></VoucherTable>
      </ScrollContainer>
      <PagingComponent type={"voucherByAdmin"} pageCount={listVoucher?.totalPage}></PagingComponent>
    </MainDash>
    {isShow && <VoucherModal></VoucherModal>}
  </>
);
}

export default VoucherManagementPage