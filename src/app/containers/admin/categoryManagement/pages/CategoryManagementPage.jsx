import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { AddButton, GreenBorderButton } from "../../../../sharedComponents/button";
import { Heading30 } from "../../../../sharedComponents/text";
import { MainDash } from "../../components/MainDash/MainDash";
import {
  getAllCategoriesByAdmin,
  showCategoryModal,
} from "../categorySlice";
import TableBrand from "../components/TableCategory";
import CategoryModal from "../components/CategoryModal";
import PagingComponent from "../../../../sharedComponents/pagination/PagingComponent";
import { ScrollContainer } from "../../productManagement/pages/ProductManagementPage";
import { UilImport } from '@iconscout/react-unicons'
import excelIcon from "../../../../assets/images/excelIcon.png"
import CategoryApi from "../../../../api/categoryApi";

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;

const ButtonGroup = styled.div`
  ${tw` flex flex-row items-center gap-4`}
`

function CategoryManagementPage() {
  const adminToken = localStorage.getItem("adminToken");
  const { listCategories, isShow, loading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoriesByAdmin({adminToken, page:"1", perPage:"8"}))
  }, [])
  
  const handleAdd = () => {
    dispatch(showCategoryModal({ isUpdate: false, data: null }));
  };

  const handleImport = () => {

  }

  const handleExport = () => {
    CategoryApi.exportFile(adminToken)
  }
  return (
    <>
      <MainDash>
        <Heading30>Category Management</Heading30>
        <FlexContainer>
          <span>Hiển thị 4 trên 10 dòng</span>
          <ButtonGroup>
            <AddButton disabled={loading} onClick={() => handleAdd()}>
              Thêm
            </AddButton>
            <GreenBorderButton onClick={handleExport}>
              <img className="w-6 h-6" src={excelIcon}></img>
              Export
            </GreenBorderButton>
            {/* <GreenBorderButton >
              <UilImport></UilImport>
              Import
            </GreenBorderButton> */}
            <input type="file" accept=".xlsx"></input>
          </ButtonGroup>
        </FlexContainer>
        <ScrollContainer>
          <TableBrand listCategories={listCategories}></TableBrand>
        </ScrollContainer>
        <PagingComponent type={"categoryByAdmin"} pageCount={listCategories?.totalPage}></PagingComponent>
      </MainDash>
      {isShow && <CategoryModal></CategoryModal>}
    </>
  );
}

export default CategoryManagementPage;
