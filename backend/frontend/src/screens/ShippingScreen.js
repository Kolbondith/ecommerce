import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutStep from '../components/CheckoutStep'
import {saveShippingAddress} from '../actions/cartActions'

function ShippingScreen({history}) {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const submitHandler = (e) =>{
        e.preventDefault(e)
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Your address Here'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        City
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Your City Here'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Postal Code
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Your address Here'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Country
                    </Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Your Country Here'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button 
                    type='submit'
                    variant='primary'
                >
                    Continue
                </Button>
            </Form>
            
        </FormContainer>
    )
}

export default ShippingScreen
