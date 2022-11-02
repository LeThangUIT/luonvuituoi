import React from 'react'
import { Footer } from '../../../../sharedComponents/footer'
import { Header } from '../../../../sharedComponents/header'
import { ContentContainer } from '../../HomePage/components/content'
import { PageContainer } from '../../HomePage/pages/HomePage'
import { Body } from '../../ProductPage/pages/ProductPage'

function CheckoutPage() {
  return (
    <PageContainer>
        <Header></Header>
        <Body>
            <ContentContainer>
                á
            </ContentContainer>
            <Footer></Footer>
        </Body>
    </PageContainer>
  )
}

export default CheckoutPage