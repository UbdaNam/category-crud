import { categoryType } from "../types/categoryTypes";
import { getSubcategories } from "../utils/subCategoriesHelper";

interface CategoryProps {
  category: categoryType;
  categoryList: categoryType[];
}

const Category = ({ category, categoryList }: CategoryProps) => {
  const subcategories = getSubcategories(category.id, categoryList);

  return (
    <li>
      <div>{category.title}</div>
      {subcategories.length > 0 && (
        <ul>
          {subcategories.map((subcategory) => (
            <Category
              key={subcategory.id}
              category={subcategory}
              categoryList={categoryList}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Category;
