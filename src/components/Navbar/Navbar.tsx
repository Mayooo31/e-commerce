import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { CartType, KeyboardsDataType } from "../../types/types";
import { keyboardsData } from "../../data/data";

import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

type Props = {
  setOpenCart: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar = ({ setOpenCart }: Props) => {
  const [addedToCart, setAddedToCart] = useState<string>("");
  const [smallNavbar, setSmallNavbar] = useState<string>("");
  const [searchedResult, setSearchedResult] = useState<KeyboardsDataType>(
    [] as KeyboardsDataType
  );
  const searchRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();
  const cart = useSelector((state: CartType) => state.cart.numberOfItems);

  useEffect(() => {
    setAddedToCart("product_added");
    setTimeout(() => {
      setAddedToCart("");
    }, 200);
  }, [cart]);

  const returnHomeHandler = () => {
    window.location.pathname === "/" ? window.scrollTo(0, 0) : navigate("/");
  };

  window.onscroll = () => {
    window.scrollY > 100 ? setSmallNavbar("small_navbar") : setSmallNavbar("");
  };

  const searchValueHandler = () => {
    const value = searchRef.current.value.toLowerCase();
    if (value.length < 1) return setSearchedResult([]);

    setSearchedResult(
      keyboardsData.filter(item => {
        if (item.product.toLowerCase().includes(value)) return item;
      })
    );
  };

  return (
    <nav className={`${styles.navbar} ${styles[smallNavbar]}`}>
      <div className={styles.navbar_left}>
        <img src={logo} onClick={returnHomeHandler} />
        <div>
          <NavLink
            to="mechanical-keyboards"
            style={{ cursor: "pointer" }}
            className={dataActive =>
              dataActive.isActive ? `${styles.link} ${styles.active}` : `${styles.link}`
            }
          >
            Mechanical Keyboards
          </NavLink>
          <p className={styles.link}>Keycaps</p>
          <p className={styles.link}>Switches</p>
          <p className={styles.link}>Extra</p>
        </div>
      </div>
      <div className={styles.navbar_right}>
        <div className={styles.search}>
          <MagnifyingGlassIcon className={styles.search_icon} />
          <input ref={searchRef} placeholder="Search..." onChange={searchValueHandler} />
          <XMarkIcon
            className={styles.search_delete}
            onClick={() => {
              searchRef.current.value = "";
              setSearchedResult([]);
            }}
          />
          {searchedResult.length > 0 && (
            <div className={styles.searching}>
              {searchedResult.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(`/mechanical-keyboards/${product.id}`);
                    searchRef.current.value = "";
                    setSearchedResult([]);
                  }}
                >
                  <h3>{product.product}</h3>
                  <p>${product.price}</p>
                </div>
              ))}
            </div>
          )}
          {searchedResult.length < 1 && searchRef.current?.value.length > 0 && (
            <div
              className={styles.searching}
              style={{ textAlign: "center", padding: "0.2rem" }}
            >
              <span>No results</span>
            </div>
          )}
        </div>
        <div className={styles.cart} onClick={() => setOpenCart("open")}>
          <ShoppingCartIcon className={styles.cart_icon} />
          <p className={`${styles.cart_quantity} ${styles[addedToCart]}`}>{cart}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
