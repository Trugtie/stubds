import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";
import { Autoplay, Navigation } from "swiper";

function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <h1 className='slider-title'>Quản lý nhân viên</h1>
        <SwiperSlide
          style={{
            backgroundImage:
              "url(http://gidifavietnam.com/wp-content/uploads/2019/06/banner-city.jpg)",
              backgroundPosition:'center',
              backgroundRepeat:'no-repeat',
              backgroundSize:'cover',
              boxShadow: 'inset 0 0 0 2000px #0000002B',
          }}
        >
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;
