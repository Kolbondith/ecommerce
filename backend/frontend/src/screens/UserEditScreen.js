import React, { useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetail, updateUser} from '../actions/userAction'
import {USER_UPDATE_RESET} from '../constants/userConstants'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'





function UserEditScreen({match, history}) {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const {error, loading, user} = userDetail


    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userslist')
        }else{
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetail(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({'_id': user._id, name, email, isAdmin}))
    }
    return (
        <div>
            <Link to='/admin/userslist'>
                Go Back
            </Link>
            
            <FormContainer>
                <h1>
                   Edit User Profile
                </h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ?( <Loader/>) : error ? (<Message variant='danger'>{error}</Message>):(
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
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
                        <Form.Group controlId='email'>
                            <Form.Label>
                                Email Address
                            </Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Your Email Here'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>

                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
           </FormContainer> 
            
        </div>
    )
}

export default UserEditScreen