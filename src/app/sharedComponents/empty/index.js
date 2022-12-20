import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Heading30 } from '../text'

const Container = styled.div`
    ${tw` flex flex-col items-center justify-center gap-8 px-60 py-20`}
`
const EmptyComponent = () => {
  return (
    <Container>
        <Heading30>Danh sách trống!</Heading30> 
    </Container>
  )
}

export default EmptyComponent