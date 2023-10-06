import { categoryType } from "../types/categoryTypes";

export const getSubcategories = (
  parentId: number | null,
  categoryList: categoryType[]
): categoryType[] => {
  return categoryList.filter((category) => category.parentId === parentId);
};
