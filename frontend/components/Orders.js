import React, {useState, useEffect} from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import * as dayjs from 'dayjs';

export const Orders = ({isSignedIn, contractId, wallet}) => {
    const [orders, setOrders] = useState([]);
    const [nearToDollar, setNearToDollar] = useState(0);

    if (!isSignedIn) {
        return (
            <Container>
                <h1 className='mt-5 mb-5'>My orders</h1>
                <p>Please connect your wallet to see your orders</p>
            </Container>
        );
    }

    useEffect(() => {
        const getOrders = async() => {
            let ordersList = await wallet.viewMethod({contractId: contractId, method: 'getOrders', args: {account_id: wallet.accountId}});
            setOrders(ordersList);
        }

        const getNearToDollar = async() => {
            let data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd").then(response => response.json())
            const near2usd = data['near']['usd']
            const amount_in_near = 1 / near2usd
            const rounded_two_decimals = Math.round(amount_in_near * 100) / 100;
            setNearToDollar(rounded_two_decimals);
        }

        getNearToDollar();
        getOrders();
    }, []);

    const formatDate = date => {
        const d = Math.floor(date/1000000);
        console.log(date);
        return dayjs(d).format('DD MMM YYYY') + ' at ' + dayjs(d).format('HH:mm');
    }

    return (
        <Container>
            <h1 className='mt-5 mb-5'>My orders</h1>
            <Accordion>
                {orders.map((order, index) => {
                    return (    
                        <Accordion.Item key={index} eventKey={index}>
                            <Accordion.Header>Order passed on {formatDate(order.timestamp)}</Accordion.Header>
                            <Accordion.Body>
                                <Table borderless hover>
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Unit price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.name}</td>
                                                    <td>$ {item.priceInDollar} = {Math.round(item.priceInDollar*nearToDollar*100)/100} Ⓝ </td>
                                                    <td>{item.quantity}</td>
                                                    <td>$ {item.priceInDollar*item.quantity} = {Math.round(item.priceInDollar*item.quantity*nearToDollar*100)/100} Ⓝ </td>
        </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                                <h3 className='mt-2'>Total: $ {order.totalPrice} = {Math.round(order.totalPrice*nearToDollar*100)/100} Ⓝ </h3>
                            </Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </Container>
    )
}
