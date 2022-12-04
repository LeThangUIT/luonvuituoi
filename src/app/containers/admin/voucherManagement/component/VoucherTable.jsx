import React from 'react'
import { DeleteButton, UpdateButton } from '../../../../sharedComponents/button'
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '../../../../sharedComponents/table'
import { ButtonGroup } from '../../categoryManagement/components/TableCategory'

function VoucherTable( {listVoucher}) {
    console.log(listVoucher)
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
        <TableRow>
            <TableData>1</TableData>
            <TableData>12</TableData>
            <TableData>
              <ButtonGroup>
                    <UpdateButton>Cập nhật</UpdateButton>
                    <DeleteButton>Xóa</DeleteButton>
              </ButtonGroup>
            </TableData>
        </TableRow>
    </TableBody>
</Table>
  )
}

export default VoucherTable