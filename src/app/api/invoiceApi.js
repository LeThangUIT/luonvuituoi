import axios from "axios";
import { ADMIN_API_URL, API_URL, USER_API_URL } from "../constant";


class invoiceApi {
  addInvoice = async ({userToken, data}) => {
    const url = `${USER_API_URL}/invoice`;
    return await axios.post(url, data, {
        headers: {
            Authorization: "Bearer " + userToken,
          },
    })
  };

  getAllInvoiceByAdmin = async ({page, perPage, adminToken}) => {
    const url = `${ADMIN_API_URL}/invoice`;
    return await axios.get(url, {
      params: {
        page, 
        perPage,
      },
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  updateInvoice = ({id, status, adminToken}) => {
    const url = `${ADMIN_API_URL}/invoice/${id}`;
    return axios.put(url, {status: status}, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };
}

const InvoiceApi = new invoiceApi();
export default InvoiceApi;
