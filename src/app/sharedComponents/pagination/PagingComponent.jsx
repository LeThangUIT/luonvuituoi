import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from "twin.macro";
import { getAllCategoriesByAdmin } from "../../containers/admin/categoryManagement/categorySlice";
import {
  getAllInvoiceByAdmin,
  getAllInvoiceByUser,
} from "../../containers/admin/invoiceManagement/InvoiceSlice";
import {
  getAllProducts,
  getAllProductsByAdmin,
} from "../../containers/admin/productManagement/productSlice";
import { getAllUsers } from "../../containers/admin/userManagement/UserSlice";
import { getAllVouchersByAdmin } from "../../containers/admin/voucherManagement/VoucherSlice";

const Paginate = styled(ReactPaginate)`
  ${tw` flex w-full gap-3 justify-center`}
`;
const Item = styled.button`
  ${tw` px-3 py-1 rounded items-center hover:bg-gray-100 text-sm leading-8`}
`;

const PagingComponent = ({ type, pageCount, categoryId, orderByPrice, keyword }) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  const dispatch = useDispatch();
  const handlePageClick = async (data) => {
    console.log(data.selected)
    let pageNumber = data.selected + 1;
    switch (type) {
      case "product":
        await dispatch(
          getAllProducts({
            page: pageNumber,
            perPage: "8",
            categoryId,
            orderByPrice,
            keyword
          })
        );
        break;
      case "productByAdmin":
        await dispatch(
          getAllProductsByAdmin({ page: pageNumber, perPage: "8", adminToken, keyword })
        );
        break;
      case "categoryByAdmin":
        await dispatch(
          getAllCategoriesByAdmin({
            page: pageNumber,
            perPage: "8",
            adminToken,
            keyword
          })
        );
        break;
      case "voucherByAdmin":
        await dispatch(
          getAllVouchersByAdmin({ page: pageNumber, perPage: "8", adminToken })
        );
        break;
      case "userByAdmin":
        await dispatch(
          getAllUsers({ page: pageNumber, perPage: "8", adminToken, keyword})
        );
        break;
      case "invoiceByAdmin":
        await dispatch(
          getAllInvoiceByAdmin({ page: pageNumber, perPage: "8", adminToken })
        );
        break;
      case "invoiceByUser":
        await dispatch(
          getAllInvoiceByUser({ page: pageNumber, perPage: "8", userToken })
        );
        break;
      case "notification":
        break;
    }
  };
  return (
    <Paginate
      previousLabel={<Item>Previous</Item>}
      breakLabel="..."
      nextLabel={<Item>Next</Item>}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      activeLinkClassName="px-3 py-1.5 rounded  border border-primaryColor text-primaryColor text-sm "
      activeClassName="flex items-center"
      pageLinkClassName="px-3 py-1.5 rounded  border hover:bg-gray-100 text-sm "
      pageClassName="flex items-center"
      breakLinkClassName="px-3 py-1.5 rounded  border hover:bg-gray-100 text-sm "
      breakClassName="flex items-center"
      onPageChange={handlePageClick}
    ></Paginate>
  );
};

export default PagingComponent;
