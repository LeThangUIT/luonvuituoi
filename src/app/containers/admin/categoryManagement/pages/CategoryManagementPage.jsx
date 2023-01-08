import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import {
  AddButton,
  GreenBorderButton,
} from "../../../../sharedComponents/button";
import { Heading30 } from "../../../../sharedComponents/text";
import { MainDash } from "../../components/MainDash/MainDash";
import { getAllCategoriesByAdmin, showCategoryModal } from "../categorySlice";
import TableBrand from "../components/TableCategory";
import CategoryModal from "../components/CategoryModal";
import PagingComponent from "../../../../sharedComponents/pagination/PagingComponent";
import { ScrollContainer, SearchBox } from "../../productManagement/pages/ProductManagementPage";
import { UilImport } from "@iconscout/react-unicons";
import excelIcon from "../../../../assets/images/excelIcon.png";
import ImportModal from "../components/ImportModal";
import CategoryApi from "../../../../api/categoryApi";
import { useState } from "react";

const FlexContainer = styled.div`
  ${tw` flex flex-row items-center justify-between gap-16`}
`;

const ButtonGroup = styled.div`
  ${tw` flex flex-row items-center gap-4`}
`;
function CategoryManagementPage() {
  const adminToken = localStorage.getItem("adminToken");
  const { listCategories, isShow, loading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  const [value, setValue] = useState(""); //keyword
  useEffect(() => {
    dispatch(
      getAllCategoriesByAdmin({
        adminToken,
        page: "1",
        perPage: "8",
        keyword: value,
      })
    );
  }, [value]);

  const handleAdd = () => {
    dispatch(showCategoryModal({ isUpdate: false, data: null }));
  };

  const [showImport, setShowImport] = useState(false);
  const handleImport = () => {
    setShowImport(true);
  };

  const handleExport = () => {
    CategoryApi.exportFile(adminToken).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "categories.xlsx");
      link.click();
    });
  };

  const handleChangeInput = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <MainDash>
        <Heading30>Category Management</Heading30>
        <FlexContainer>
          <span>
            Hiển thị {listCategories?.items?.length} trên{" "}
            {listCategories?.totalCount} danh mục
          </span>
          <SearchBox
            value={value}
            onChange={handleChangeInput}
            placeholder="Tìm danh mục..."
          ></SearchBox>
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
          <TableBrand listCategories={listCategories}></TableBrand>
        </ScrollContainer>
        <PagingComponent
          type={"categoryByAdmin"}
          pageCount={listCategories?.totalPage}
          keyword={value}
        ></PagingComponent>
      </MainDash>
      {isShow && <CategoryModal></CategoryModal>}
      {showImport && (
        <ImportModal
          typeModal="category"
          setShowImport={setShowImport}
        ></ImportModal>
      )}
    </>
  );
}

export default CategoryManagementPage;
