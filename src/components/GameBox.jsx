import React from 'react'
import styled from 'styled-components'
import background_img from "../images/sky.png"

const GameBox = ({ size, children }) => {
    return <StyledGameBox size={size}>{children}</StyledGameBox>
}

export default GameBox;

const StyledGameBox = styled.div`
    height: ${(props) => props.size}px;
    width: 100%;
    background-image: url(${background_img});
    background-repeat: repeat-x;
    overflow: hidden;
`

