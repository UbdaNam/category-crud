import { FC, MouseEvent, useRef, useState } from "react";
import Category from "../../components/category/Category";
import { selectCategoryList } from "../../redux/category/categorySlice";
import { useAppSelector } from "../../redux/hooks";
import { getSubcategories } from "../../utils/subCategoriesHelper";
import "./home.css";
import { CategoryPositionType } from "../../types/categoryTypes";

interface HomeProps {
  zoomPercent: number;
}

const Home: FC<HomeProps> = ({ zoomPercent }) => {
  const { categoryList } = useAppSelector(selectCategoryList);
  const [position, setPosition] = useState<CategoryPositionType>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const categoryWrapperRef = useRef<HTMLUListElement>(null);

  const root = getSubcategories(null, categoryList);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = ({ movementX, movementY }: MouseEvent) => {
    if (isDragging && categoryWrapperRef.current) {
      let { left, top } = window.getComputedStyle(categoryWrapperRef.current);
      setPosition({
        x: parseInt(left) + movementX,
        y: parseInt(top) + movementY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="category-tree" onMouseUp={handleMouseUp}>
      <ul
        ref={categoryWrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{
          transform: `scale(${zoomPercent / 100})`,
          left: position.x || "inherit",
          top: position.y < -10 ? -10 : position.y,
          cursor: isDragging ? "move" : "default",
        }}
      >
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
