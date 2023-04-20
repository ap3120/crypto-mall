import React, {useState, useEffect} from 'react';

import {addToBasket} from '../app/basketSlice.js';
import {useSelector, useDispatch} from 'react-redux';

import {Img} from 'react-image';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export const PCandElectronics = ({isSignedIn, contractId, wallet}) => {
    const [nearToDollar, setNearToDollar] = useState(0);
    const basket = useSelector(state => state.items);
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

    const items = [
        {
            id: 'pe-1',
            name: 'Laptop',
            priceInDollar: 1200,
            url: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6448/6448271ld.jpg',
            quantity: 0,
        },
        {
            id: 'pe-2',
            name: 'Tablet',
            priceInDollar: 900,
            url: 'http://tablet-news.com/wp-content/uploads/2014/05/Thinkpad-10_Standard_05_1706_1190.jpg',
            quantity: 0,
        },
        {
            id: 'pe-3',
            name: 'Phone',
            priceInDollar: 800,
            url: 'https://pngimg.com/uploads/smartphone/smartphone_PNG8533.png',
            quantity: 0,
        },
        {
            id: 'pe-4',
            name: 'Rasberry PI',
            priceInDollar: 45,
            url: 'https://www.slashgear.com/wp-content/uploads/2020/05/raspberry-pi-4-8gb-1.jpg',
            quantity: 0,
        },
        {
            id: 'pe-5',
            name: 'Speaker',
            priceInDollar: 500,
            url: 'https://purepng.com/public/uploads/large/purepng.com-audio-speakeraudio-speakersaudiospeakerssound-speaker-1701528343466z2uvi.png',
            quantity: 0,
        },
        {
            id: 'pe-6',
            name: 'Gopro',
            priceInDollar: 350,
            url: 'https://pngimg.com/uploads/gopro/gopro_PNG10013.png',
            quantity: 0,
        }
    ]

    const handleAddToBasket = item => {
        dispatch(addToBasket(item));
    }

    const getQuantity = item => {
        const index = basket.findIndex(elem => elem.id === item.id);
        if (index >= 0) {
            return basket[index].quantity;
        }
        return 0;
    }

    return (
        <Container>
            <h1 className='mt-5 mb-5'>PC and Electronics</h1>
            <Container className='d-flex flex-wrap justify-content-center'>
                {items.map((item, index) => {
                    return (
                        <Card className='d-flex flex-column m-2' key={index} style={{ width: '18rem' }}>
                            <Img className='m-1' variant="top" src={item.url} loader={<Spinner animation="border" role="status"></Spinner>}/>
                            <Card.Body className='d-flex flex-column justify-content-end'>
                                <Card.Title className='d-flex justify-content-between'>
                                    <div>{item.name}</div>
                                    <div>{getQuantity(item)}</div>
                                </Card.Title>
                                <Card.Text>
                                    $ {item.priceInDollar} = {Math.round(item.priceInDollar*nearToDollar*100)/100} Ⓝ 
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleAddToBasket(item)}>Add to Basket</Button>
                            </Card.Body>
                        </Card>
                    ) 
                })}
            </Container>
        </Container>
    )
}
