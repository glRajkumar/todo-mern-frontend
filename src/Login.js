import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, withRouter} from 'react-router-dom'

const Login = ({updateEmail}) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPass ] = useState('')
    const [ logfail, setLogfail ] = useState(false)
    const history = useHistory()

    const onSubmit = (e) =>{
        e.preventDefault();

        axios.post("/user/login",{ email ,password })
        .then((res)=>{
            localStorage.setItem("token", res.data); 
            updateEmail(email)
            history.push("/todolist")
        }).catch((err)=>{
            setLogfail(true)
            console.log(err)
        })
    }

    return(
        <div>
        <div className="row">
            <div className="col-md-4 offset-md-4 ">
                <h4 className="text-center">Log in</h4>
            </div>
        </div>
        <div className="row">
            { logfail &&
                <div className="col-md-4 offset-md-4 ">
                    <div className="alert alert-danger" role="alert">
                    Invalid login credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-4 offset-md-4 col-sm-12">
              <div>
                <div className="form-group">
                    <label>Email </label>
                    <input className="form-control" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Password </label>
                    <input className="form-control" type="password" onChange={(e) => setPass(e.target.value)}></input>
                </div>
                <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(Login)