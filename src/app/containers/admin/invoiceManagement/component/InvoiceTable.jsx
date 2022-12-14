import React from 'react'
import { useDispatch } from 'react-redux';
import { AddButton, DetailButton, UpdateButton } from '../../../../sharedComponents/button'
import { formatDate, formatter } from '../../../../sharedComponents/format'
import { Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '../../../../sharedComponents/table'
import { ButtonGroup } from '../../categoryManagement/components/TableCategory';
import { showInvoiceModal } from '../InvoiceSlice';

function InvoiceTable( {listInvoice}) {
  function DeliveryCase(props) {
    switch(props.value) {
      case 0:
        return 'Chờ xử lý';
      case 1:
        return 'Chuẩn bị giao';
      case 2:
        return 'Đang giao';
      case 3:
        return 'Đã giao';
      case 4:
        return 'Đã hủy';
      default:
        return '';
    }
  }
  function PaymentCase(props) {
    switch(props.value) {
      case 0:
        return 'Chưa thanh toán';
      case 1:
        return 'Đã thanh toán';
      case 2:
        return 'Giao dịch lỗi';
      default:
        return '';
    }
  }
  const dispatch = useDispatch()
  const handleUpdate = (item) => {
    dispatch(showInvoiceModal({data: item}))
  }
  return (
    <Table>
    <TableHead>
      <TableRow>
        <TableHeading>Tên khách hàng</TableHeading>
        <TableHeading>Thành tiền</TableHeading>
        <TableHeading>Ngày mua</TableHeading>
        <TableHeading>Hình thức</TableHeading>
        <TableHeading>Giao hàng</TableHeading>
        <TableHeading>Thanh toán</TableHeading>
        <TableHeading>Tùy biến</TableHeading>
      </TableRow>
    </TableHead>
    <TableBody>
    {listInvoice?.items && listInvoice.items.map((item, index) => {
      return(
        <TableRow key={index}>
            <TableData>{item.receiverName}</TableData>
            <TableData>{formatter.format(item.total)}</TableData>
            <TableData>{formatDate(item.orderDate)}</TableData>
            <TableData>{item.payment}</TableData>
            <TableData>
              <DeliveryCase value={item.status}/>
            </TableData>
            <TableData>
              <PaymentCase value={item.payStatus}/>
            </TableData>
            <TableData>
              <ButtonGroup>
                <UpdateButton onClick={() => {handleUpdate(item)}}>Cập nhật</UpdateButton>
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

export default InvoiceTable