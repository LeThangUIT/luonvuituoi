import React from 'react'
import { UpdateButton } from '../../../../sharedComponents/button'
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '../../../../sharedComponents/table'

function OrderTable( {listOrder}) {
    console.log(listOrder)
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
                    <UpdateButton>Chi tiết</UpdateButton>
            </TableData>
        </TableRow>
    </TableBody>
</Table>
  )
}

export default OrderTable