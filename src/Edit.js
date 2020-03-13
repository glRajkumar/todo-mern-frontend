import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory, withRouter} from 'react-router-dom'

function Edit(props){
    const [ id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    
    useEffect(()=>{
        if(id !== ''){
        getTodoOfId()
        }
    },[id])

    const getTodoOfId = () =>{
        let token = localStorage.getItem("token")
        let idvalue = setId(props.location.value)
        console.log(idvalue) 
        axios.get("/todo",{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            console.log(res.data)
        })
    }

    const onSubmit = () => {
        let token = localStorage.getItem("token")
        axios.put("/todo", {id, title, description},{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            history.push("/todolist")
        })
    }

    return(
    <div className="row">                         
        <div className="col-md-4 offset-md-4 col-sm-12">
            <div>
                <div className="form-group">
                    <label>Title </label>
                    <input className="form-control" type="text" onChange={(e)=>{setTitle(e.target.value)}}></input>
                </div>

                <div className="form-group">
                <label>Description </label>
                <textarea className="form-control" type="text" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                </div>
                <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    </div>
    )

}

export default withRouter(Edit)