import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { categoryType } from "../../types/categoryTypes";

interface CategoryData {
  categoryList: categoryType[];
}

const initialState: CategoryData = {
  categoryList: [
    { id: 1, title: "Category 1", parentId: null },
    { id: 2, title: "Subcategory 1", parentId: 1 },
    { id: 3, title: "Subcategory 2", parentId: 1 },
    { id: 5, title: "Subcategory 3", parentId: 3 },
    { id: 6, title: "Subcategory 3", parentId: 3 },
    { id: 7, title: "Subcategory 3", parentId: 3 },
  ],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export const {} = categorySlice.actions;
export const selectCategoryList = (state: RootState) => state.categories;
export default categorySlice.reducer;
