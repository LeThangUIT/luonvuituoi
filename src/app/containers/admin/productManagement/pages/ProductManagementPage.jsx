import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton } from '../../../../sharedComponents/button';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { getAllCategoriesByAdmin } from '../../categoryManagement/categorySlice';
import { MainDash } from '../../components/MainDash/MainDash';
import ProductModal from '../components/ProductModal';
import ProductTable from '../components/ProductTable';
import { getAllProductsByAdmin, showProductModal } from '../productSlice';

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
export const ScrollContainer = styled.div`
  overflow: auto;
  max-height: 65vh;
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
  const { listProducts, isShow, loading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProductsByAdmin({page:"1", perPage:"8", adminToken}))
    dispatch(getAllCategoriesByAdmin({adminToken, noPagination: "0"}))
  }, [])
  
  const handleAdd = () => {
    dispatch(showProductModal({ isUpdate: false, data: null }));
  };
  return (
    <>
    <MainDash>
        <Heading30>Product Management</Heading30>
        <FlexContainer>
          <span>Hiển thị 4 trên 10 dòng</span>
          <AddButton onClick={() => handleAdd()}>
            Thêm sản phẩm
          </AddButton>
        </FlexContainer>
        <ScrollContainer>
          <ProductTable listProducts={listProducts}></ProductTable>
        </ScrollContainer>
        <PagingComponent type={"productByAdmin"} pageCount={listProducts?.totalPage}></PagingComponent>
      </MainDash>
    {isShow && <ProductModal></ProductModal>}
    
  </>
  )
}

export default ProductManagementPage