import styled from "styled-components";
import tw from "twin.macro";

export const PinkButton = styled.button`
  ${tw`
        w-full box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-primaryColor rounded-lg  border hover:bg-[white] border-[#EE4C7E]
        text-white not-italic font-semibold text-sm leading-[17px] hover:text-primaryColor
        disabled:cursor-wait disabled:opacity-50
    `}
`;

export const WhiteButton = styled.button`
    ${tw` 
        box-border flex gap-x-2 justify-between items-center py-2 px-4 bg-white rounded-lg border hover:bg-primaryColor border-[#EE4C7E] 
        text-primaryColor not-italic font-semibold text-sm leading-[17px] hover:text-white
    `}
`