import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { catalogActions } from "../../store/catalog";
import { categoryArr } from "../../data/data";
import { CatalogDataType } from "../../types/types";

import styles from "./Panel.module.css";

const Panel = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: CatalogDataType) => state.catalog.selectedCategory
  );

  useEffect(() => {
    window.location.pathname === "/"
      ? dispatch(catalogActions.filter("new"))
      : dispatch(catalogActions.filter("all"));
  }, []);

  const goToCategoryHandler = (id: string) => {
    dispatch(catalogActions.filter(id));
  };

  return (
    <div className={styles.container}>
      {categoryArr.map((category, index) => {
        return (
          <Fragment key={category}>
            <p
              className={
                selectedCategory.toLowerCase() === category.toLowerCase()
                  ? `${styles.selected}`
                  : ""
              }
              onClick={() => {
                goToCategoryHandler(category);
              }}
            >
              {category}
            </p>{" "}
            {categoryArr.length - 1 !== index && <span>|</span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Panel;
