import React from 'react';

import {Container, Button} from 'react-bootstrap';
import '../assets/global.css';

export const Home = ({isSignedIn, contractId, wallet}) => {

    const connect = () => {wallet.signIn()}

    return (
        <Container className='d-flex flex-column text-align-center'>
            <h1 className='home-title mb-5'>
                The next generation E-Commerce Platform simplified with Digital Currency.
            </h1>
            <p className='fs-5 mb-5'>
                Join the digital currency revolution with our E-commerce platform!<br/>
                Experience the future of online shopping with our secure digital currency payments.
            </p>
            {isSignedIn? null : (
                <Button style={{width: '200px'}} onClick={connect}>Connect Wallet</Button>
            )}
        </Container>
    )
}
