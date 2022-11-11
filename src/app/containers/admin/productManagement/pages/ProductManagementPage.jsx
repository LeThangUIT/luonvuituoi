import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton } from '../../../../sharedComponents/button';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import ProductModal from '../components/ProductModal';
import { showProductModal } from '../productSlice';

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function ProductManagementPage() {
  const { listProducts, isShow, loading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch()
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
      </MainDash>
    {isShow && <ProductModal></ProductModal>}
    
  </>
  )
}

export default ProductManagementPage