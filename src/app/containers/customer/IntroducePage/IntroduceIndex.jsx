import React from "react";
import { Routes, Route } from "react-router-dom";
import IntroducePage from "./pages/IntroducePage";

const IntroduceIndex = () => {
  return (
    <div>
      <Routes>
        <Route index element={<IntroducePage />}></Route>
      </Routes>
    </div>
  );
};

export default IntroduceIndex;