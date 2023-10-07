import { FC } from "react";
import Category from "../../components/category/Category";
import { selectCategoryList } from "../../redux/category/categorySlice";
import { useAppSelector } from "../../redux/hooks";
import { getSubcategories } from "../../utils/subCategoriesHelper";
import "./home.css";

interface HomeProps {
  zoomPercent: number;
}

const Home: FC<HomeProps> = ({ zoomPercent }) => {
  const { categoryList } = useAppSelector(selectCategoryList);
  const root = getSubcategories(null, categoryList);

  return (
    <div
      className="category-tree"
      style={{ transform: `scale(${zoomPercent / 100})` }}
    >
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
