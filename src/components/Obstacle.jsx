import React from 'react'
import styled from 'styled-components'
import pipe_img from "../images/pipe.png"

const Obstacle = ({ top, width, length, left, flip }) => {
    return <StyledObstacle top={top} width={width} length={length} left={left} flip={flip} />
}

export default Obstacle;

const StyledObstacle = styled.div`
    position: relative;
    top: ${(props) => props.top}px;
    background-image: url(${pipe_img});
    width: ${(props) => props.width}px;
    height: ${(props) => props.length}px;
    left: ${(props) => props.left}px;
    transform: rotate(${(props) => props.flip && 180}deg);
    background-repeat: no-repeat;
`


