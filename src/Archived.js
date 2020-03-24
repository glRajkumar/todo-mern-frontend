import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory, withRouter} from 'react-router-dom'

function Archived(){
    const [todos, setToDo] = useState([])
    const history = useHistory()

    useEffect(()=>{
        getArchTodos()
    }, [])

    const getArchTodos = () =>{
        let token = localStorage.getItem("token")
        axios.get("/todo/finished",{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
            setToDo(res.data)
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
           getArchTodos()
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
    <div className="row">
        <button className="btn btn-sm ml-4 btn-primary" onClick={()=>{history.push('/todolist')}}>
            Back to Todos
        </button>
    </div>
    <div className="row">
        <div className="col-md-4 offset-md-4">
        { todos.map((todo)=>(
            <div key={todo._id} className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.description}</p>
                    <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(todo._id)}}>Delete</button>
                </div>
            </div>
            ))
        }
        </div>
    </div>
    </>
  )
}

export default withRouter(Archived)