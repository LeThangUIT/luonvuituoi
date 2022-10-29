import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import BrandApi from "../../../api/brandApi"
import { HTTP_STATUS } from "../../../constant";

export const getAllBrands = createAsyncThunk(
    "brand/getAllBrands",
    async() => {
        const allBrands = await BrandApi.getAllBrands();
        return allBrands;

    }
)

const BrandSlice = createSlice({
    name: 'brands',
    initialState: {
        loading: null,
        listBrand: []
    },
    reducers:{},
    extraReducers: {
        [getAllBrands.pending](state) {
            state.loading = HTTP_STATUS.PENDING
        },
        [getAllBrands.fulfilled](state, action) {
            state.listBrand = action.payload.data
            state.loading = HTTP_STATUS.FULFILLED
        },
        [getAllBrands.rejected](state) {
            state.loading = HTTP_STATUS.REJECTED
        },
    }

})

export const { reducer: BrandReducer, actions } = BrandSlice;
export const {} = actions;
export default BrandReducer;

