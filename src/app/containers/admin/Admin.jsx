import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar/Sidebar";
import "./Admin.css";
import RightSide from "./components/RightSide/RightSide";
import { useDispatch } from "react-redux";
import { getAllCategoriesByAdmin } from "./categoryManagement/categorySlice";

function Admin() {
  const dispatch = useDispatch()
  const adminToken = localStorage.getItem("adminToken")
  useEffect(() => {
    console.log("first")
    dispatch(getAllCategoriesByAdmin(adminToken))
  }, [])
  
  return (
        <div className="App">
          <div className="AppGlass">
            <Sidebar />
            <Outlet />
            <RightSide />
          </div>
        </div>
  );
}

export default Admin;
