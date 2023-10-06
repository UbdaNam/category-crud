import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { categoryType } from "../../types/categoryTypes";

interface CategoryData {
  categoryList: categoryType[];
}

const initialState: CategoryData = {
  categoryList: [{ id: 1, title: "Category 1", parentId: null }],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addSubcategory: (state, { payload }: PayloadAction<categoryType>) => {
      state.categoryList.push(payload);
    },
    deleteCategory: (state, { payload }: PayloadAction<number>) => {
      const { categoryList } = state;
      state.categoryList = categoryList.filter(
        (c) => c.id !== payload && c.parentId !== payload
      );
    },
    editCategoryTitle: (
      state,
      { payload }: PayloadAction<{ categoryId: number; newTitle: string }>
    ) => {
      const { categoryId, newTitle } = payload;
      const category = state.categoryList.find(
        (category) => category.id === categoryId
      );
      if (category) {
        category.title = newTitle;
      }
    },
  },
});

export const { addSubcategory, deleteCategory, editCategoryTitle } =
  categorySlice.actions;
export const selectCategoryList = (state: RootState) => state.categories;
export default categorySlice.reducer;
