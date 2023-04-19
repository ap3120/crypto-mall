import React, {useState, useEffect} from 'react';

import {addToBasket} from '../app/basketSlice.js';
import {useSelector, useDispatch} from 'react-redux';

import {Img} from 'react-image';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export const Clothing = ({isSignedIn, contractId, wallet}) => {
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
            id: 'c-1',
            name: 'Shirt',
            priceInDollar: 20,
            url: 'https://www.repertoirefashion.co.uk/images/ami-mens-summer-fit-broad-stripe-blue-white-shirt-p30518-124928_image.jpg',
            quantity: 0,
        },
        {
            id: 'c-2',
            name: 'T Shirt',
            priceInDollar: 10,
            url: 'https://i.etsystatic.com/12355681/r/il/1a260b/1587523210/il_fullxfull.1587523210_t3ob.jpg',
            quantity: 0,
        },
        {
            id: 'c-3',
            name: 'Dress',
            priceInDollar: 40,
            url: 'https://media.ezibuy.com/productimages/221363/Navy/Heine_Sequin_Lace_Dress_SuperZoom_4_10067988480030.jpg',
            quantity: 0,
        },
        {
            id: 'c-4',
            name: 'Hat',
            priceInDollar: 10,
            url: 'https://ae01.alicdn.com/kf/HTB1juwDPXXXXXclaXXXq6xXFXXXY/Hat-2016-Spring-summer-Children-flower-dome-straw-hat-baby-girls-Beach-Hats-kids-sun-hat.jpg',
            quantity: 0,
        },
        {
            id: 'c-5',
            name: 'Suit',
            priceInDollar: 180,
            url: 'https://pauseonline.s3.amazonaws.com/wp-content/uploads/2017/04/suit.jpg',
            quantity: 0,
        },
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
            <h1 className='mt-5 mb-5'>Clothing</h1>
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
                                    $ {item.priceInDollar} = {item.priceInDollar*nearToDollar} Ⓝ 
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
