import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthApi from "../api/authApi";
function CallbackApi() {
  const { social } = useParams();
  console.log(social);
  useEffect(async () => {
    let url = window.location.href;
    let data = url.split("?")[1];
    data = `/${social}?` + data;
    console.log(data);
    await AuthApi.callbackSocial(data);
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
