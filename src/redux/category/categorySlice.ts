import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Category = {
  id: number;
  title: string;
  parentId: number;
};

interface CategoryData {
  categoryList: Category[];
}

const initialState: CategoryData = {
  categoryList: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export const {} = categorySlice.actions;
export const selectCategoryList = (state: RootState) =>
  state.categories.categoryList;
export default categorySlice.reducer;
