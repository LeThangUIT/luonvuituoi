import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import VoucherApi from '../../../../api/voucherApi';
import { AddButton, GreenBorderButton } from '../../../../sharedComponents/button';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage';
import VoucherModal from '../component/VoucherModal';
import VoucherTable from '../component/VoucherTable';
import { UilImport } from "@iconscout/react-unicons";
import excelIcon from "../../../../assets/images/excelIcon.png";
import { getAllVouchersByAdmin, showVoucherModal } from '../VoucherSlice';
import ImportModal from '../../categoryManagement/components/ImportModal';

const ButtonGroup = styled.div`
  ${tw` flex flex-row items-center gap-4`}
`;
const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function VoucherManagementPage() {
  const adminToken = localStorage.getItem("adminToken")
  const {isShow, listVoucher, loading} = useSelector(state => state.voucher)
  const dispatch = useDispatch()
  const handleAdd = () => {
    dispatch(showVoucherModal({ isUpdate: false, data: null }));
  };
  useEffect(() => {
    dispatch(getAllVouchersByAdmin({page:"1", perPage:"8", adminToken}))
  }, [])
  
  const [showImport, setShowImport] = useState(false);
  const handleImport = () => {
    setShowImport(true);
  };

  const handleExport = () => {
    VoucherApi.exportFile(adminToken).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "vouchers.xlsx");
      link.click();
    });
  };
  return (
    <>
    <MainDash>
      <Heading30>Quản lý mã khuyến mãi</Heading30>
      <FlexContainer>
      <span>Hiển thị tất cả mã khuyến mãi</span>
        <ButtonGroup>
            <AddButton disabled={loading} onClick={() => handleAdd()}>
              Thêm
            </AddButton>
            <GreenBorderButton onClick={handleExport}>
              <img className="w-6 h-6" src={excelIcon}></img>
              Xuất
            </GreenBorderButton>
            <GreenBorderButton onClick={handleImport}>
              <UilImport></UilImport>
              Nhập
            </GreenBorderButton>
          </ButtonGroup>
      </FlexContainer>
      <ScrollContainer>
        <VoucherTable listVoucher={listVoucher}></VoucherTable>
      </ScrollContainer>
      {/* <PagingComponent type={"voucherByAdmin"} pageCount={listVoucher?.totalPage}></PagingComponent> */}
    </MainDash>
    {isShow && <VoucherModal></VoucherModal>}
    {showImport && <ImportModal typeModal="voucher" setShowImport={setShowImport}></ImportModal>}
  </>
);
}

export default VoucherManagementPage