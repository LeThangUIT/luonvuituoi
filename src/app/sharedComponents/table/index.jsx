import styled from "styled-components";
import tw from "twin.macro";

export const Table = styled.table`
  ${tw` w-full col-span-3 table-auto  box-border shadow-sm`}
`;
export const TableHead = styled.thead`
  ${tw` h-[57px] bg-white border border-[#EEEEEE] rounded-lg `}
`;
export const TableBody = styled.tbody`
  ${tw``}
`;
export const TableRow = styled.tr`
  ${tw` border border-[#EEEEEE] bg-white content-center`}
`;
export const RowSpace = styled.tr`
  ${tw` h-3`}
`;
export const TableHeading = styled.th`
  ${tw`text-left pl-4 px-4`}
`;
export const TableData = styled.td`
  ${tw`p-4 whitespace-nowrap `}
`;
export const TableNameData = styled.td`
  ${tw`px-4`}
`;


export const ImageBox = styled.div`
  ${tw`
      h-[70px] w-[70px] rounded-lg overflow-hidden flex 
  `}
`;
export const Image = styled.img`
  ${tw`
     object-cover w-full h-full relative flex-basis[100%] flex-grow-0 flex-shrink-0
  `}
`;