import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { PinkButton } from '../../../../sharedComponents/button'
import { Heading30, Text16 } from '../../../../sharedComponents/text'

const Container = styled.div`
    ${tw` flex flex-col items-center justify-center gap-8 px-60 py-20`}
`
const ThankPageComponent = () => {
    const navigate = useNavigate()
  return (
    <Container>
        <Heading30>Đặt hàng thành công</Heading30>
        <Text16 className='text-center'>Cảm ơn bạn đã quan tâm và mua hàng. Chúng tôi đã gửi thông báo đến email của bạn.
             Chúng tôi sẽ giao hàng trong thời gian sớm nhất, vui lòng theo dõi tình trạng đơn hàng qua thông báo.</Text16>
        <PinkButton onClick={() => navigate(`/product`)}>Tiếp tục mua sắm</PinkButton>
    </Container>
  )
}

export default ThankPageComponent