import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import CategoryApi from "../../../api/categoryApi";

export const getAllCategoriesByAdmin = createAsyncThunk(
    "category/getAllCategoriesByAdmin",
    async() => {
        const allCategory = await CategoryApi.getAllCategorysByAdmin();
        return allCategory;

    }
)

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async( data ) => {
        const newCategory = await CategoryApi.addCategory(data);
        return newCategory;
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async( category ) => {
        const res = await CategoryApi.updateCategory(category.id, category.name);
        const data = {category, res}
        return data;
    }
)

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async( id ) => {
        const res = await CategoryApi.deleteCategory(id);
        const data = {id, res}
        return data;
    }
)


const CategorySlice = createSlice({
    name: 'category',
    initialState: {
        loading: null,
        listCategories: [],
        isShow: false,
        isUpdate: null,
        newCategory: null
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

        [addCategory.pending](state) {
            state.loading = true
        },
        [addCategory.fulfilled](state, action) {
            state.listCategories.push(action.payload.data.data)
            state.loading = false
        },
        [addCategory.rejected](state) {
            state.loading = false
        },

        [updateCategory.pending](state) {
            state.loading = true
        },
        [updateCategory.fulfilled](state, action) {
            console.log(action)
            state.loading = false
            state.listCategories.forEach((item, index) => {
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
            console.log(action)
            state.loading = false
            state.listCategories = state.listCategories.filter((item, index) => item.id !== action.payload.id)
        },
        [deleteCategory.rejected](state) {
            state.loading = false
        },
    }

})

export const { reducer: CategoryReducer, actions } = CategorySlice;
export const {showCategoryModal, hideCategoryModal} = actions;
export default CategoryReducer;

