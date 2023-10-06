import Category from "../../components/category/Category";
import { selectCategoryList } from "../../redux/category/categorySlice";
import { useAppSelector } from "../../redux/hooks";
import { getSubcategories } from "../../utils/subCategoriesHelper";
import "./home.css";

const Home = () => {
  const { categoryList } = useAppSelector(selectCategoryList);
  const root = getSubcategories(null, categoryList);

  return (
    <div className="category-tree">
      <ul>
        {root.map((rootCategory) => (
          <Category
            key={rootCategory.id}
            category={rootCategory}
            categoryList={categoryList}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
