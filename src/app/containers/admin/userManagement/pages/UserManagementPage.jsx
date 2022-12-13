import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import { AddButton } from '../../../../sharedComponents/button';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage';
import UserTable from '../component/UserTable';
import { getAllUsers } from '../UserSlice';


const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function UserManagementPage() {
  const dispatch = useDispatch()
  const adminToken = localStorage.getItem("adminToken");
  const { listUser, isShow, loading } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(getAllUsers({adminToken, page:"1", perPage:"8"}))
  }, [])
  return (
    <>
    <MainDash>
      <Heading30>User Management</Heading30>
      <FlexContainer>
        <span>Hiển thị 4 trên 10 dòng</span>
        {/* <AddButton>Thêm User</AddButton> */}
      </FlexContainer>
      <ScrollContainer>
        <UserTable listUser={listUser}></UserTable>
      </ScrollContainer>
      <PagingComponent type={"userByAdmin"} pageCount={listUser?.totalPage}></PagingComponent>
    </MainDash>
  </>
);
}

export default UserManagementPage