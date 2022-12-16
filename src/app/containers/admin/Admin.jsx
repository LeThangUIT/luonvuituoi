import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar/Sidebar";
import "./Admin.css";
import RightSide from "./components/RightSide/RightSide";

function Admin() {  
  return (
        <div className="App">
          <div className="AppGlass">
            <Sidebar />
            <Outlet />
            {/* <RightSide /> */}
          </div>
        </div>
  );
}

export default Admin;
