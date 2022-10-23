import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IIconProps {
  size: string;
  color: string;
}
const DropDown = styled.svg`
  ${tw` transform hover:rotate-180`}
`;
export const UpIcon: React.FC<IIconProps> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
      />
    </svg>
  );
};
