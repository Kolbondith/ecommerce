import React, { useEffect } from 'react'
import {  Button, Table, Row, Col  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
import Paginate from '../components/Paginate'



function ProductsListScreen({history}) {

    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList)
    const {loading, products, error, page, pages} = productList

    const userLogin = useSelector( state => state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector( state => state.productDelete)

    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete

    const productCreate = useSelector( state => state.productCreate)

    const {lodaing: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct} = productCreate

    let keyword = history.location.search

    const deleteHandler = (id) =>{
        if (window.confirm('Are you sure you want to delete this product?')) {
           dispatch(deleteProduct(id))
        }
       
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate){
            history.push(`/admin/products/${createdProduct._id}/edit`)
        }
        else{
            dispatch(listProducts(keyword))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])
    return (
        <div>
            <Row className='align-item-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map( product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={page} pages={pages} isAdmin={true} />
                </div>
            )}
        </div>
    )
}

export default ProductsListScreen
