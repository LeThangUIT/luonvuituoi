import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { AddToCartIcon } from "../../../../sharedComponents/icon/addToCartIcon";
import { Heading14 } from "../../../../sharedComponents/text";

const ProductContainer = styled.div`
  ${tw`
       h-10 col-span-1 bg-[#FFFFFF] rounded-lg h-auto 
    `}
`;
const ImageContainer = styled.div`
  ${tw`
    p-4 
  `}
`;
const ImageBox = styled.div`
  ${tw`
      h-[175px] rounded-lg overflow-hidden flex hover:cursor-pointer
  `}
`;
const Image = styled.img`
  ${tw`
     object-cover w-full h-full relative flex-basis[100%] flex-grow-0 flex-shrink-0
  `}
`;
const DescribesBox = styled.div`
  ${tw`
    flex flex-col pt-2 px-4 pb-4 space-y-5
  `}
`;
const DescribesBox2 = styled.div`
  ${tw`
    flex flex-col pt-2 px-4 pb-4 space-y-4
  `}
`;
const PriceContainer = styled.div`
  ${tw`
    flex items-center space-x-[10px]
  `}
`;
const Price = styled.span`
  ${tw`
     not-italic font-bold text-base leading-[19px] text-[ #EE4C7E] flex-1 
  `}
`;
function ProductCard({data}) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  const navigate = useNavigate()
  const handProductDetail = (id) => {
    navigate(`/detail/${id}`)
  }
  return (
    <ProductContainer>
      <ImageContainer>
        <ImageBox onClick={() => handProductDetail(data.id)}>
          <Image src={data.imageMain}></Image>
        </ImageBox>
      </ImageContainer>
      <DescribesBox2>
        <Heading14 onClick={() => handProductDetail(data.id)}>{data.name}</Heading14>
        <PriceContainer>
          <Price>đ {formatter.format(data.price)}</Price>
          <AddToCartIcon></AddToCartIcon>
        </PriceContainer>
      </DescribesBox2>
    </ProductContainer>
  );
}

export default ProductCard;
