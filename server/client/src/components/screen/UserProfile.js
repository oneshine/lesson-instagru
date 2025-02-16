import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const UserProfile = () =>{
  const[userProfile,setProfile] = useState(null)
  //const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const {userid} = useParams()
  const [showFollow,setShowFollow] = useState(state? !state.following.includes(userid): true)




  useEffect(()=>{
    fetch(`/user/${userid}`,{
        headers:{
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        }
    })
    .then(res=>res.json())
    .then(result =>{
        setProfile(result)

    })
  },[])



  const followUser = ()=>{
      fetch('/follow',{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem('jwt')
          },
          body:JSON.stringify({
              followId:userid
          })
      }).then(res=>res.json())
      .then(data=>{

          dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
           localStorage.setItem("user",JSON.stringify(data))
           setProfile((prevState)=>{
               return {
                   ...prevState,
                   user:{
                       ...prevState.user,
                       followers:[...prevState.user.followers,data._id]
                      }
               }
           })
           setShowFollow(false)
      })
  }




  const unfollowUser = ()=>{
          fetch('/unfollow',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem('jwt')
              },
              body:JSON.stringify({
                  unfollowId:userid
              })
          }).then(res=>res.json())
          .then(data=>{

              dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
               localStorage.setItem("user",JSON.stringify(data))

               setProfile((prevState)=>{
                  const newFollower = prevState.user.followers.filter(item=>item != data._id )
                   return {
                       ...prevState,
                       user:{
                           ...prevState.user,
                           followers:newFollower
                          }
                   }
               })
               setShowFollow(true)

          })
      }


  return(
<>
{userProfile ?

<div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div style={{
        display:"flex",justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
      }}>
          <div>
              <img style={{width:"160px", height:"160px",borderRadius:"80px"}}
              src={userProfile.user.pic} alt="profile-img"
              />
          </div>
          <div>
                <h4>{userProfile.user.name}</h4>
                <h4>{userProfile.user.email}</h4>
                <div style={{
                    display:'flex',
                    justifyContent:"space-between",
                    width:"108%",

                  }}>

                    <h5>{userProfile.posts.length} posts</h5>
                    <h5>{userProfile.user.followers.length} followers</h5>
                    <h5>{userProfile.user.following.length} following</h5>
                </div>
                {showFollow ?

                  <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  type="button"
                  onClick={()=>followUser()}
                  >Follow
                  </button>
                  :
                  <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  style={{margin:'10px'}}
                  type="button"
                  onClick={()=>unfollowUser()}
                  >UnFollow
                  </button>
                }

          </div>
     </div>
     <div className="gallary">
          {
            userProfile.posts.map((item,id)=>{
              return(
                <img src={item.photo} alt={item.title} key={id} />
              )
            })

          }
     </div>
</div>
 : <h2>Loading...!</h2>}
</>
  )
}


export default UserProfile
