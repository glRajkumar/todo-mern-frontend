import React,{useState} from 'react'
import axios from 'axios'

function Edit(props){
    const [ title, setTitle ] = useState(props.title)
    const [ description, setDescription ] = useState(props.description) 
    
    const onSubmit = () => {
        let token = localStorage.getItem("token")
        axios.put("/todo", {id: props.id, title, description},{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            props.onEdit('','','')
        })
    }

    return(
    <div className="row">                         
        <div className="col-md-4 offset-md-4 col-sm-12">
            <div>
                <div className="form-group">
                    <label>Title </label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder={`${title}`} 
                        defaultValue={title} 
                        onChange={(e)=>{setTitle(e.target.value)}}
                        />
                </div>
                <div className="form-group">
                    <label>Description </label>
                    <textarea 
                        className="form-control"
                        type="text"
                        placeholder={`${description}`} 
                        defaultValue={description} 
                        onChange={(e)=>{setDescription(e.target.value)}}
                        ></textarea>
                </div>
                <button className="btn btn-outline-primary" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    </div>
    )
}

export default Edit