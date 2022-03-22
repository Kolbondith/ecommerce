import React, { useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {updateProduct, listProductDetails} from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import axios from 'axios'





function ProductEditScreen({match, history}) {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    const [uploading, setUploading] = useState(false)
    

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {error, loading, product} = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = productUpdate

    

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productslist')
        }else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setImage(product.image)
                setPrice(product.price)
                setDescription(product.description)
            }
        }
    },[dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData
        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)
        try {
            const config = {
                headers : {
                    'Content-type':'multipart/form-data'
                }
            }
            const {data} = await axios.post(
                `/api/products/upload/`,
                formData,
                config
            )
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({'_id': product._id, name, price, brand, image, category, countInStock, description}))
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
                                placeholder='Enter product name Here'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>
                                Price
                            </Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Your Price Here'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>
                                Brand
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Product brand Here'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>
                                Image
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Product Image Here'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                            <Form.File
                                id='image file'
                                label='choose file'
                                custom
                                onChange={uploadFileHandler}
                            >

                            </Form.File>
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>
                                Category
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Product Category Here'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>
                                Count In Stock
                            </Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Product Stock Here'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>

                            <Form.Group controlId='description'>
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Product Description Here'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
           </FormContainer> 
            
        </div>
    )
}

export default ProductEditScreen