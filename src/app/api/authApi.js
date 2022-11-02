import axios from "axios";
import { ADMIN_API_URL, API_URL } from "../constant";

class authApi {
    apiMe = (adminToken) => {
        const url = `${ADMIN_API_URL}/me`
        return axios.get(url,  {
            headers: {
              Authorization: "Bearer " + adminToken,
            },
          })
    }

    login = (data) => {
        const url = `${API_URL}/auth/login`
        return axios.post(url, data)
    }

    adminLogin = (data) => {
        const url = `${API_URL}/auth/admin/login`
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