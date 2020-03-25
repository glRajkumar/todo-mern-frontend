import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, withRouter} from 'react-router-dom'

const Signup = () =>{
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [password, setPass] = useState('')
    const [ logfail, setLogfail ] = useState(false)
    const [ nameErr, setNErr] = useState(false)
    const [ emailErr, setEmErr] = useState(false)
    const [ passErr, setPsErr] = useState(false)
    const [ nmsg, setNMsg] = useState('')
    const [ emsg, setEMsg] = useState('')
    const [ pmsg, setPMsg] = useState('')
    const history = useHistory()

    const nvalid = (value) => {
        if(value === ''){
            setNErr(true)
            setNMsg('Please Provide name')
            return false
        }
        if(value.length < 3){
            setNErr(true)
            setNMsg('Name must be atleast 3 charactrs')
            return false
        }
        if(value !== '' && value.length >= 3){
            setNErr(false)
            setNMsg('')
            return true
        }
    }

    const evalid = (value) => {
        let atpos = value.indexOf('@')
        let dotpos = value.indexOf('.')
        if(value === ''){
            setEmErr(true)
            setEMsg('Please Provide email id')
            return false
        }
        if(atpos < 1 && (dotpos - atpos < 2)){
            setEmErr(true)
            setEMsg('Please provide correct email')
            return false
        }
        if((value !== '') && (atpos >= 1 && (dotpos - atpos >= 2))){
            setEmErr(false)
            setEMsg('')
            return true
        }
    }
    
    const pvalid = (value) => {
        if(value === ''){
            setPsErr(true)
            setPMsg('Please Provide password')
            return false
        }
        if(value.length < 8){
            setPsErr(true)
            setPMsg('Password must be atleast 8 charactrs')
            return false
        }
        if(value !== '' && value.length >= 8){
            setPsErr(false)
            setPMsg('')
            return true
        }
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        
        if(nmsg === '' && emsg === '' && pmsg === ''){
            axios.post("/user/register",{ name, email, password })
            .then((res)=>{
                history.push("/login")
            }).catch((err)=>{
                setLogfail(true)
                console.log(err)
            })    
        }
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
                    <input
                     className="form-control"
                     type="text"
                     onChange={(e) => {
                        nvalid(e.target.value)
                        setName(e.target.value)
                        }}
                    ></input>
                </div>
                { 
                nameErr && <div className="alert alert-danger" role="alert"> {nmsg} </div>                        
                }

                <div className="form-group">
                    <label>Email </label>
                    <input
                     className="form-control"
                     type="text"
                     onChange={(e) => {
                        setEmail(e.target.value)
                        evalid(e.target.value) 
                        }}
                    ></input>
                </div>
                { 
                emailErr && <div className="alert alert-danger" role="alert"> {emsg} </div>                        
                }

                <div className="form-group">
                    <label>Password </label>
                    <input
                     className="form-control"
                     type="password"
                     onChange={(e) =>{ 
                        setPass(e.target.value)
                        pvalid(e.target.value)
                    }}
                    ></input>
                </div>
                { 
                passErr && <div className="alert alert-danger" role="alert"> {pmsg} </div>                        
                }

                <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default withRouter(Signup)