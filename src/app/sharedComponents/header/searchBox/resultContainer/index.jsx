import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const ResultBox = styled.div`
  ${tw`
         shadow-md  bg-white min-w-full rounded-lg absolute top-full left-0 min-h-full flex flex-col 
    `}
`;
const ResultText = styled.span`
  ${tw`
        hover:bg-[#F8F8F8] py-3 px-5 
    `}
`;
const Header = styled.div`
  ${tw`
        flex content-between py-3 px-5  
    `}
`;
const RecentSearch = styled.span`
  ${tw` text-black font-bold flex-1`}
`;
const Clear = styled.span`
  ${tw` text-blue-600 hover:cursor-pointer`}
`;
export const ResultContainer = ({
  display,
  result,
  value,
}) => {
  const [list, setList] = useState(JSON.parse(localStorage.getItem("keywords") || '[]'))
  // let list = JSON.parse(localStorage.getItem("keywords") || '[]');
  const addItem = () => {
    let array = []
    if(localStorage.getItem("keywords")) {
      array = [...list, value]
      setList(array)
      localStorage.setItem("keywords", JSON.stringify(array));
    }
    else {
      array.push(value)
      setList(array)
      localStorage.setItem("keywords", JSON.stringify(array));
    }
  };
  const removeItem = () => {
    localStorage.removeItem("keywords")
    setList([])
  }
  return (
    <ResultBox className={display}>
      {result.length != 0 ? (
        result.map((item, index) => {
          return <ResultText onClick={addItem}>{item}</ResultText>;
        })
      ) : (
        <>
          <Header>
            <RecentSearch>Recent searches</RecentSearch>{" "}
            <Clear onClick={removeItem}>Clear history</Clear>
          </Header>
          {list.map((item) => {
            return(
              <ResultText>{item}</ResultText>
            )
          })}
        </>
      )}
    </ResultBox>
  );
};
