import React from 'react'
import styled from 'styled-components'

const Div = ({ onKeyDown, onTouchStart, children }) => {
    return <StyledDiv onKeyDown={onKeyDown} tabIndex={0} onTouchStart={onTouchStart}>{children}</StyledDiv>
}

export default Div;

const StyledDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`


