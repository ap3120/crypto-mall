import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

export const Navbar = ({isSignedIn, contractId, wallet}) => {
    const [nearToDollar, setNearToDollar] = useState('');

    const connect = () => {wallet.signIn()}
    const disconnect = () => {wallet.signOut()}

    useEffect(() => {
        const getNearToDollar = async() => {
            let data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(response => response.json())
            const near2usd = data['near']['usd']
            const amount_in_near = 1 / near2usd
            const rounded_two_decimals = Math.round(amount_in_near * 100) / 100;
            setNearToDollar(rounded_two_decimals.toString());
        }
        getNearToDollar();
    },[]);

    return (
        <Navbar sticky='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">CryptoMall</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/pc-and-electronics">PC & Electronics</Nav.Link>
                        <Nav.Link as={Link} to="/clothing">Clothing</Nav.Link>
                        <Nav.Link as={Link} to="/books">Books</Nav.Link>
                        <Nav.Link as={Link} to="/sport">Sport</Nav.Link>
                        <Nav.Link as={Link} to="/basket">Basket</Nav.Link>
                        {isSignedIn? (<Nav.Link as={Link} to='/orders'>Orders</Nav.Link>): null}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#" style={{color: '#fff'}} disabled>$1 = {nearToDollar}Ⓝ </Nav.Link>
                        <Button onClick={isSignedIn? disconnect: connect}>
                            {isSignedIn? wallet.accountId: 'Connect Wallet'}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

