import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface IIconProps {size: string, color: string, }
const DropDown = styled.svg`
  ${tw` transform hover:rotate-180`}
`;
export const DropDownIcon:React.FC<IIconProps> = ({size, color}) => {
  return (
    <DropDown
      viewBox="0 0 9 9"
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_67_215)">
        <path
          d="M8.02868 2.47632L4.73568 5.76932C4.6723 5.83015 4.58786 5.86412 4.50001 5.86412C4.41217 5.86412 4.32773 5.83015 4.26435 5.76932L0.973348 2.47799L0.502014 2.94932L3.79301 6.24066C3.98363 6.42233 4.23686 6.52367 4.50018 6.52367C4.76351 6.52367 5.01673 6.42233 5.20735 6.24066L8.50001 2.94765L8.02868 2.47632Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_67_215">
          <rect
             width={size}
             height={size}
             fill={color}
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </DropDown>
  );
}
