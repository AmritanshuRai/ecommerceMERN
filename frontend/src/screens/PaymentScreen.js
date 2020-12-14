import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress) {
    history.push('/shipping');
  }
  // const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [paymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  const checkPaymentMethod = () => {};
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              checked
              onChange={(e) => checkPaymentMethod(e.target.value)}
              value='PayPal'
            />

            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              onChange={(e) => checkPaymentMethod(e.target.value)}
              value='Stripe'
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
