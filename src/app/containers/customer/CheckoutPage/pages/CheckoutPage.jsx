import React from 'react'
import { Footer } from '../../../../sharedComponents/footer'
import { Header } from '../../../../sharedComponents/header'
import { Body } from '../../BrandPage/pages/BrandPage'
import { ContentContainer } from '../../HomePage/components/content'
import { PageContainer } from '../../HomePage/pages/HomePage'

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