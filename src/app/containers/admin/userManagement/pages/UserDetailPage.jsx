import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { formatDate, formatter } from "../../../../sharedComponents/format";
import avatar from "../../../../assets/images/avatar.png"
import { Avatar } from "../../../../sharedComponents/header/rightHeader/RightHeader";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableNameData,
  TableRow,
  TableRowHead,
} from "../../../../sharedComponents/table";
import {
  BoldText16,
  Heading22,
  Heading30,
  Text16,
} from "../../../../sharedComponents/text";
import { MainDash } from "../../components/MainDash/MainDash";
import { ScrollContainer } from "../../productManagement/pages/ProductManagementPage";
import { fetchUserInfoByAdmin } from "../UserSlice";

const Container = styled.div`
  ${tw` flex flex-col gap-4 `}
`;
const AvatarGroup = styled.div`
  ${tw`
        flex items-center space-x-2.5 
    `}
`;
const Group = styled.div`
  ${tw` flex flex-row justify-between flex-wrap w-2/4 gap-4`}
`;
const UserDetailPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const adminToken = localStorage.getItem("adminToken");
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserInfoByAdmin({ userId, adminToken }));
  }, []);
  return (
    <MainDash>
      <Heading30>User Detail</Heading30>
      <ScrollContainer>
        <Container>
          <AvatarGroup>
            <Avatar src={userInfo?.avatar || avatar} />
            <Heading22>{userInfo?.name}</Heading22>
          </AvatarGroup>
          <Group>
            <Text16>
              Email: <BoldText16>{userInfo?.email}</BoldText16>
            </Text16>
            {userInfo?.phone && (
              <Text16>
                Điện thoại: <BoldText16>{userInfo?.phone}</BoldText16>
              </Text16>
            )}
            <Text16>
              Trạng thái:{" "}
              <BoldText16>
                {userInfo?.isActive ? "hoạt động" : "không hoạt động"}
              </BoldText16>
            </Text16>
            <Text16>
              Khóa:{" "}
              <BoldText16>{!userInfo?.isLocked ? "mở" : "đã khóa"}</BoldText16>
            </Text16>
            <Text16>
              Đăng nhập bằng mạng xã hội:{" "}
              <BoldText16>{userInfo?.isLoginSocial ? "có" : "không"}</BoldText16>
            </Text16>
          </Group>
          <Text16>Invoice list:</Text16>
          <Table>
            <TableHead>
              <TableRowHead>
                <TableHeading>STT</TableHeading>
                <TableHeading>Tên</TableHeading>
                <TableHeading>Điện thoại</TableHeading>
                <TableHeading>Địa chỉ</TableHeading>
                <TableHeading>Ngày đặt</TableHeading>
                {/* <TableHeading>Subtotal</TableHeading>
                <TableHeading>Fee</TableHeading>
                <TableHeading>Discount</TableHeading> */}
                <TableHeading>Thành tiền</TableHeading>
                <TableHeading>Thanh toán</TableHeading>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {userInfo?.invoices.items.map((item, index) => (
                <TableRow key={index}>
                  <TableData>{index+1}</TableData>
                  <TableData>{item.receiverName}</TableData>
                  <TableData>{item.receiverPhone}</TableData>
                  <TableNameData>{item.receiverAddress}</TableNameData>
                  <TableData>{formatDate(item.orderDate)}</TableData>
                  <TableData>{formatter.format(item.paid)}</TableData>
                  <TableData>{item.payment}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Container>
      </ScrollContainer>
    </MainDash>
  );
};

export default UserDetailPage;
