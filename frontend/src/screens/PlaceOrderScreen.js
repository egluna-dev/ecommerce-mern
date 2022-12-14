import { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);

    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

    // Calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    cart.shippingPrice = addDecimals((cart.itemsPrice > 100) ? 0 : 100);

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const dispatch = useDispatch();

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error }  = orderCreate;

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
    })

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <hr />
                        <p>
                            <strong>Address:&nbsp;</strong>
                            
                            {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode} &nbsp;
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: &nbsp;</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='warning'>You cart is empty</Message> : (
                            <Message>
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping Price</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Taxes &#40;GST&#41;</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Price</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>

                    </ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message> }
                    <ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen