import axios from "axios";
import { USER_API_URL } from "../constant";

class addressApi {
  getProvince = async (userToken) => {
    const url = `${USER_API_URL}/province`;
    return await axios.get(url, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  };

  getDistrict = async ({provinceId, userToken}) => {
    console.log(provinceId);
    const url = `${USER_API_URL}/district`;
    return await axios.get(url, {
      params: {
        provinceId,
      },
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  };

  getWard = async ({districtId, userToken}) => {
    const url = `${USER_API_URL}/ward`;
    return await axios.get(url, {
      params: {
        districtId,
      },
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  };

  getTransportFee = async ({wardId, userToken}) => {
    const url = `${USER_API_URL}/fee`;
    return await axios.get(url, {
      params: {
        wardId,
      },
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  };
}
const AddressApi = new addressApi();
export default AddressApi;
