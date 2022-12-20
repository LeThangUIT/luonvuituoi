import React, { useEffect } from "react";
import { toast } from "react-toastify";
import InvoiceApi from "../api/invoiceApi";
function CallbackPayment() {
  const userToken = localStorage.getItem("userToken")
  useEffect(async () => {
    let url = window.location.href;
    let data = url.split("?")[1];
    data = `?` + data;
    try {
      const res = await InvoiceApi.paymentApi({data, token: userToken});
      if(res.data.success) {
        window.location.href = "/checkout/thank"
      }
      else {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.href = "/cart"
      }
    } catch (e) {
      window.location.href = "/"
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

export default CallbackPayment;
