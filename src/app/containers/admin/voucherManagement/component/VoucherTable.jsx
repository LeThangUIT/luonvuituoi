import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { DeleteButton, UpdateButton } from '../../../../sharedComponents/button'
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '../../../../sharedComponents/table'
import { ButtonGroup } from '../../categoryManagement/components/TableCategory'
import { deleteVoucher, showVoucherModal } from '../VoucherSlice'

function VoucherTable( {listVoucher}) {
    console.log(listVoucher)
    const adminToken = localStorage.getItem("adminToken")
    const dispatch = useDispatch()
    const handleDelete = async (id) =>{
      if(window.confirm("Bạn có muốn xóa voucher này không")) {
        var {payload} = await dispatch(deleteVoucher({id, adminToken}))
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
    const handleUpdate = (item) => {
      dispatch(showVoucherModal({isUpdate: true, data: item}))
    }
  return (
    <Table>
    <TableHead>
      <TableRow>
        <TableHeading>Tiêu đề</TableHeading>
        <TableHeading>Mã</TableHeading>
        <TableHeading>Mô tả</TableHeading>
        <TableHeading>Loại voucher</TableHeading>
        <TableHeading>Điều kiện</TableHeading>
        <TableHeading>Giá trị</TableHeading>
        <TableHeading>Ngày bắt đầu</TableHeading>
        <TableHeading>Ngày kết thúc</TableHeading>
        <TableHeading>Tùy biến</TableHeading>
      </TableRow>
    </TableHead>
    <TableBody>
      {listVoucher.map((item, index) => {
        return (
        <TableRow key={index}>
            <TableData>{item.title}</TableData>
            <TableData>{item.code}</TableData>
            <TableData>{item.description}</TableData>
            <TableData>{item.discountType}</TableData>
            <TableData>{item.condition}</TableData>
            <TableData>{item.value}</TableData>
            <TableData>{item.beginDate}</TableData>
            <TableData>{item.endDate}</TableData>
            <TableData>
              <ButtonGroup>
                    <UpdateButton onClick={() => handleUpdate(item)}>Cập nhật</UpdateButton>
                    <DeleteButton onClick={() => handleDelete(item.id)}>Xóa</DeleteButton>
              </ButtonGroup>
            </TableData>
        </TableRow>
        )
      })}
    </TableBody>
</Table>
  )
}

export default VoucherTable