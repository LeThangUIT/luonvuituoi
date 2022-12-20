import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from 'twin.macro'
import { Body } from "../../../../sharedComponents/body";
import { getAllProducts } from "../../../admin/productManagement/productSlice";
import { Banner } from "../components/banner";
import { Content } from "../components/content";

export const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        relative
    `}
`;

export default function HomePage() {
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getAllProducts({page:"1", perPage:"8"}))
    }, [])
    return (
        <Body>
            <Banner></Banner>
            <Content></Content>
        </Body>
    )
}


