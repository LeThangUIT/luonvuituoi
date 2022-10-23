import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Text = styled.span`
    ${tw` opacity-80 not-italic font-normal text-[14px] leading-[17px] text-[red]`}
`
const TextError = (props) => {
    return (
        <Text className='error'>
            {props.children}
        </Text>
    );
}

export default TextError;
