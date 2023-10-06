import { useState, useRef, useEffect } from "react";
import { categoryType } from "../../types/categoryTypes";
import { getSubcategories } from "../../utils/subCategoriesHelper";
import { useAppDispatch } from "../../redux/hooks";
import {
  addSubcategory,
  deleteCategory,
  editCategoryTitle,
} from "../../redux/category/categorySlice";
import "./category.css";

interface CategoryProps {
  category: categoryType;
  categoryList: categoryType[];
}

const Category = ({ category, categoryList }: CategoryProps) => {
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const dispatch = useAppDispatch();
  const subcategories = getSubcategories(category.id, categoryList);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const handleAddSubcategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setIsVisible(true);
  };

  const handleSaveSubcategory = () => {
    const categoryTitle = document.getElementById("categoryTitle")?.textContent;
    if (categoryTitle && categoryTitle.trim() !== "") {
      const newSubcategory = {
        id: Date.now(),
        title: categoryTitle,
        parentId: selectedCategoryId,
      };
      dispatch(addSubcategory(newSubcategory));
      setIsVisible(false);
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(null);
      setIsVisible(false);
    }
  };

  const handleDeleteCategory = (id: number) => {
    dispatch(deleteCategory(id));
  };

  function handleEditCategory(categoryId: number) {
    const titleElement = document.querySelector<HTMLHeadingElement>(
      `#category-${categoryId} h5`
    );
    if (!titleElement) {
      return;
    }
    titleElement.contentEditable = "true";
    titleElement.focus();
    titleElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        titleElement.contentEditable = "false";
        const newTitle = titleElement.textContent?.trim() || "";
        dispatch(editCategoryTitle({ categoryId, newTitle }));
      }
    });
  }

  const handleCancelAddSubcategory = () => {
    setSelectedCategoryId(null);
    setIsVisible(false);
  };

  return (
    <li>
      <div className="content-container" id={`category-${category.id}`}>
        <h5 className="title">{category.title}</h5>
        <button
          className="add-btn"
          onClick={() => handleAddSubcategory(category.id)}
        >
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
        {category.parentId && (
          <>
            <button
              className="edit-btn"
              onClick={() => handleEditCategory(category.id)}
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteCategory(category.id)}
            >
              <i className="fa fa-times-circle" aria-hidden="true"></i>
            </button>
          </>
        )}
      </div>
      {isVisible && subcategories.length === 0 ? (
        <ul>
          <li>
            <div className="content-container">
              <h5
                ref={titleRef}
                contentEditable
                className="title"
                id="categoryTitle"
              ></h5>
              <button className="save-btn" onClick={handleSaveSubcategory}>
                <i className="fa fa-check-circle" aria-hidden="true"></i>
              </button>
              <button
                className="cancel-btn"
                onClick={handleCancelAddSubcategory}
              >
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </div>
          </li>
        </ul>
      ) : isVisible && subcategories.length > 0 ? (
        <ul>
          <li>
            <div className="content-container">
              <h5
                contentEditable
                className="title"
                id="categoryTitle"
                ref={titleRef}
              ></h5>
              <button className="save-btn" onClick={handleSaveSubcategory}>
                <i className="fa fa-check-circle" aria-hidden="true"></i>
              </button>
              <button
                className="cancel-btn"
                onClick={handleCancelAddSubcategory}
              >
                <i className="fa fa-times-circle" aria-hidden="true"></i>
              </button>
            </div>
          </li>
          {subcategories.map((subcategory) => (
            <Category
              key={subcategory.id}
              category={subcategory}
              categoryList={categoryList}
            />
          ))}
        </ul>
      ) : subcategories.length > 0 ? (
        <ul>
          {subcategories.map((subcategory) => (
            <Category
              key={subcategory.id}
              category={subcategory}
              categoryList={categoryList}
            />
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default Category;
