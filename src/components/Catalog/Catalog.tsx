import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CatalogDataType } from "../../types/types";

import styles from "./Catalog.module.css";

const Catalog = () => {
  const navigate = useNavigate();
  const catalog = useSelector((state: CatalogDataType) => state.catalog.catalogData);

  const showProductHandler = (id: string) => {
    window.location.pathname === "/"
      ? navigate(`mechanical-keyboards/${id}`)
      : navigate(`${id}`);
  };

  return (
    <div className={styles.container}>
      {catalog.map(product => {
        return (
          <div
            key={product.id}
            className={styles.product}
            onClick={() => {
              showProductHandler(product.id);
            }}
          >
            <h4 className={styles.name}>
              {product.product} - ${product.price}
            </h4>
            <img src={product.image} className={styles.product_image} />
          </div>
        );
      })}
    </div>
  );
};

export default Catalog;
