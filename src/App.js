import React, {useState, useEffect} from 'react';
import { Switch, Route, useHistory, withRouter } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import CreateTodo from './CreateTodo';
import ToDoList from './ToDoList';
import axios from 'axios'
import Home from './Home';
import Archived from './Archived';
import NotFound from './NotFound';
import Protected from './Protected';

const App = () => {
  const history = useHistory()
  const [ email, setEmail ] = useState('')
  const [ token, setToken ] = useState('')
  
  const updateEmail = (value) => {
    setEmail(value)
  }

  useEffect(()=>{
    let existed = localStorage.getItem("token")
    if(existed){
      setToken(existed)
    } 
  
    if(token !== ''){
      axios.get("/user/me",{
        headers : {
            Authorization: "Bearer " + token
        }
    }).then((res)=>{
      setEmail(res.data.email)
      history.push("/todolist")
    })
    }
  }, [token])

  const logout = () =>{
    let token = localStorage.getItem("token")
    axios.post("/user/logout",{},{
            headers : {
                Authorization: "Bearer " + token
            }
        }).then((res)=>{
           localStorage.removeItem("token")
           history.push("/login")
        })
  }

  return (
    <div>
        <nav className="navbar text-light bg-dark">
          <a className="navbar-brand text-light" href="https://local.com">Todo App</a>
          
          <div className="form-inline">
            { 
              email !== "" ? 
              <button onClick={logout} className="btn btn-default text-light">Logout</button> 
              : ""
            }
          </div>
        </nav>

        <div>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login updateEmail={updateEmail} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/createtodo">
              <CreateTodo />
            </Route>
            <Route path="/todolist">
              <ToDoList />
            </Route>
            <Route path="/archived">
              <Archived />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
    </div>
  );
}

export default withRouter(App)