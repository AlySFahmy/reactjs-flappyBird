import React from 'react';
import styled from 'styled-components';

const Modal = ({ score, onRestart }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <h2>Game Over</h2>
                <p>Your Score: {score}</p>
                <button onClick={onRestart}>Restart</button>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
    h2 {
        margin: 0 0 10px;
    }

    p {
        margin: 0 0 20px;
    }

    button {
        padding: 10px 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover {
        background: #0056b3;
    }
`;
