import { useEffect } from 'react';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderCreate);
    const { order, loading, error }  = orderDetails;

    if(!loading) {
        const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2);

        // Calculate prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    });

  return (
    loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
        <> 
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>Email: </p> {order.user.email} &nbsp;
                            <hr />
                            <p>
                                <strong>Address:&nbsp;</strong>
                                
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode} &nbsp;
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>Not delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: &nbsp;</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='warning'>You order is empty</Message> : (
                                <Message>
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>   
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items Subtotal</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Taxes &#40;GST&#41;</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
  )
}

export default OrderScreen;