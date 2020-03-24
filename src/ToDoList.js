import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, withRouter } from 'react-router-dom'
import Edit from './Edit'

function ToDoList(){
    const [todos, setToDo] = useState([])
    const [id, setId] = useState('')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('') 
    const history = useHistory()

    useEffect(()=>{
        if(!id){
            getTodos()
         }
    }, [id, todos])

    const getTodos = () =>{
        let token = localStorage.getItem("token")
        axios.get("/todo",{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            setToDo(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    const onEdit = (ti,tt, td) =>{
       setId(ti)
       setTitle(tt)
       setDescription(td)
    }

    const onDone = (value) =>{
        let token = localStorage.getItem("token")
        axios.put("/todo/archive", {id: value},{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
           getTodos()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onDelete = (value) =>{
        let token = localStorage.getItem("token")
        axios.delete("/todo",{data:{id: value},
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
           getTodos()
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            {id && <Edit id={id} title={title} description={description} onEdit={onEdit} />}
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h4 className="mt-2 mb-2">Todos
                    <button className="btn btn-sm ml-4 btn-primary" onClick={()=>{ history.push("/createtodo") }}>
                        Create Todo
                    </button>
                    <button className="btn btn-sm ml-4 btn-primary" onClick={()=>{history.push('/archived')}}>
                        Archived Todos
                    </button>
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                { todos.map((todo)=>(
                    <div key={todo._id} className="card mb-2">
                        <div className="card-body">
                            <h5 className="card-title">{todo.title}</h5>
                            <p className="card-text">{todo.description}</p>
                            <button className="btn btn-primary btn-sm mr-2" onClick={()=>{onEdit(todo._id, todo.title, todo.description)}}>Edit</button>
                            <button className="btn btn-primary btn-sm mr-2" onClick={()=>{onDone(todo._id)}}>Done</button>
                            <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(todo._id)}}>Delete</button>
                        </div>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    )          
}

export default withRouter(ToDoList)