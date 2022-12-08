import axios from "axios";
import { ADMIN_API_URL, API_URL } from "../constant";


class voucherApi {

  getAllVouchersByAdmin = async (adminToken) => {
    const url = `${ADMIN_API_URL}/coupon`;
    return await axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

//   getAllCategories = () => {
//     const url = `${API_URL}/category`;
//     return axios.get(url);
//   };

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
    const url = `${ADMIN_API_URL}/category/${id}`;
    return axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };
}

const VoucherApi = new voucherApi();
export default VoucherApi;
