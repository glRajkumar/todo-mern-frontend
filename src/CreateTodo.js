import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, withRouter} from 'react-router-dom'

function CreateTodo(){
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()
    
    const onSubmit = () => {
        let token = localStorage.getItem("token")
        axios.post("/todo", { title, description },
            {
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            history.push("/todolist")
        })
    }

    return(
        <div>
          <div className="row">
            <div className="col-md-4 offset-md-4 ">
                <h4 className="text-center">Create Todo</h4>
            </div>
          </div>
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
        </div>
    )
}

export default withRouter(CreateTodo)