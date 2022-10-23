import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sideBar/Sidebar";
import "./Admin.css"
// import styled from "styled-components";
// import tw from "twin.macro";
// import { Logo } from "../../sharedComponents/header/logo";

// const PageContainer = styled.div`
//   ${tw` flex flex-row`}
// `;
// const Navigation = styled.div`
//   ${tw` h-screen bg-primaryColor flex flex-col gap-4 px-4 pt-4`}
// `;
// const NavItem = styled.div`
//   ${tw`flex flex-row justify-between items-center`}
// `;
// const NavText = styled.span`
//   ${tw`
//         not-italic font-medium text-[16px] leading-[19px] text-white 
//     `}
// `;

function Admin() {
  // const navigate = useNavigate();
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <Outlet/>
      </div>
    </div>
    // <PageContainer>
    //   <Navigation>
    //     <Logo onClick={() => navigate("dashboard")}></Logo>
    //     <NavItem onClick={() => navigate("brand")}>
    //       <NavText>Quản lí danh mục</NavText>
    //     </NavItem>
    //     <NavItem onClick={() => navigate("product")}>
    //       <NavText>Quản lí sản phẩm</NavText>
    //     </NavItem>
    //     <NavItem onClick={() => navigate("order")}>
    //       <NavText>Quản lí đơn hàng</NavText>
    //     </NavItem>
    //     {/* <span onClick={handleLogOut}>Đăng xuất</span> */}
    //   </Navigation>
    //   <Outlet></Outlet>
    // </PageContainer>
  );
}

export default Admin;
