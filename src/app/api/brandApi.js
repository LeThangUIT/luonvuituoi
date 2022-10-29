import axios from "axios"
import { API_URL } from "../constant"

class brandApi {
    getAllBrands = () => {
        const url = `${API_URL}/category`
        return axios.get(url)
    }
    // Thieu header
    deleteBrand = (param) => {
        const url = `${API_URL}/category/${param}`
        return axios.delete(url)
    }

    addBrand = (newBrand) => {
        const url = `${API_URL}/category`
        return axios.post(url, newBrand)
    }

    updateBrand = (param, brand) => {
        const url = `${API_URL}/category/${param}`
        return axios.put(url, brand, )
    }
}

const BrandApi = new brandApi();
export default BrandApi;