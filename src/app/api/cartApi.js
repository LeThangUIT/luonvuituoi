import axios from "axios";
import { ADMIN_API_URL, API_URL, USER_API_URL } from "../constant";


class cartApi {
  addToCart = async (data) => {
    const {userToken, ...rest} = data
    const url = `${USER_API_URL}/cart`;
    return await axios.post(url, rest, {
        headers: {
            Authorization: "Bearer " + userToken,
          },
    })
  };

  getCart = async (userToken) => {
    const url = `${USER_API_URL}/cart`;
    return await axios.get(url, {
        headers: {
            Authorization: "Bearer " + userToken,
          },
    })
  };

  getCartFromLocal = async (data) => {
    const url = `${API_URL}/cart`
    return await axios.post(url, {items: data})
  }

  deleteCart = async (data) => {
    const {userToken, ...rest} = data
    const url = `${USER_API_URL}/cart`;
    return await axios.delete(url, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
      data: rest
    })
  };

  changeQuantity = async (data) => {
    const {userToken, ...rest} = data
    const url = `${USER_API_URL}/cart`;
    return await axios.put(url,rest, {
        headers: {
            Authorization: "Bearer " + userToken,
          },
    })
  };
}

const CartApi = new cartApi();
export default CartApi;
