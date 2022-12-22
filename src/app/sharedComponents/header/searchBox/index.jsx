import React, {
  ChangeEvent,
  useEffect,
  useState,
  RefObject,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { setKeyword } from "../../../containers/admin/productManagement/productSlice";
import { ResultContainer } from "./resultContainer";

const SearchContainer = styled.div`
  ${tw`  flex-1 flex rounded-lg bg-[#FAFAFA] relative`}
`;
const BoxText = styled.input`
  ${tw` border sm:border-none w-full py-4 pl-4 pr-12 h-12 focus:outline-none rounded-lg bg-[#FAFAFA] placeholder:text-xs placeholder:not-italic placeholder:font-normal placeholder:leading-[15px] `}
`;
export const SearchIcon = styled.svg`
  ${tw`
    box-border p-2 h-8 w-8  bg-[#EE4C7E] absolute top-2 right-2 bottom-2 rounded-lg hover:opacity-90 hover:cursor-pointer
  `}
`;

// Hook
export function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
export function SearchBox() {
  const [value, setValue] = useState("");
  // const [display, setDisplay] = useState("invisible");
  // const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChangeInput = (event) => {
    setValue(event.target.value);
    dispatch(setKeyword(event.target.value))
    // let array1 = [];
    // listProduct.map((item, index) => {
    //   if (item.name.includes(event.target.value) && event.target.value !== "") {
    //     array1.push(item.name);
    //   }
    // });
    // setSearchResult(array1);
  };
  // const resultBoxRef = useRef();
  // const clickOutsidehandler = () => {
  //   setDisplay("invisible");
  // };
  // useOnClickOutside(resultBoxRef, clickOutsidehandler);
  const onFormSubmit = (e) => {
    e.preventDefault();
    navigate('product')
  }
  return (
    // <SearchContainer ref={resultBoxRef}>
    <SearchContainer >
      <form onSubmit={onFormSubmit}>
        <BoxText
          value={value}
          onChange={handleChangeInput}
          // onMouseDown={() => setDisplay("block")}
          placeholder="Tìm sản phẩm..."
        ></BoxText>
        <SearchIcon type="submit" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('product')}>
          <path
            d="M16.2073 14.2968L13.1106 11.1987C15.4277 8.10223 14.7959 3.71356 11.6994 1.39641C8.60288 -0.920736 4.21422 -0.288925 1.89707 2.80759C-0.42008 5.90411 0.211731 10.2928 3.30825 12.6099C5.79563 14.4713 9.21199 14.4713 11.6994 12.6099L14.7975 15.708C15.1868 16.0973 15.818 16.0973 16.2073 15.708C16.5966 15.3187 16.5966 14.6875 16.2073 14.2982L16.2073 14.2968ZM7.52964 12.012C4.7776 12.012 2.54666 9.78102 2.54666 7.02899C2.54666 4.27695 4.7776 2.04601 7.52964 2.04601C10.2817 2.04601 12.5126 4.27695 12.5126 7.02899C12.5097 9.77978 10.2805 12.009 7.52964 12.012Z"
            fill="white"
          />
        </SearchIcon>
      </form>
      {/* <ResultContainer
        display={display}
        result={searchResult}
        value={value}
      ></ResultContainer> */}
    </SearchContainer>
  );
}
