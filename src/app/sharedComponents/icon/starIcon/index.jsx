import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Star = styled.svg`
  ${tw``}
`;
export function StarIcon( props) {
  return (
    <Star
      width={props.size}
      height={props.size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2225 19.4299L10 14.8566L3.77751 19.4299L6.16667 12.0441L-0.0524902 7.4999H7.62584L10 0.101562L12.3742 7.4999H20.0517L13.8333 12.0441L16.2225 19.4299Z"
        fill={props.color}
      />
    </Star>
  );
}
