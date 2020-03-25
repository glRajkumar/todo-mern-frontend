import React from 'react'
import { Link } from 'react-router-dom'

const UnAuthor = () =>{
return(
    <h2 className="text-center text-light bg-dark mt-2 p-2">
        You should login first or if you new to our web, Please signup.
        Please go back to home from here <Link to="/">Home</Link>
    </h2>
)
}

export default UnAuthor