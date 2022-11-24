import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Rose from "../../assets/images/Rose.jpg";
import Jisoo from "../../assets/images/Jisoo.jpg";
import Lisa from "../../assets/images/Lisa.jpg";
import Jennie from "../../assets/images/Jennie.jpg";
import styled from "styled-components";
import tw from "twin.macro";
import { IconLeft, IconRight } from "./ProductSlider";

const BigImage = styled.img`
  ${tw` object-cover w-full h-[340px] mb-4`}
`;
const SmallImage = styled.img`
  ${tw` object-cover w-full h-[90px] rounded-lg`}
`;
function ProductImageSlider({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <BigImage src={item} />
            </SwiperSlide>
          );
        })}
        <IconLeft
          ref={prevRef}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </IconLeft>
        <IconRight
          ref={nextRef}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </IconRight>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <SmallImage src={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default ProductImageSlider;
