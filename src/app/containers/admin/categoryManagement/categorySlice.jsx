import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import CategoryApi from "../../../api/categoryApi";

export const getAllCategoriesByAdmin = createAsyncThunk(
    "category/getAllCategoriesByAdmin",
    async(data) => {
        const allCategory = await CategoryApi.getAllCategoriesByAdmin(data);
        return allCategory;

    }
)
export const getAllCategories = createAsyncThunk(
    "category/getAllCategoriesByAdmin",
    async() => {
        const allCategory = await CategoryApi.getAllCategories();
        return allCategory;

    }
)

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async({data, adminToken}, { rejectWithValue }) => {
        try {
            const res = await CategoryApi.addCategory({data, adminToken});
            return {res};
        } 
        catch (err) {
            return rejectWithValue({res: err.response})
        }
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async({category, adminToken}, { rejectWithValue }) => {
        try{
            const res = await CategoryApi.updateCategory({id: category.id,name: category.name, adminToken});
            const data = {category, res}
            return data;
        }
        catch (err) {
            return rejectWithValue({res: err.response})
        }
    }
)

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async( {id, adminToken}) => {
        const res = await CategoryApi.deleteCategory({id, adminToken});
        const data = {id, res}
        return data;
    }
)


const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: null,
        listCategories: null,
        isShow: false,
        isUpdate: null,
        newCategory: null,
        keyword: "",
    },
    reducers:{
        showCategoryModal: (state, action) => {
            state.isShow = true;
            state.isUpdate = action.payload.isUpdate;
            state.newCategory = action.payload.data;
          },
        hideCategoryModal: (state, action) => {
            state.isShow = false;
        },
        setCategoryKeyword: (state, action) => {
            state.keyword = action.payload
        }
    },
    extraReducers: {
        [getAllCategoriesByAdmin.pending](state) {
            state.loading = true
        },
        [getAllCategoriesByAdmin.fulfilled](state, action) {
            state.listCategories = action.payload.data.data
            state.loading = false
        },
        [getAllCategoriesByAdmin.rejected](state) {
            state.loading = false
        },

        [getAllCategories.pending](state) {
            state.loading = true
        },
        [getAllCategories.fulfilled](state, action) {
            state.listCategories = action.payload.data.data
            state.loading = false
        },
        [getAllCategories.rejected](state) {
            state.loading = false
        },

        [addCategory.pending](state) {
            state.loading = true
        },
        [addCategory.fulfilled](state, action) {
            state.listCategories.items.push(action.payload.res.data.data)
            state.loading = false
            state.isShow = false
        },
        [addCategory.rejected](state, action) {
            state.loading = false
        },

        [updateCategory.pending](state) {
            state.loading = true
        },
        [updateCategory.fulfilled](state, action) {
            console.log(action.payload)
            state.loading = false
            state.listCategories.items.forEach((item, index) => {
                if(item.id == action.payload.category.id) {
                    item.name = action.payload.category.name
                }
            })
        },
        [updateCategory.rejected](state) {
            state.loading = false
        },

        [deleteCategory.pending](state) {
            state.loading = true
        },
        [deleteCategory.fulfilled](state, action) {
            state.loading = false
            state.listCategories.items = state.listCategories.items.filter((item, index) => item.id !== action.payload.id)
        },
        [deleteCategory.rejected](state) {
            state.loading = false
        },
    }

})

export const { reducer: CategoryReducer, actions } = CategorySlice;
export const {showCategoryModal, hideCategoryModal, setCategoryKeyword} = actions;
export default CategoryReducer;

