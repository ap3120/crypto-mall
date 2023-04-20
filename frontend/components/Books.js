import React, {useState, useEffect} from 'react';

import {addToBasket} from '../app/basketSlice.js';
import {useSelector, useDispatch} from 'react-redux';

import {Img} from 'react-image';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export const Books = ({isSignedIn, contractId, wallet}) => {
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
            id: 'b-1',
            name: 'Le Rouge et le Noir',
            priceInDollar: 4.5,
            url: 'https://i.pinimg.com/736x/54/f7/b0/54f7b036deef16bd5626111c3228404c.jpg',
            quantity: 0,
        },
        {
            id: 'b-2',
            name: 'Frankenstein',
            priceInDollar: 5,
            url: 'http://betweenthelines.in/wp-content/uploads/2012/11/frankenstein.jpg',
            quantity: 0,
        },
        {
            id: 'b-3',
            name: 'The Hound of the Baskervilles',
            priceInDollar: 8,
            url: 'https://s3-us-west-2.amazonaws.com/tabs.web.media/b/s/bs29/bs29-square-orig.jpg',
            quantity: 0,
        },
        {
            id: 'b-4',
            name: 'Candide',
            priceInDollar: 5.5,
            url: 'http://images-chapitre.com/ima1/original/470/53018470_10895107.jpg',
            quantity: 0,
        },
        {
            id: 'b-5',
            name: 'Les Miserables',
            priceInDollar: 15,
            url: 'https://s.s-bol.com/imgbase0/imagebase3/large/FC/0/7/7/0/9200000076800770.jpg',
            quantity: 0,
        },
        {
            id: 'b-6',
            name: 'Le comte de Monte Cristo',
            priceInDollar: 10,
            url: 'https://www.hachette.fr/sites/default/files/images/livres/couv/9782373492644-001-T.jpeg',
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
            <h1 className='mt-5 mb-5'>Books</h1>
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
