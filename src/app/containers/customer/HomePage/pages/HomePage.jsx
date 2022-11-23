import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import tw from 'twin.macro'
import { Body } from "../../../../sharedComponents/body";
import { Footer } from "../../../../sharedComponents/footer";
import { Header } from "../../../../sharedComponents/header";
import { getAllCategories } from "../../../admin/categoryManagement/categorySlice";
import { fetchUserInfo } from "../../Auth/authSlice";
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
    const userToken = localStorage.getItem("userToken");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategories())
        if(userToken) {
            dispatch(fetchUserInfo(userToken))
        }
    }, [])
    return (
        <PageContainer>
            <Header></Header>
            <Body>
                <Banner></Banner>
                <Content></Content>
                <Footer></Footer>
            </Body>
        </PageContainer>
    )
}


