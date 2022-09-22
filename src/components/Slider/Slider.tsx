import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { sliderData } from "../../data/data";
import styles from "./Slider.module.css";
import "../../global.css";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const navigate = useNavigate();

  const currWidth = window.screen.availWidth;

  const showProductHandler = (id: string) => {
    navigate(`mechanical-keyboards/${id}`);
  };

  useEffect(() => {
    if (currWidth <= 1200) {
      setSlidesPerView(1);
    }
  }, []);

  return (
    <Swiper
      className={styles.swiper}
      spaceBetween={1}
      slidesPerView={slidesPerView}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={700}
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop
    >
      {sliderData.map(product => {
        return (
          <SwiperSlide
            className={styles.swiper_slide}
            key={product.id}
            onClick={() => {
              showProductHandler(product.id);
            }}
          >
            <img src={product.image} className={styles.photo} />
            <h1>{product.product}</h1>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Slider;
