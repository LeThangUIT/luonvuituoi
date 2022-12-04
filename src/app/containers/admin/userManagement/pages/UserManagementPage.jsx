import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton } from '../../../../sharedComponents/button';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import UserTable from '../component/UserTable';


const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function UserManagementPage() {
  const listUser = []
  return (
    <>
    <MainDash>
      <Heading30>User Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
        <AddButton>Thêm User</AddButton>
      </FlexContainer>
      <UserTable listUser={listUser}></UserTable>
      {/* <PagingComponent type={"categoryByAdmin"} pageCount={listCategories?.totalPage}></PagingComponent> */}
    </MainDash>
  </>
);
}

export default UserManagementPage