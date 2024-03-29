import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddButton, DeleteButton, DetailButton, UpdateButton } from '../../../../sharedComponents/button'
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow, TableRowHead } from '../../../../sharedComponents/table'
import { ButtonGroup } from '../../categoryManagement/components/TableCategory'
import { lockUser } from '../UserSlice'

function UserTable( {listUser}) {
  const dispatch = useDispatch()
  const adminToken = localStorage.getItem("adminToken")
  const handleLock = async ({id, isLocked}) => {
    if(window.confirm("Bạn có chắc chắn không?")) {
      var {payload} = await dispatch(lockUser({user: {id, isLocked}, adminToken}))
    }
    // if (!payload.res.data.success) {
    //   toast.error(payload.res.data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // } else {
    //   toast.success(payload.res.data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
  }
  const navigate = useNavigate()
  return (
    <Table>
    <TableHead>
      <TableRowHead>
        <TableHeading>Tên</TableHeading>
        <TableHeading>Email</TableHeading>
        <TableHeading>Điện thoại</TableHeading>
        <TableHeading>Trạng thái</TableHeading>
        <TableHeading>Tình trạng</TableHeading>
        <TableHeading>Tùy biến</TableHeading>
      </TableRowHead>
    </TableHead>
    <TableBody>
    {listUser?.items && listUser.items.map((item, index) => {
      return(
        <TableRow key={index}>
            <TableData>{item.name}</TableData>
            <TableData>{item.email}</TableData>
            <TableData>{item.phone ? item.phone : "Chưa thêm"}</TableData>
            <TableData>{item.isActive ? "Hoạt động" : "Không hoạt động"}</TableData>
            <TableData>{!item.isLocked ? "Mở" : "Khóa"}</TableData>
            <TableData>
              <ButtonGroup>
                {item.isLocked ? <AddButton onClick={() => handleLock({id: item.id, isLocked: false})}>Mở khóa</AddButton> : <DeleteButton onClick={() => handleLock({id: item.id, isLocked: true})}>Khóa</DeleteButton>}
                <DetailButton onClick={() => navigate(`${item.id}`)}>Chi tiết</DetailButton>
              </ButtonGroup>
            </TableData>
        </TableRow>
      )
    })}
    </TableBody>
</Table>
  )
}

export default UserTable