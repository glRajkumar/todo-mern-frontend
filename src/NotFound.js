import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () =>{
    return(
        <h1 className="text-center text-light bg-dark mt-2 p-2">
            The path is not found, Please try again in correct path.
            <Link to='/'>Home</Link>
        </h1>
    )
}

export default NotFound