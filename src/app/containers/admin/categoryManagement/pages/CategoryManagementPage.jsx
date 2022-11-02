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

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between`}
`;
function CategoryManagementPage() {
  const { listCategories, isShow, loading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getAllCategoriesByAdmin();
    dispatch(action);
  }, []);

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
        <TableBrand listCategories={listCategories}></TableBrand>
      </MainDash>
      {isShow && <CategoryModal></CategoryModal>}
    </>
  );
}

export default CategoryManagementPage;
