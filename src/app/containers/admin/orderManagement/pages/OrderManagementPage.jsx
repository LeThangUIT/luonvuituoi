import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import OrderTable from '../component/OrderTable';

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function OrderManagementPage() {
  const listOrder = []
  return (
    <>
    <MainDash>
      <Heading30>Order Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
      </FlexContainer>
      <OrderTable listOrder={listOrder}></OrderTable>
      {/* <PagingComponent type={"categoryByAdmin"} pageCount={listCategories?.totalPage}></PagingComponent> */}
    </MainDash>
  </>
);
}

export default OrderManagementPage