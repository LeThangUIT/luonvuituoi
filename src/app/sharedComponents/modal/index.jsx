import styled from "styled-components";
import tw from "twin.macro";

export const ModalBackground = styled.div`
  ${tw` w-screen h-screen bg-[rgba(200, 200, 200, 0.7)] fixed flex justify-center items-center top-0 right-0`}
`;
export const ModalContainer = styled.div`
  ${tw` overflow-auto max-h-[90%] max-w-2xl relative rounded-xl bg-white flex flex-col gap-4 p-6`}
  ::-webkit-scrollbar {
    width: 8px;
    height: 20px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #f7f4ed;
  }

  ::-webkit-scrollbar-thumb {
    background: #e0cbcb;
    border-radius: 100vh;
    border: 1px solid #FDEDF2;
  }

`;
export const ButtonClose = styled.div`
  ${tw` absolute z-10 w-3  top-4 right-4`}
`;
export const ModalTitle = styled.div`
  ${tw` mt-2 flex justify-center`}
`;
export const ModalFooter = styled.div``;
