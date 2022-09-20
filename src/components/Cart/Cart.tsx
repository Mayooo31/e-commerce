import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CartType } from "../../types/types";
import { cartActions } from "../../store/cart";

import {
  ArrowRightIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import styles from "./Cart.module.css";

type Props = {
  openCart: string;
  setOpenCart: React.Dispatch<React.SetStateAction<string>>;
};

const Cart = ({ openCart, setOpenCart }: Props) => {
  const numberOfItems = useSelector((state: CartType) => state.cart.numberOfItems);
  const cartItems = useSelector((state: CartType) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("numberOfItems", JSON.stringify(numberOfItems));
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const total = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className={`${styles.cart} ${styles[openCart]}`}>
      <div className={styles.top}>
        <div className={styles.top_buttons}>
          <button onClick={() => setOpenCart("")} className={styles.close_btn}>
            <ArrowRightIcon className={styles.close_icon} />
          </button>
          <button
            className={styles.close_btn}
            onClick={() => {
              dispatch(cartActions.scrapCart());
            }}
          >
            <TrashIcon className={styles.close_icon} />
          </button>
        </div>
        <h1>Your Cart</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.ordered_items}>
          {cartItems.map(item => (
            <div className={styles.ordered_item} key={item.id}>
              <div className={styles.img_name}>
                <img src={item.image} />
                <h2
                  onClick={() => {
                    setOpenCart("");
                    navigate(`/mechanical-keyboards/${item.id}`);
                  }}
                >
                  {item.name}
                </h2>
              </div>
              <div className={styles.quantity}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    dispatch(cartActions.removeOneItemFromCart(item.id));
                  }}
                >
                  <MinusIcon className={styles.icon_minus} />
                </button>
                <p>x{item.quantity}</p>
                <button
                  className={styles.btn}
                  onClick={() => {
                    dispatch(
                      cartActions.addToCart({
                        id: item.id,
                        name: item.name,
                        image: item.image,
                        price: item.price,
                      })
                    );
                  }}
                >
                  <PlusIcon className={styles.icon_plus} />
                </button>
              </div>
              <div className={styles.price_subtotal}>
                <p>
                  Price: <span>${item.price}</span>
                </p>
                <p>
                  Subtotal: <span>${item.price * item.quantity}</span>
                </p>
              </div>
              <button
                className={styles.btn}
                onClick={() => {
                  dispatch(cartActions.removeAllItemsOfSameProduct(item.id));
                }}
              >
                <XMarkIcon className={styles.icon_delete} />
              </button>
            </div>
          ))}
          {cartItems.length === 0 && (
            <div className={styles.empty}>
              <h1>Your cart is empty...</h1>
            </div>
          )}
        </div>
        <div className={styles.summary}>
          <div className={styles.total}>
            <p>
              Subtotal: <span>${total}</span>
            </p>
            <p>
              Shipping: <span>$5</span>
            </p>
            <p>
              <span>Total: ${total + 5}</span>
            </p>
            <button>Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
