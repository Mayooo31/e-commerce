import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useState } from "react";
import store from "./store/store";

import Sale from "./components/Sale/Sale";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Keyboards from "./pages/Keyboards";
import Product from "./pages/Product";
import Footer from "./components/Footer/Footer";

import "./App.css";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [openCart, setOpenCart] = useState<string>("");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Sale />
        <Navbar setOpenCart={setOpenCart} />
        <Cart setOpenCart={setOpenCart} openCart={openCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mechanical-keyboards" element={<Keyboards />} />
          <Route path="/mechanical-keyboards/:id" element={<Product />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
