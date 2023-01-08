import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton, GreenBorderButton } from '../../../../sharedComponents/button';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { getAllCategoriesByAdmin } from '../../categoryManagement/categorySlice';
import { MainDash } from '../../components/MainDash/MainDash';
import ProductModal from '../components/ProductModal';
import ProductTable from '../components/ProductTable';
import { getAllProductsByAdmin, showProductModal } from '../productSlice';
import { UilImport } from "@iconscout/react-unicons";
import excelIcon from "../../../../assets/images/excelIcon.png";
import ProductApi from '../../../../api/productApi';
import ImportModal from '../../categoryManagement/components/ImportModal';
import { SearchBox } from '../../../../sharedComponents/header/searchBox';

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between gap-16`}
`;
const ButtonGroup = styled.div`
  ${tw` flex flex-row items-center gap-4`}
`;
export const ScrollContainer = styled.div`
  flex-grow: 1;
  height: 40%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
    height: 20px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #f7f4ed;
  }

  ::-webkit-scrollbar-thumb {
    background: #e0cbcb;
    border-radius: 100vh;
    border: 1px solid #fdedf2;
  }
`;
function ProductManagementPage() {
  const adminToken = localStorage.getItem("adminToken");
  const { listProducts, isShow, loading, keyword } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("âssd")
    dispatch(getAllCategoriesByAdmin({adminToken, noPagination: "0"}))
  }, [])
  useEffect(() => {
    dispatch(getAllProductsByAdmin({page:"1", perPage:"8", adminToken, keyword}))
  }, [keyword])
  
  const handleAdd = () => {
    dispatch(showProductModal({data: null }));
  };

  const [showImport, setShowImport] = useState(false);
  const handleImport = () => {
    setShowImport(true);
  };

  const handleExport = () => {
    ProductApi.exportFile(adminToken).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.xlsx");
      link.click();
    });
  };

  
  return (
    <>
    <MainDash>
        <Heading30>Product Management</Heading30>
        <FlexContainer>
          <span>Hiển thị {listProducts?.items?.length} trên  {listProducts?.totalCount} sản phẩm</span>
          <SearchBox></SearchBox>
          <ButtonGroup>
            <AddButton disabled={loading} onClick={() => handleAdd()}>
              Thêm
            </AddButton>
            <GreenBorderButton onClick={handleExport}>
              <img className="w-6 h-6" src={excelIcon}></img>
              Export
            </GreenBorderButton>
            <GreenBorderButton onClick={handleImport}>
              <UilImport></UilImport>
              Import
            </GreenBorderButton>
          </ButtonGroup>
        </FlexContainer>
        <ScrollContainer>
          <ProductTable listProducts={listProducts}></ProductTable>
        </ScrollContainer>
        <PagingComponent type={"productByAdmin"} pageCount={listProducts?.totalPage} keyword = {keyword}></PagingComponent>
    </MainDash>
    {isShow && <ProductModal></ProductModal>}
    {showImport && <ImportModal typeModal="product" setShowImport={setShowImport}></ImportModal>}
  </>
  )
}

export default ProductManagementPage