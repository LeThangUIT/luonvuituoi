import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

const HomeIndex = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export default HomeIndex;
