import styled from 'styled-components';
import tw from 'twin.macro';

export const ModalBackground = styled.div`
  ${tw` w-screen h-screen bg-[rgba(200, 200, 200, 0.7)] fixed flex justify-center items-center top-0 right-0`}
`;
export const ModalContainer = styled.div`
  ${tw` max-w-xs relative rounded-xl bg-white flex flex-col gap-4 p-6`}
`;
export const ButtonClose = styled.div`
  ${tw` absolute z-10 w-3  top-4 right-4`}
`;
export const ModalTitle = styled.div`
  ${tw` mt-2 flex justify-center`}
`;
export const ModalFooter = styled.div``;