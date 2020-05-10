import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const Navbar =()=>{

  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
          if(state){
            return(
              <ul>
              <li><Link to="/profile">Profile</Link></li>,
              <li><Link to="/createpost">CreatePost</Link></li>,
              <li><Link to="/myfollowingpost">My Folling Post</Link></li>
              <li>
                  <button className="btn #c62828 red darken-3"
                    onClick={()=>{
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/signin')
                      }
                    }
                  >Logout
                  </button>
              </li>
              </ul>
            )
          }else{
            return (
              <ul>
              <li><Link to="/signin">Signin</Link></li>,
              <li><Link to="/signup">Signup</Link></li>
              </ul>
            )
          }
  }

  return(
<nav>
  <div className="nav-wrapper white">
    <Link to={state? "/" : "/signin"} className="brand-logo left">InStyleGru</Link>
    <ul id="nav-mobile" className="right">
        {renderList()}
    </ul>
  </div>
</nav>
  )
}

export default Navbar
