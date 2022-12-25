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
                Phone: <BoldText16>{userInfo?.phone}</BoldText16>
              </Text16>
            )}
            <Text16>
              Status:{" "}
              <BoldText16>
                {userInfo?.isActive ? "active" : "inactive"}
              </BoldText16>
            </Text16>
            <Text16>
              Lock:{" "}
              <BoldText16>{!userInfo?.isLocked ? "open" : "locked"}</BoldText16>
            </Text16>
            <Text16>
              Social login:{" "}
              <BoldText16>{userInfo?.isLoginSocial ? "yes" : "no"}</BoldText16>
            </Text16>
          </Group>
          <Text16>Invoice list:</Text16>
          <Table>
            <TableHead>
              <TableRowHead>
                <TableHeading>SL</TableHeading>
                <TableHeading>Receiver name</TableHeading>
                <TableHeading>Receiver phone</TableHeading>
                <TableHeading>Address</TableHeading>
                <TableHeading>Order date</TableHeading>
                {/* <TableHeading>Subtotal</TableHeading>
                <TableHeading>Fee</TableHeading>
                <TableHeading>Discount</TableHeading> */}
                <TableHeading>Total</TableHeading>
                <TableHeading>Payment</TableHeading>
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
