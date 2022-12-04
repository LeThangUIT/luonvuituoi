import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import tw from 'twin.macro'
import { getAllCategoriesByAdmin } from '../../containers/admin/categoryManagement/categorySlice'
import { getAllProducts, getAllProductsByAdmin } from '../../containers/admin/productManagement/productSlice'

const Paginate = styled(ReactPaginate)`
    ${tw` flex w-full gap-3 justify-center`}
`
const Item = styled.button`
    ${tw` px-3 py-1 rounded items-center hover:bg-gray-100 text-sm leading-8`}
`

const PagingComponent = ({type, pageCount}) => {
  const adminToken = localStorage.getItem("adminToken");
  const dispatch = useDispatch()
  const handlePageClick = async (data) => {
    let pageNumber = data.selected + 1
    switch (type) {
        case "product":
            await dispatch(getAllProducts({page:pageNumber, perPage:"2"})) 
            break;
        case "productByAdmin":
            await dispatch(getAllProductsByAdmin({page:pageNumber, perPage:"2", adminToken})) 
            break;
        case "categoryByAdmin":
            await dispatch(getAllCategoriesByAdmin({page:pageNumber, perPage:"2", adminToken})) 
            break;
        case "coupon":
          break;
        case "user":
          break;
        case "invoice":
          break;
        case "notification":
          break;
    }
  }
  return (
    <Paginate
        previousLabel={<Item>Previous</Item>}
        breakLabel="..."
        nextLabel={<Item>Next</Item>}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        activeLinkClassName='px-3 py-1.5 rounded  border border-primaryColor text-primaryColor text-sm '
        activeClassName='flex items-center'
        pageLinkClassName="px-3 py-1.5 rounded  border hover:bg-gray-100 text-sm "
        pageClassName='flex items-center'
        breakLinkClassName="px-3 py-1.5 rounded  border hover:bg-gray-100 text-sm "
        breakClassName='flex items-center'
        onPageChange={handlePageClick}
    ></Paginate>
  )
}

export default PagingComponent