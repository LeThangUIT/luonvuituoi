import axios from "axios";
import { ADMIN_API_URL, API_URL } from "../constant";

const adminToken = localStorage.getItem("adminToken");

class categoryApi {
  getAllCategorysByAdmin = () => {
    const url = `${ADMIN_API_URL}/category`;
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  deleteCategory = (param) => {
    const url = `${ADMIN_API_URL}/category/${param}`;
    return axios.delete(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  addCategory = (data) => {
    const url = `${ADMIN_API_URL}/category`;
    return axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  updateCategory = (param, data) => {
    const url = `${ADMIN_API_URL}/category/${param}`;
    return axios.put(url, {name: data}, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };
}

const CategoryApi = new categoryApi();
export default CategoryApi;
