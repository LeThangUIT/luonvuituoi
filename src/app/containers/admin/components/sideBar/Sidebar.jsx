import React, { useState } from "react";
import "./Sidebar.css";
import { UilLeftArrowFromLeft, UilBars} from '@iconscout/react-unicons'
import { SidebarData } from "../../Data/Data";

import { motion } from 'framer-motion';
import { Logo } from "../../../../sharedComponents/header/logo/index";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../customer/Auth/authSlice";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(adminLogout())
    navigate('/adminLogin')
  }
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* burger icon */}
        <UilBars></UilBars>

      </div>
      <motion.div
        className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <Logo></Logo>
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => {setSelected(index); navigate(item.path)}}
              >
                <item.icon className="icon" />
                <span>{item.heading}</span>
              </div>
            );
          })}

          <div className="menuItem" onClick={handleLogout}>
            <UilLeftArrowFromLeft className="icon"></UilLeftArrowFromLeft>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
