import React, { useEffect } from "react";
// import Cards from '../component/Cards/Cards'
import { MainDash } from "../../components/MainDash/MainDash";
import { Heading30 } from "../../../../sharedComponents/text";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../statisticSlice";
import styled from "styled-components";
import tw from "twin.macro";
import { formatter } from "../../../../sharedComponents/format";
import { UilUsersAlt, UilStore, UilUsdSquare, UilMoneyWithdrawal} from '@iconscout/react-unicons'


const Cards = styled.div`
  ${tw` grid grid-cols-2 gap-4`}
`;
const Card = styled.div`
  ${tw` relative rounded-lg p-4 h-24 text-white text-[20px] leading-[23px] font-semibold`}
`;
const Icon = styled.div`
  ${tw` absolute top-3 right-3`}
`
function DashBoardPage() {
  const adminToken = localStorage.getItem("adminToken");
  const { data } = useSelector((state) => state.statistic);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStatistic(adminToken));
  }, []);
  if (data) {
    console.log(data);
    return (
      <>
        <MainDash>
          <Heading30>Dashboard Page</Heading30>
          <Cards>
            <Card
              style={{
                background:
                "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
              }}
              >
                <Icon>
                  <UilUsersAlt></UilUsersAlt>
                </Icon>
              Lượng nguời dùng: {data.users}
            </Card>
            <Card style={{
              background: "linear-gradient(180deg, #ff919d 0%, #fc929d 100%)",
              boxShadow: "0px 10px 20px 0px #fdc0c7",
            }}>
              <Icon>
                  <UilStore></UilStore>
              </Icon>
              Số sản phẩm bán được: {data.products}
            </Card>
            <Card style={{
                  background: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                  boxShadow: "0px 10px 20px 0px #f9d59b",
                }}>
                  <Icon>
                    <UilUsdSquare></UilUsdSquare>
                  </Icon>

              Số hóa đơn: {data.invoices}
            </Card>
            <Card style={{
                  background: "linear-gradient(180deg, #7df77d 0%, #6ffa6f 100%)",
                  boxShadow: "0px 10px 20px 0px #a2f7a2",
                }}>
                  <Icon>
                    <UilMoneyWithdrawal></UilMoneyWithdrawal>
                  </Icon>
              Doanh thu: {formatter.format(data.revenues) }
            </Card>
          </Cards>
          {/* <Cards>
            {Object.keys(data).map(function(key, index) {
              return (
                <Card>{key}: {data[key]}</Card>
              )
          })}
          </Cards> */}
        </MainDash>
      </>
    );
  } else {
    return <></>;
  }
}

export default DashBoardPage;
