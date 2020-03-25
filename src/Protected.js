import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Protected = ({ component: Component, email, ...rest }) =>{
    return(
        <Route {...rest} render={
            props =>{
                if(email){
                    return <Component {...rest} {...props} />
                }else{
                    return <Redirect to='/unauth' />
                }
            } 
         } />
    )
}

export default Protected