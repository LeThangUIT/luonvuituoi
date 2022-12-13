import React from 'react'
import { AddButton, DeleteButton, DetailButton, UpdateButton } from '../../../../sharedComponents/button'
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '../../../../sharedComponents/table'
import { ButtonGroup } from '../../categoryManagement/components/TableCategory'

function UserTable( {listUser}) {
  return (
    <Table>
    <TableHead>
      <TableRow>
        <TableHeading>Tên</TableHeading>
        <TableHeading>Email</TableHeading>
        <TableHeading>Di động</TableHeading>
        <TableHeading>Trạng thái</TableHeading>
        <TableHeading>Tình trạng</TableHeading>
        <TableHeading>Tùy biến</TableHeading>
      </TableRow>
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
                {item.isLocked ? <AddButton>Mở khóa</AddButton> : <DeleteButton>Khóa</DeleteButton>}
                <DetailButton>Chi tiết</DetailButton>
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