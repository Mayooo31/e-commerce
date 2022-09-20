import { Fragment, useState } from "react";
import { ProductDataType } from "../../types/types";

import styles from "./Item.module.css";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

type Props = {
  product: ProductDataType | undefined;
};

const Item = ({ product }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {product && (
        <Fragment>
          <div className={styles.container_photos}>
            <img
              src={product.image}
              className={styles.photo}
              onClick={() => setSelectedImage(product.image)}
            />
            <div className={styles.photos}>
              {product.images.map(img => (
                <img src={img} key={img} onClick={() => setSelectedImage(img)} />
              ))}
            </div>
          </div>
          <div className={styles.container_info}>
            <div className={styles.heading}>
              <h1 className={styles.product_name}>{product.product}</h1>
              <div className={styles.stars_avail}>
                <p>
                  Stars: <span>{product.rating}</span>
                </p>
                <p>
                  Availability:{" "}
                  {product.availability ? (
                    <span className={styles.in_stock}>In Stock</span>
                  ) : (
                    <span className={styles.out_of_stock}>Out of Stock</span>
                  )}
                </p>
              </div>
            </div>
            <div>
              <h1>About:</h1>
              <p className={styles.about}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore atque
                ea voluptatum sint delectus totam velit reiciendis vel ipsa, debitis, quas
                deleniti? Fugiat dolorem iusto labore blanditiis nulla perspiciatis harum!
              </p>
              <div className={styles.brand_type}>
                <p>
                  Brand:{" "}
                  {product.brand.map((company, index) => (
                    <span key={company}>
                      {company}
                      {product.brand.length - 1 !== index && ", "}
                    </span>
                  ))}
                </p>
                <p>
                  Type: <span>{product.type}</span>
                </p>
              </div>
            </div>
            <div className={styles.price_buy}>
              <p>
                Price: <span>${product.price}</span>
              </p>
              <button
                onClick={() => {
                  product.availability &&
                    dispatch(
                      cartActions.addToCart({
                        id: product.id,
                        name: product.product,
                        image: product.image,
                        price: product.price,
                      })
                    );
                }}
              >
                <ShoppingCartIcon className={styles.cart_icon} />
              </button>
            </div>
          </div>
        </Fragment>
      )}
      {selectedImage && (
        <Fragment>
          <div
            className={styles.backdrop}
            onClick={() => {
              setSelectedImage(undefined);
            }}
          />
          <div className={styles.backdrop_image}>
            <img src={selectedImage} alt="Keyboard" />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Item;
