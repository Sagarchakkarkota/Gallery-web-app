import React, { useEffect, useState } from 'react'
import { bounce } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`${bounce}`;

const Div = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 3rem;
  letter-spacing: 0.5rem;
`;

const BouncyP = styled.p`
  animation: 1s ${bounceAnimation} infinite;
`;

const Splashscreen = ({ children }) => {
    const [isSplashEnded, setIsSplashEnded] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashEnded(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);



    return isSplashEnded ?
        (
            <Div>
                <BouncyP> Gallery Content</BouncyP>
            </Div>
        ) : children
}

export default Splashscreen
