import styles from "./Slider.module.css";
import "../../global.css";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { sliderData } from "../../data/data";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const navigate = useNavigate();

  const showProductHandler = (id: string) => {
    navigate(`mechanical-keyboards/${id}`);
  };

  return (
    <Swiper
      className={styles.swiper}
      spaceBetween={1}
      slidesPerView={3}
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
