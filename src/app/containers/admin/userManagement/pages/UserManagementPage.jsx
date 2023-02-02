import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import tw from 'twin.macro';
import UserApi from '../../../../api/userApi';
import { AddButton, GreenBorderButton } from '../../../../sharedComponents/button';
import PagingComponent from '../../../../sharedComponents/pagination/PagingComponent';
import { Heading30 } from '../../../../sharedComponents/text';
import { MainDash } from '../../components/MainDash/MainDash';
import { ScrollContainer } from '../../productManagement/pages/ProductManagementPage';
import UserTable from '../component/UserTable';
import { getAllUsers } from '../UserSlice';
import excelIcon from "../../../../assets/images/excelIcon.png";
import { useState } from 'react';
import { SearchBox } from '../../../../sharedComponents/header/searchBox';



const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between gap-16`}
`;

const ButtonGroup = styled.div`
  ${tw` flex flex-row items-center gap-4`}
`;

function UserManagementPage() {
  const dispatch = useDispatch()
  const adminToken = localStorage.getItem("adminToken");
  const { listUser, isShow, loading , keyword} = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllUsers({adminToken, page:"1", perPage:"8", keyword}))
  }, [keyword])

  const handleExport = () => {
    UserApi.exportFile(adminToken).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.xlsx");
      link.click();
    });
  };

  return (
    <>
    <MainDash>
      <Heading30>Quản lý tài khoản</Heading30>
      <FlexContainer>
        <span>Hiển thị {listUser?.items?.length} trên  {listUser?.totalCount} tài khoản</span>
        <SearchBox></SearchBox>
        <ButtonGroup>
          <GreenBorderButton onClick={handleExport}>
                <img className="w-6 h-6" src={excelIcon}></img>
                Export
          </GreenBorderButton>
        </ButtonGroup>
      </FlexContainer>
      <ScrollContainer>
        <UserTable listUser={listUser}></UserTable>
      </ScrollContainer>
      <PagingComponent type={"userByAdmin"} pageCount={listUser?.totalPage} keyword={keyword}></PagingComponent>
    </MainDash>
  </>
);
}

export default UserManagementPage