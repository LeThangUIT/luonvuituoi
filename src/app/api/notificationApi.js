import axios from "axios";
import { ADMIN_API_URL, API_URL, USER_API_URL } from "../constant";


class notificationApi {

  getAllNotificationsByAdmin = async ({page, perPage, adminToken}) => {
    const url = `${ADMIN_API_URL}/notification`;
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

  getAllNotificationsByCustomer = async ({page, perPage, userToken}) => {
    console.log(page)
    const url = `${USER_API_URL}/notification`;
    return await axios.get(url, {
      params: {
        page, 
        perPage
      },
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  };

  markAsReadByAdmin = async ({id, adminToken}) => {
    const url = `${ADMIN_API_URL}/notification/${id}`
    return await axios.put(url,{}, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  } 
  markAsReadByUser = async ({id, userToken}) => {
    const url = `${USER_API_URL}/notification/${id}`
    return await axios.put(url, {}, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  } 

  markAsReadAllByAdmin = async (adminToken) => {
    const url = `${ADMIN_API_URL}/notification`
    return await axios.put(url,{}, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  } 
  markAsReadAllByUser = async (userToken) => {
    const url = `${USER_API_URL}/notification`
    return await axios.put(url, {}, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
  } 
}

const NotificationApi = new notificationApi();
export default NotificationApi;
