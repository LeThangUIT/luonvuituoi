import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApi from "../api/authApi";
function CallbackApi() {
  const { social } = useParams();
  useEffect(async () => {
    let url = window.location.href;
    let data = url.split("?")[1];
    data = `/${social}?` + data;
    try {
      const res = await AuthApi.callbackSocial(data);
      localStorage.setItem("userToken", res.data.data)
      window.location.href = localStorage.getItem("currentPath")
    } catch (e) {
      window.location.href = "/login"
    }

  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Đang tải ...
    </div>

  );
}

export default CallbackApi;
