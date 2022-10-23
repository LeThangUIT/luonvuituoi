import React from "react";
import styled from "styled-components";
import tw from "twin.macro"; 

const IconLeft = styled.svg`
    transform: translate(0, -50%);
  ${tw` p-2 rounded-full bg-[#EE4C7E] h-10 w-10 absolute top-1/2  left-0 z-index[1] opacity-50 hover:opacity-100 hover:cursor-pointer`}
`;
export const ArrowIconLeft = () => {
    return (
        <IconLeft
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
    )
}