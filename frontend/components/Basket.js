import React, {useState, useEffect} from 'react';

import {addToBasket, removeFromBasket, removeItemFromBasket, resetBasket} from '../app/basketSlice.js';
import {useSelector, useDispatch} from 'react-redux';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import {Img} from 'react-image';

import '../assets/global.css';

import {utils} from 'near-api-js';

export const Basket = ({isSignedIn, contractId, wallet}) => {

    const [nearToDollar, setNearToDollar] = useState(0);

    const basket = useSelector(state => state.items);
    const total = useSelector(state => state.totalPrice);
    const dispatch = useDispatch();

    useEffect(() => {
        const getNearToDollar = async() => {
            let data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(response => response.json())
            const near2usd = data['near']['usd']
            const amount_in_near = 1 / near2usd
            const rounded_two_decimals = Math.round(amount_in_near * 100) / 100;
            setNearToDollar(rounded_two_decimals);
        }
        getNearToDollar();
    }, []);

    const handleOrder = async() => {
        const amountInNear = total*nearToDollar;
        let deposit = utils.format.parseNearAmount(amountInNear.toString());
        return await wallet.callMethod({
            contractId: contractId,
            method: 'purchaseBasket',
            args: {
                basket: basket,
                totalPrice: total
            },
            deposit
        })
    }

    const connect = () => {wallet.signIn()}

    const handleResetBasket = () => {
        dispatch(resetBasket());
    }

    const handleAddToBasket = (item) => {
        dispatch(addToBasket(item));
    }

    const handleRemoveFromBasket = (item) => {
        dispatch(removeFromBasket(item));
    }

    const handleRemoveItem = item => {
        dispatch(removeItemFromBasket(item));
    }

    return (
        <Container>
            <div className='mt-5 mb-5 d-flex justify-content-between'>
                <h1>Your Basket</h1>
                <Button onClick={handleResetBasket}>Reset Basket</Button>
            </div>
            <Container className='d-flex flex-wrap justify-content-center'>
                {basket.map((item, index) => {
                    return (
                        <Card className='d-flex flex-column m-2' key={index} style={{ width: '18rem' }}>
                            <Img className='m-1' variant="top" src={item.url} loader={<Spinner animation="border" role="status"></Spinner>}/>
                            <Card.Body className='d-flex flex-column justify-content-end'>
                                <Card.Title className='d-flex justify-content-between'>
                                    <div>{item.name}</div>
                                    <div>{item.quantity}</div>
                                </Card.Title>
                                <Card.Text>
                                    $ {item.priceInDollar*item.quantity} = {item.priceInDollar*nearToDollar*item.quantity} Ⓝ 
                                </Card.Text>
                                <div className='d-flex justify-content-between'>
                                    <Button className='rounded-button' variant='secondary' onClick={() => handleAddToBasket(item)}>+</Button>
                                    <Button className='rounded-button' variant='secondary' onClick={() => handleRemoveFromBasket(item)}>-</Button>
                                    <Button variant="danger" onClick={() => handleRemoveItem(item)}>Remove</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ) 
                })}
            </Container>
            <h3>Total: $ {total} = {nearToDollar*total} Ⓝ </h3>
            {isSignedIn? (
                <Button onClick={handleOrder}>Buy</Button>
            ) : (
                <Button onClick={connect}>Connect Wallet</Button>
            )}
        </Container>
    )
}
