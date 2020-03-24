import React from 'react'
import { Route } from 'react-router-dom'

const Protected = ({ component: Component, ...rest }) =>{
    return(
        <Route {...rest} render={
            props => <Component {...rest} {...props} />
         } />
    )
}

export default Protected