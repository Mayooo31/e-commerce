import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { keyboardsData } from "../data/data";
import { ProductDataType } from "../types/types";

import Item from "../components/Item/Item";
import styles from "./Product.module.css";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDataType | undefined>(undefined);

  useEffect(() => {
    setProduct(keyboardsData.find(product => product.id === id?.toString()));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      {product && <Item product={product} />}
      {!product && (
        <div className={styles.error}>
          <h1>Error 404</h1>
          <p>
            Go back to <span onClick={() => navigate("/")}>home</span> !
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default Product;
