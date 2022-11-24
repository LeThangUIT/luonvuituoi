import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import tw from 'twin.macro';
import { DeleteButton, UpdateButton } from '../../../../sharedComponents/button'
import { Table, TableBody, TableData, TableHead, TableHeading, TableNameData, TableRow } from '../../../../sharedComponents/table'
import { deleteCategory, showCategoryModal } from '../categorySlice';


export const ButtonGroup = styled.div`
  ${tw` flex flex-row gap-[10px] flex-wrap`}
`;
function TableCategory({listCategories}) {
  const adminToken = localStorage.getItem("adminToken");
  const dispatch = useDispatch()
  const handleUpdate = (item) => {
    dispatch(showCategoryModal({isUpdate: true, data: item}))
  }
  const handleDelete = async (id) => {
    if(window.confirm("Bạn có muốn xóa danh mục này không")) {
      var {payload} = await dispatch(deleteCategory({id, adminToken}))
    }
    if (!payload.res.data.success) {
      toast.error(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success(payload.res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  return (
    <Table>
        <TableHead>
          <TableRow>
            <TableHeading>STT</TableHeading>
            <TableHeading>Tên</TableHeading>
            <TableHeading>Tùy biến</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCategories?.items && listCategories.items.map((item, index) => (
            <TableRow key={index}>
                <TableData>{++index}</TableData>
                <TableNameData>{item.name}</TableNameData>
                <TableData>
                    <ButtonGroup>
                        <UpdateButton onClick={() => {handleUpdate(item)}}>Cập nhật</UpdateButton>
                        <DeleteButton onClick={() => {handleDelete(item.id)}}>Xóa</DeleteButton>
                    </ButtonGroup>
                </TableData>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}

export default TableCategory