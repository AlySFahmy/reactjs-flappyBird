
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Bird from './components/Bird';
import Obstacle from './components/Obstacle';
import GameBox from './components/GameBox';
import Div from './components/Div';
import Modal from './components/Modal';

const BIRD_SIZE = 40;
const GAME_SIZE = 600;
const GROUND_HEIGHT = 80;
const GRAVITY = 6;
const JUMP_HEIGHT = 75;
const OBSTACLE_WIDTH = 246;
const OBSTACLE_GAP = 200;
const BIRD_LEFT_OFFSET = 100; 

const App = () => {
    const [birdHeight, setBirdHeight] = useState(350);
    const [isStarted, setStart] = useState(false);
    const [upperObstacleHeight, setUpperObstacleHeight] = useState(400);
    const [obstacleLeft, setObstacleLeft] = useState(window.innerWidth - OBSTACLE_WIDTH);
    const [score, setScore] = useState(0);
    const [headUp, setHeadUp] = useState(false);
    const [showModal, setShowModal] = useState(false);

    let bottomObstacleHeight = upperObstacleHeight - OBSTACLE_GAP;

    useEffect(() => {
        let timeId;
        if (isStarted && birdHeight > (GROUND_HEIGHT + BIRD_SIZE)) {
            timeId = setInterval(() => {
                setBirdHeight(prevHeight => prevHeight - GRAVITY);
            }, 25);
            return () => {
                clearInterval(timeId);
            };
        }
    }, [isStarted, birdHeight]);

    useEffect(() => {
        let obstacleId;
        let goLeft;
        if (score <= 5) goLeft = 5;
        else if (score <= 10) goLeft = 7.5;
        else goLeft = 10;

        if (isStarted) {
            if (obstacleLeft >= -OBSTACLE_WIDTH) {
                obstacleId = setInterval(() => {
                    setObstacleLeft(obstacleLeft => obstacleLeft - goLeft);
                }, 10);
                return () => {
                    clearInterval(obstacleId);
                };
            } else {
                setObstacleLeft(window.innerWidth);
                setUpperObstacleHeight(GAME_SIZE - Math.floor(Math.random() * (GAME_SIZE - GROUND_HEIGHT - OBSTACLE_GAP)));
                setScore(score => score + 1);
            }
        } else {
            setObstacleLeft(window.innerWidth - OBSTACLE_WIDTH);
            setUpperObstacleHeight(GAME_SIZE - Math.floor(Math.random() * (GAME_SIZE - GROUND_HEIGHT - OBSTACLE_GAP)));
        }
    }, [isStarted, obstacleLeft, score]);

    useEffect(() => {
        const touchGround = birdHeight <= (GROUND_HEIGHT + BIRD_SIZE);
        const touchTop = birdHeight >= upperObstacleHeight;
        const touchBottom = birdHeight <= (bottomObstacleHeight + BIRD_SIZE);

        if (touchGround || (obstacleLeft <= (BIRD_SIZE * 2) && (touchTop || touchBottom))) {
            if (touchTop) {
                setTimeout(() => {
                    setStart(false);
                    setShowModal(true);
                    setBirdHeight(350);
                }, 50);
            } else {
                setShowModal(true);
                setStart(false);
                setBirdHeight(350);
            }
        }
    }, [birdHeight, bottomObstacleHeight, upperObstacleHeight, obstacleLeft, score]);

    function handleJump() {
        setHeadUp(true);
        setTimeout(() => {
            setHeadUp(false);
        }, 100);
        let jump;
        if (score <= 5) jump = JUMP_HEIGHT;
        else if (score <= 10) jump = JUMP_HEIGHT + 5;
        else if (score <= 20) jump = JUMP_HEIGHT + 10;
        else jump = JUMP_HEIGHT + 15;

        let newHeight = birdHeight + jump;
        if (!isStarted) setStart(true);
        else if (newHeight > GAME_SIZE) setBirdHeight(GAME_SIZE);
        else if (obstacleLeft <= (BIRD_SIZE * 2) && newHeight >= upperObstacleHeight) setBirdHeight(upperObstacleHeight);
        else setBirdHeight(newHeight);
    }

    function handleRestart() {
        setShowModal(false);
        setScore(0);
        setBirdHeight(350);
        setObstacleLeft(window.innerWidth - OBSTACLE_WIDTH);
        setUpperObstacleHeight(GAME_SIZE - Math.floor(Math.random() * (GAME_SIZE - GROUND_HEIGHT - OBSTACLE_GAP)));
        setStart(true);
    }

    return (
        <Div onKeyDown={handleJump} onTouchStart={handleJump}>
            <Score>{score}</Score>
            <GameBox size={GAME_SIZE}>
                <Obstacle
                    top={0}
                    width={OBSTACLE_WIDTH}
                    length={GAME_SIZE - upperObstacleHeight}
                    left={obstacleLeft}
                    flip={true}
                />
                <Obstacle
                    top={GAME_SIZE - bottomObstacleHeight - (GAME_SIZE - upperObstacleHeight)}
                    width={OBSTACLE_WIDTH}
                    length={bottomObstacleHeight - GROUND_HEIGHT + 10}
                    left={obstacleLeft}
                    flip={false}
                />
                <Bird
                    size={BIRD_SIZE}
                    top={GAME_SIZE - birdHeight}
                    headUp={headUp}
                    leftOffset={BIRD_LEFT_OFFSET} 
                />
            </GameBox>
            {showModal && <Modal score={score} onRestart={handleRestart} />}
        </Div>
    );
}

export default App;

const Score = styled.span`
    color: white;
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    top: 10px;
    z-index: 10;
`;








