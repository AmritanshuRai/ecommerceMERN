import { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstant';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (order) {
    var { address, city, country, postalCode } = order.shippingAddress;
    //calculate prices
    // order.itemsPrice = order.orderItems.reduce(
    //   (acc, item) => acc + item.price * item.qty,
    //   0
    // );
  }

  useEffect(() => {
    // <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>
    const addPayPalScript = async () => {
      const response = await fetch('/api/config/paypal', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const clientId = await response.json();
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(match.params.id));
    } else if (!order?.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, match.params.id, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(match.params.id, paymentResult));
  };
  return (
    <Row>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name : </strong> {order?.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {address},{city},{postalCode},{country}
            </p>
            {order?.isDelivered ? (
              <Message variant='success'>
                deliveredAt at {order?.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order?.paymentMethod}
            </p>
            {order?.isPaid ? (
              <Message variant='success'>paid at {order?.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {!order?.orderItems.length && (
              <Message>Your order is empty</Message>
            )}
            {order?.orderItems.length && (
              <ListGroup variant='flush'>
                {order?.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x {item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order?.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>shipping</Col>
                <Col>${order?.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order?.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order?.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order?.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    currency='INR'
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;
