import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col  } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Register} from '../actions/userAction'

import FormContainer from '../components/FormContainer'

function LoginScreen( {location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Password do not match')
        }
        else{
            dispatch(Register(name,email, password))
        }
        
    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Your name Here'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Your Email Here'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Your Password Here'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Your Password Here'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Submit</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Have An Account ? <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        >
                            Click Here To Signin
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen