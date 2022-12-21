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
        w-full box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-white rounded-lg border hover:bg-primaryColor border-[#EE4C7E] 
        text-primaryColor not-italic font-semibold text-sm leading-[17px] hover:text-white
        disabled:cursor-not-allowed disabled:opacity-50
    `}
`
export const DisableButton = styled.button`
    ${tw` 
       w-full box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-white rounded-lg border border-[#EE4C7E] 
        text-primaryColor not-italic font-semibold text-sm leading-[17px] hover:cursor-not-allowed opacity-30
    `}
`

export const AddButton = styled.button`
    ${tw` 
      box-border flex gap-x-2 justify-between items-center py-2 px-4 bg-[#5CB85C] rounded-lg border  
        text-white not-italic font-semibold text-sm leading-[17px] hover:opacity-75
    `}
`
export const UpdateButton = styled.button`
    ${tw` 
      box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-[#5BC0DE] rounded-lg border  
        text-white not-italic font-semibold text-sm leading-[17px] hover:opacity-75
    `}
`

export const DeleteButton = styled.button`
    ${tw` 
         box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-[#D9534F] rounded-lg border  
        text-white not-italic font-semibold text-sm leading-[17px] hover:opacity-75
    `}
`

export const DetailButton = styled.button`
    ${tw` 
      box-border flex gap-x-2 justify-center items-center py-2 px-4 bg-[#ffc107] rounded-lg border  
        text-white not-italic font-semibold text-sm leading-[17px] hover:opacity-75
    `}
`