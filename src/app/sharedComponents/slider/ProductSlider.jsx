import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import styled from "styled-components";
import tw from "twin.macro";
import { useRef } from "react";
import ProductCard from "../../containers/customer/BrandPage/components/ProductCard";

export const IconLeft = styled.svg`
  transform: translate(0, -50%);
  ${tw` p-2 rounded-full bg-[#EE4C7E] h-10 w-10 absolute top-1/2  left-0 z-index[1] opacity-30 hover:opacity-100 hover:cursor-pointer`}
`;
export const IconRight = styled.svg`
  transform: translate(0, -50%);
  ${tw` p-2 rounded-full bg-[#EE4C7E] h-10 w-10 absolute top-1/2 -right-0 z-index[1] opacity-30 hover:opacity-100 hover:cursor-pointer`}
`;
export const ProductsSlider = (props) => {
  console.log(Navigation);
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <Swiper
      slidesPerView={4}
      loop={true}
      spaceBetween={20}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      modules={[Navigation]}
    >
      {props.data.map((item, index) => {
        return (
          <>
            <SwiperSlide>
              <ProductCard data={item}></ProductCard>
            </SwiperSlide>
          </>
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
  );
};
