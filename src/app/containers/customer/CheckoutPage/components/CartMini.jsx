import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Image, ImageBox } from "../../../../sharedComponents/table";
import { Heading16, PinkHeading16, PinkHeading18, PinkHeading22, Text14 } from "../../../../sharedComponents/text";
import { FlexContainer } from "../pages/CheckoutPage";

const ItemInfo = styled.div`
  ${tw`w-full flex-1 flex flex-col gap-2`}
`;
function CartMini({cart}) {
  console.log(cart)
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
  return (
    <>
      <Heading16>Giỏ hàng</Heading16>
      {cart.map((item, index) => {
        return (
          <FlexContainer key={index}>
            <ImageBox>
              <Image src={item.imageMain}></Image>
            </ImageBox>
            <ItemInfo>
              <Heading16>{item.name}</Heading16>
              {item.optionValues && (
                <Text14>
                  {item.optionValues.map((option, index) => {
                    if (index == 0) {
                      return <>{option.value}</>;
                    } else {
                      return <> / {option.value}</>;
                    }
                  })}
                </Text14>
              )}
              <PinkHeading18>
                {formatter.format(item.price * item.quantity)} đ
              </PinkHeading18>
            </ItemInfo>
            <Text14>x{item.quantity}</Text14>
          </FlexContainer>
        );
      })}
    </>
  );
}

export default CartMini;
