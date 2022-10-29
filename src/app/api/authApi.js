import axios from "axios";
import { API_URL } from "../constant";

class authApi {
    login = (data) => {
        const url = `${API_URL}/auth/login`
        return axios.post(url, data)
    }

    register = (data) => {
        const url = `${API_URL}/auth/register`
        return axios.post(url, data)
    }

    verify = (data) => {
        const url = `${API_URL}/auth/verifyRegister`
        return axios.post(url, data)
    }
}
const AuthApi = new authApi()
export default AuthApi