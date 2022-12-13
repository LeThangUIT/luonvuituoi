import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { AddButton } from "../../../../sharedComponents/button";
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

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
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
  return (
    <>
      <MainDash>
        <Heading30>Category Management</Heading30>
        <FlexContainer>
          <span>Hiển thị 4 trên 10 dòng</span>
          <AddButton disabled={loading} onClick={() => handleAdd()}>
            Thêm danh mục
          </AddButton>
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
