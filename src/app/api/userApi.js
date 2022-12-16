import axios from "axios";
import { ADMIN_API_URL, API_URL, USER_API_URL } from "../constant";


class userApi {

  getAllUsers = async ({page, perPage, adminToken}) => {
    const url = `${ADMIN_API_URL}/user`;
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

  lockUser = ({id, isLocked, adminToken}) => {
    const url = `${ADMIN_API_URL}/user/${id}`;
    return axios.put(url, {isLocked: isLocked}, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  getProductDetailByAdmin = ({adminToken, productId}) => {
    const url = `${ADMIN_API_URL}/product/${productId}`
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken, }
      },)
  }

  getUserInfoByAdmin = ({adminToken, userId}) => {
    const url = `${ADMIN_API_URL}/user/${userId}`
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken, }
      },)
  }

}

const UserApi = new userApi();
export default UserApi;
