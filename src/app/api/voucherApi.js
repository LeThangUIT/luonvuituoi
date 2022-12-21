import axios from "axios";
import { ADMIN_API_URL, API_URL } from "../constant";


class voucherApi {

  getAllVouchersByAdmin = async ({page, perPage, adminToken}) => {
    
    const url = `${ADMIN_API_URL}/coupon`;
    return await axios.get(url, {
      params: {
        page,
        perPage
      },
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  getAllVouchers = () => {
    const url = `${API_URL}/coupon`;
    return axios.get(url);
  };

  deleteVoucher = ({id, adminToken}) => {
    const url = `${ADMIN_API_URL}/coupon/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  addVoucher = ({data, adminToken}) => {
    const url = `${ADMIN_API_URL}/coupon`;
    return axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  updateVoucher = ({id, data, adminToken}) => {
    const url = `${ADMIN_API_URL}/coupon/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  importFile = ({formData, adminToken}) => {
    const url = `${ADMIN_API_URL}/coupon/import`;
    return axios.post(url,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + adminToken,
      },
    });
  };
  exportFile = (adminToken) => {
    const url = `${ADMIN_API_URL}/coupon/export`;
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
      responseType: "blob"
    });
  };
}

const VoucherApi = new voucherApi();
export default VoucherApi;
