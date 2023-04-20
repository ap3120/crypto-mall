import React, {useState, useEffect} from 'react';

import {addToBasket} from '../app/basketSlice.js';
import {useSelector, useDispatch} from 'react-redux';

import {Img} from 'react-image';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export const Sport = ({isSignedIn, contractId, wallet}) => {
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
            id: 's-1',
            name: 'Road bike',
            priceInDollar: 1400,
            url: 'https://images-na.ssl-images-amazon.com/images/I/71lDm0eKHGL._SL1500_.jpg',
            quantity: 0,
        },
        {
            id: 's-2',
            name: 'Racket',
            priceInDollar: 50,
            url: 'https://cdn.sweatband.com/head_novak_25_junior_tennis_racket_ss20_head_novak_25_junior_tennis_racket_ss20_2000x2000.jpg',
            quantity: 0,
        },
        {
            id: 's-3',
            name: 'Climbing shoes',
            priceInDollar: 45,
            url: 'https://images-na.ssl-images-amazon.com/images/I/91q7ZpYby-L._AC_UL1500_.jpg',
            quantity: 0,
        },
        {
            id: 's-4',
            name: 'Boking gloves',
            priceInDollar: 80,
            url: 'https://i5.walmartimages.com/asr/4b5141af-3443-49e8-9084-efe452832cf5.b560a18b023d3c4d57b64473d50ae628.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff',
            quantity: 0,
        },
        {
            id: 's-5',
            name: 'Mat',
            priceInDollar: 18,
            url: 'https://ae01.alicdn.com/kf/HTB1xPOFbUtWMKJjy0Faxh7CDpXad/Fitness-10mm-Thickess-Non-Slip-Yoga-Mat-Sport-Pad-Gym-Soft-Pilates-Mats-Foldable-Pads-for.jpeg',
            quantity: 0,
        },
        {
            id: 's-6',
            name: 'Pull up bar',
            priceInDollar: 20,
            url: 'https://www.top.me/wp-content/uploads/2015/03/img_54fc2f9c33cf8.png',
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
            <h1 className='mt-5 mb-5'>Sport</h1>
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
