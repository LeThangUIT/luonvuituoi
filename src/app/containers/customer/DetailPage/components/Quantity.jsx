import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

export const Quantity = styled.div`
  ${tw` max-w-max flex flex-row gap-4 items-center p-[6px] bg-[rgba(228, 228, 228, 0.3)] rounded-lg`}
`;
export const Number = styled.span`
  ${tw` w-6 font-semibold text-xl leading-6 text-primaryColor`}
`;
export const Decrease = styled.svg`
  ${tw` p-2 h-8 w-8 rounded-2xl hover:opacity-90 hover:cursor-pointer`}
`;
export const Increase = styled.svg`
  ${tw` p-2 h-8 w-8 rounded-[10px] bg-primaryColor hover:opacity-90 hover:cursor-pointer`}
`;

function QuantityComponent({quantity, setQuantity}) {
  const handleIncrease = () => {
    setQuantity(++quantity)
  }
  const handleDecrease = () => {
    if(quantity > 1) {
      setQuantity(--quantity)
    }
  }
  return (
    <Quantity >
      <Decrease onClick={handleDecrease}
        width="20"
        height="20"
        viewBox="0 0 12 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.71997 1.71953H11.2799C11.6776 1.71953 12 1.39718 12 0.999366C12 0.601648 11.6777 0.279297 11.2799 0.279297H0.71997C0.322351 0.279395 0 0.601747 0 0.999464C0 1.39718 0.322351 1.71953 0.71997 1.71953Z"
          fill="#EE4C7E"
        />
      </Decrease>
      <Number>{quantity}</Number>
      <Increase onClick={handleIncrease}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.25 5.25H6.75V0.75C6.75 0.335789 6.41421 0 6 0C5.58579 0 5.25 0.335789 5.25 0.75V5.25H0.75C0.335789 5.25 0 5.58579 0 6C0 6.41421 0.335789 6.75 0.75 6.75H5.25V11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25Z"
          fill="white"
        />
      </Increase>
    </Quantity>
  );
}

export default QuantityComponent;
