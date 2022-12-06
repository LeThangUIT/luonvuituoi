import axios from "axios";
import { API_URL } from "../constant";

class addressApi {
  getProvince = async (userToken) => {
    const url = `${API_URL}/province`;
    return await axios.get(url
        // , {
        // headers: {
        //     Authorization: "Bearer " + userToken,
        //   },
    // }
    )
  };

  getDistrict = async (provinceId) => {
    console.log(provinceId)
    const url = `${API_URL}/district`
    return await axios.get(url, {
      params: {
        provinceId
      }
    })
  }

  getWard = async (districtId) => {
    const url = `${API_URL}/ward`
    return await axios.get(url, {
      params: {
        districtId
      }
    })
  }

}
const AddressApi = new addressApi();
export default AddressApi;
