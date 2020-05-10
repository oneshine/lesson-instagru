import React,{useEffect,createContext,useReducer,useContext }  from 'react';
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'

import Home from './components/Home'
import Signin from './components/screen/Signin'
import Signup from './components/screen/Signup'
import Profile from './components/screen/Profile'
import CreatePost from './components/screen/CreatePost'
import SubscribsUserPosts from './components/screen/SubscribsUserPosts'

import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screen/UserProfile'
export const UserContext = createContext()




const Routing =()=>{

  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
  //      console.log(typeof(user)) // check type of data
        if(user){
          dispatch({type:"USER",payload:user})
          // history.push('/')
        }else{
          history.push('/signin')
        }
  },[])

  return(
    <Switch>
            <Route exact path="/">
                  <Home />
            </Route>
            <Route path="/signin">
                  <Signin />
            </Route>
            <Route path="/signup">
                  <Signup />
            </Route>
            <Route  exact path="/profile">
                  <Profile/>
            </Route>
            <Route path="/createpost">
                  <CreatePost />
            </Route>
            <Route path="/profile/:userid">
                  <UserProfile />
            </Route>
            <Route path="/myfollowingpost">
                  <SubscribsUserPosts />
            </Route>

    </Switch>
  )
}



function App() {

  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>

              <Navbar />
              <Routing />

        </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
