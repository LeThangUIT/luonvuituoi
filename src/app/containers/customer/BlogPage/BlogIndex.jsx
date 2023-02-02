import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";


const BlogIndex = () => {
  return (
    <div>
      <Routes>
        <Route index element={<BlogPage />}></Route>
      </Routes>
    </div>
  );
};

export default BlogIndex;