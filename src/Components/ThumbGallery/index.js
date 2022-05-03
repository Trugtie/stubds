import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import './styles.css';
import { FreeMode, Thumbs } from "swiper";


export default function ThumbGallery(images) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    images.images.length > 0?
      (<div className="thumb-gallery">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="mySwiper2"
        >
          {images.images?.map((item) => {
            return (
              <SwiperSlide>
                <img src={`${item.hinh}`} alt={item.hinhid} />
              </SwiperSlide>
            );
          })}

        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper"
        >
          {images.images?.map((item) => {
            return (
              <SwiperSlide>
                <img src={`${item.hinh}`} alt={item.hinhid} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>)
      :
      (<div style={{ display: 'flex', justifyContent: 'center' }}>
        <p>Không có dữ liệu hình ảnh</p>
      </div>)
  );
}
