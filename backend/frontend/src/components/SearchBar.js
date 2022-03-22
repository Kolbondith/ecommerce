import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBar() {

    let history = useHistory()

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}`)
        }
        else{
            history.push(history.push(history.location.pathname))
        }
    }

    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control 
                    type='text'
                    value={keyword}
                    placeholder='Search'
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-sm-2 ml-sm-5'
                ></Form.Control>
                <Button type='submit' className='p-2' variant='outline-success'>
                    Search
                </Button>
            </Form>
            
        </div>
    )
}

export default SearchBar
