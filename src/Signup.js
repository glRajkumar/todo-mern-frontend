import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, withRouter} from 'react-router-dom'

const Signup = () =>{
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [password, setPass] = useState('')
    const [ logfail, setLogfail ] = useState(false)
    const history = useHistory()

    const onSubmit = (event) =>{
        event.preventDefault();

        axios.post("/user/register",{ name, email, password })
        .then((res)=>{
            history.push("/login")
        }).catch((err)=>{
            setLogfail(true)
            console.log(err)
        })
    }

    return(
        <div>
        <div className="row">
            <div className="col-md-4 offset-md-4 ">
                <h4 className="text-center">Sign Up</h4>
            </div>
        </div>
        <div className="row">
            { logfail &&
                <div className="col-md-4 offset-md-4 ">
                    <div className="alert alert-danger" role="alert">
                    Invalid Signup credentials
                    </div>
                </div>
            }   
        </div>
        <div className="row">            
            <div className="col-md-4 offset-md-4 col-sm-12">
              <div>
                <div className="form-group">
                    <label>Name </label>
                    <input className="form-control" type="text" onChange={(e) => setName(e.target.value)}></input>
                </div>
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

export default withRouter(Signup)