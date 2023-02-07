import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { Heading14 } from "../../../../sharedComponents/text";
import { UilShoppingCart } from '@iconscout/react-unicons'
import { formatter } from "../../../../sharedComponents/format";


const ProductContainer = styled.div`
  ${tw`
       col-span-1 bg-[#FFFFFF] rounded-lg h-auto shadow-lg
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
     object-cover w-full h-full relative transition-all
  `}
  &:hover{
    transform: scale(1.25);
  }
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
        <Heading14 className="min-h-[34px]" onClick={() => handProductDetail(data.id)}>{data.name}</Heading14>
        <PriceContainer>
          {data.priceMax == 0 || data.price == data.priceMax ? <Price>{formatter.format(data.price)} đ</Price>
          : <Price>{formatter.format(data.price)} ~ {formatter.format(data.priceMax)} đ</Price>  
        }
        {/* {data.priceMax == 0 ? <UilShoppingCart></UilShoppingCart> : <UilShoppingCart className="invisible"></UilShoppingCart>} */}
        </PriceContainer>
      </DescribesBox2>
    </ProductContainer>
  );
}

export default ProductCard;
