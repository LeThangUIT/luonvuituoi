import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import StatisticApi from "../../../api/statisticApi";

export const getStatistic = createAsyncThunk(
    "statistic/getStatistic",
    async(adminToken) => {
        const res = await StatisticApi.getStatistic(adminToken);
        return res;

    }
)



const StatisticSlice = createSlice({
    name: 'statistic',
    initialState: {
        loading: null,
        data: null,
    },
    reducers:{
    },
    extraReducers: {
        [getStatistic.pending](state) {
            state.loading = true
        },
        [getStatistic.fulfilled](state, action) {
            state.data = action.payload.data.data
            state.loading = false
        },
        [getStatistic.rejected](state) {
            state.loading = false
        },
    }

})

export const { reducer: StatisticReducer, actions } = StatisticSlice;
export default StatisticReducer;

