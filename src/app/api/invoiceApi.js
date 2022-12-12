import axios from "axios";
import { ADMIN_API_URL, API_URL, USER_API_URL } from "../constant";


class invoiceApi {
  addInvoice = async ({userToken, data}) => {
    console.log(data)
    const url = `${USER_API_URL}/invoice`;
    return await axios.post(url, data, {
        headers: {
            Authorization: "Bearer " + userToken,
          },
    })
  };

}

const InvoiceApi = new invoiceApi();
export default InvoiceApi;
