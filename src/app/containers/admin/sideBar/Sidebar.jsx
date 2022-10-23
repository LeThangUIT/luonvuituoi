import React, { useState } from "react";
import "./Sidebar.css";
import {FaHamburger, FaSignOutAlt} from 'react-icons/fa'
import { SidebarData } from "../Data/Data.js";
// import { UilSignOutAlt, UilBars } from '@iconscout/react-unicons';

import { motion } from 'framer-motion';
import { Logo } from "../../../sharedComponents/header/logo";
import { useNavigate } from "react-router-dom";
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
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* burger icon */}
        <FaHamburger></FaHamburger>

      </div>
      <motion.div
        className="Sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        {/* logo */}
        <Logo></Logo>
        {/* menu */}
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

          <div className="menuItem">
            {/* Sign out Icon */}
            <FaSignOutAlt className="icon"></FaSignOutAlt>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
