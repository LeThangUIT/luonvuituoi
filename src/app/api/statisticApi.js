import axios from "axios";
import { ADMIN_API_URL } from "../constant";

class statisticApi {
    getStatistic = async (adminToken) => {
        const url = `${ADMIN_API_URL}/statistic`;
        return await axios.get(url, {
            headers: {
                Authorization: "Bearer " + adminToken,
              },
        })
      };
 }
const StatisticApi = new statisticApi();
export default StatisticApi;
