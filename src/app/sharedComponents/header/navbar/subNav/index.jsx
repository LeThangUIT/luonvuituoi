import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { RightIcon } from "../../../icon/rightIcon";
import { Heading14 } from "../../../text";
import { SubMenu1 } from "./subNav1";
const SubNav = styled.div`
    ${tw`
        bg-white min-w-[200px] absolute top-[100%] left-0  py-3
    `}
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
export const SubMenuItem = styled.div`
    ${tw`
        flex flex-row items-center  hover:bg-[#F8F8F8] py-3 px-5 
    `}
`
export const ArrowIconRight = styled.svg`
  ${tw` `}
`

export const SubMenu = ({display, subMenu1}) => {
    const [display1, setDisplay] = useState("hidden")
    const [index1, setIndex1] = useState()
    const showSubMenu = (index) => {
      setDisplay("block")
      setIndex1(index)
    }
    const hideSubMenu = () => {
      setDisplay("hidden")
    }
    return (
        <SubNav className={display}>
            {subMenu1.map((item, index) => {
                return(
                    <SubMenuItem onMouseOver={() => showSubMenu(index)} onMouseLeave={hideSubMenu}>
                        <Heading14>{item.name1}</Heading14>
                        {item.subMenu1.length>0 && 
                            <ArrowIconRight
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="black"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                          </ArrowIconRight>
                        }
                        {item.subMenu1.length>0 && index1 == index &&
                            <SubMenu1 display={display1} subMenu1={item.subMenu1}></SubMenu1> 
                        }
                    </SubMenuItem>
                )
            })}
            
        </SubNav>
    )
}