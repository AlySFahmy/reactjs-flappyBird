

import React from 'react';
import styled from 'styled-components';
import bird_img from '../images/bird_static.png';

const Bird = ({ size, top, headUp, leftOffset }) => {
    return <StyledBird src={bird_img} size={size} top={top} headUp={headUp} leftOffset={leftOffset} />;
};

export default Bird;

const StyledBird = styled.img`
    position: absolute;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size * 2}px;
    top: ${(props) => props.top}px;
    left: ${(props) => props.leftOffset}px; 
    border-radius: 50%;
    transform: rotate(${(props) => props.headUp && -25}deg);
`;
