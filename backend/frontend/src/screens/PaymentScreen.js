import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen({history}) {
    const [paymentMethod, setPaymentMethod] = useState('Pay Pal')
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault(e)
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')

    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <Form onSubmit={submitHandler} >
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Pay Pal or Credit Card'
                            id='paypal'
                            name='paymentmethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
