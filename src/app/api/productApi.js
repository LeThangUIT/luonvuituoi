import axios from "axios";
import { ADMIN_API_URL, API_URL, USER_API_URL } from "../constant";

class propductApi {
  addProduct = ({ data, adminToken }) => {
    const url = `${ADMIN_API_URL}/product`;
    return axios.post(url, data, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  updateProduct = ({productId, data, adminToken }) => {
    const url = `${ADMIN_API_URL}/product/${productId}`;
    return axios.put(url, data, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  getAllProductsByAdmin = ({page, perPage, keyWord, adminToken}) => {
    const url = `${ADMIN_API_URL}/product`;
    return axios.get(url, {
      params: {
        page,
        perPage,
        keyWord
      },
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  getAllProducts = ({page, perPage, keyword, categoryId, orderByPrice}) => {
    const url = `${API_URL}/product`;
    return axios.get(url, {
      params : {
        orderByPrice,
        categoryId,
        page,
        perPage,
        keyword,
      }
    });
  };

  deleteProduct = ({ id, adminToken }) => {
    const url = `${ADMIN_API_URL}/product/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
  };

  getProductDetail = ({userToken, productId}) => {
    const url = `${API_URL}/product/${productId}`
    return axios.get(url,  {
      headers: {
        Authorization: "Bearer " + userToken, }
      })
  }

  getProductDetailByAdmin = ({adminToken, productId}) => {
    const url = `${ADMIN_API_URL}/product/${productId}`
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken, }
      },)
  }

  getOption = (optionValues) => {
    const url = `${API_URL}/option/GetByAnother`
    return axios.post(url, optionValues)
  }

  addReview = ({userToken, data}) => {
    const url = `${USER_API_URL}/review`
    return axios.post(url, data,{
      headers: {
        Authorization: "Bearer " + userToken, }
      })
  }

  importFile = ({formData, adminToken}) => {
    const url = `${ADMIN_API_URL}/product/import`;
    return axios.post(url,formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + adminToken,
      },
    });
  };
  exportFile = (adminToken) => {
    const url = `${ADMIN_API_URL}/product/export`;
    return axios.get(url, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
      responseType: "blob"
    });
  };
}
const ProductApi = new propductApi();
export default ProductApi;
