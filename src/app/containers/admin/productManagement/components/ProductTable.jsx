import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../../../sharedComponents/button";
import {
  Image,
  ImageBox,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableNameData,
  TableRow,
  TableRowHead,
} from "../../../../sharedComponents/table";
import { ButtonGroup } from "../../categoryManagement/components/TableCategory";
import { deleteProduct } from "../productSlice";

function ProductTable({ listProducts }) {
  const adminToken = localStorage.getItem("adminToken");
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có muốn xóa sản phẩm này không")) {
      var { payload } = await dispatch(deleteProduct({ id, adminToken }));
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
  };
  const handleUpdate = () => {};
  const navigate = useNavigate()
  const handProductDetail = (id) => {
    navigate(`${id}`)
  }
  return (
      <Table>
        <TableHead>
          <TableRowHead>
            <TableHeading>Hình ảnh</TableHeading>
            <TableHeading>Tên</TableHeading>
            <TableHeading>Danh mục</TableHeading>
            <TableHeading>Giá</TableHeading>
            <TableHeading>Số lượng</TableHeading>
            <TableHeading>Tùy biến</TableHeading>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {listProducts &&
            listProducts.items.map((item, index) => (
              <TableRow key={index}>
                <TableData>
                  <ImageBox>
                    <Image src={item.imageMain}></Image>
                  </ImageBox>
                </TableData>
                <TableNameData>{item.name}</TableNameData>
                <TableData>{item.category?.name}</TableData>
                <TableData>{item.price}</TableData>
                <TableData>{item.quantity}</TableData>
                <TableData>
                  <ButtonGroup>
                    {/* <UpdateButton
                      onClick={() => {
                        handleUpdate(item);
                      }}
                    >
                      Cập nhật
                    </UpdateButton> */}
                    <DeleteButton
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Xóa
                    </DeleteButton>
                    <DetailButton onClick={() => handProductDetail(item.id)}>Chi tiết</DetailButton>
                  </ButtonGroup>
                </TableData>
              </TableRow>
            ))}
        </TableBody>
      </Table>
  );
}

export default ProductTable;
