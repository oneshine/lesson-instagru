import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () =>{
  const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const [image,setImage] = useState('')
  const [url,setUrl] = useState(undefined)


  useEffect(()=>{
    fetch('/mypost',{
        headers:{
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        }
    })
    .then(res=>res.json())
    .then(result =>{
        setPics(result.mypost)
    //    console.log(result)
    })
  },[])



useEffect(()=>{
    if(image){

         const data = new FormData()
         data.append("file",image)
         data.append("upload_preset","instylegru")
         data.append("cloud_name","little-codekrub")

                 //link to cloudinary.com for upload image
         fetch("	https://api.cloudinary.com/v1_1/little-codekrub/image/upload",{
             method:"post",
             body: data

         })
         .then(res=>res.json())
         .then(data=>{
        //     console.log(data)
             localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
             dispatch({type:"UPDATEPIC",payload:data.url})
                   fetch("/updatepic",{
                            method:"put",
                            headers:{
                              "Content-Type":"application/json",
                              "Authorization":"Bearer "+ localStorage.getItem("jwt")
                            },
                            body: JSON.stringify({
                                  pic: data.url
                            })
                   })
                   .then(res => res.json())
                   .then(result=>{
                //     console.log(result)
                   })
         })
         .catch(err=>{
             console.log(err)
         })
    }
},[image])



 const updatePhoto=(file)=>{
   setImage(file)

 }


  return(
<div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div style={{
        display:"flex",justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"
      }}>
          <div className="d-flex flex-column">
              <img style={{width:"160px", height:"160px",borderRadius:"80px"}}
              src={state? state.pic : "loading"} alt="profile-photo"
              />
              <div className="file-field input-field">
                      <div className="btn">
                        <span>Update</span>
                        <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])}/>
                      </div>

                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                      </div>
              </div>



          </div>
          <div>
                <h4>{state ? state.name : "loading"}</h4>
                <h4>{state ? state.email : "loading"}</h4>
                <div style={{
                    display:'flex',
                    justifyContent:"space-between",
                    width:"108%",

                  }}>
                    <h5>{mypics.length} posts</h5>
                    <h5>{state ? state.followers.length : "0"} followers</h5>
                    <h5>{state ? state.following.length : "0"} following</h5>
                </div>
          </div>
     </div>
     <div className="gallary">
          {
            mypics.map((item,id)=>{
              return(
                <img src={item.photo} alt={item.title} key={id} />
              )
            })

          }
     </div>
</div>
  )
}


export default Profile
