import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () =>{
  const history = useHistory()
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [image,setImage] = useState('')
  const [url,setUrl] = useState(undefined)

  useEffect(()=>{
        if(url){
            uploadFields()
        }
  },[url])


  const uploadPic =()=>{
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
        setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
  }


  const uploadFields =()=>{

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
      return;
}
      fetch("/signup",{
            method:"post",
            headers:{"Content-Type": "application/json"
          },
          body:JSON.stringify({
            name,
            password,
            email,
            pic: url
          })
    }).then(res=>res.json())
    .then(data=>{
          if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
          }
          else{
            M.toast({html:data.message,classes:"#00e676 green accent-3"})
            history.push('/signin')
          }
    }).catch(err=>{
          console.log(err)
    })
  }




  const PostData = () =>{

    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
  }



  return(
    <div className="mycard">
            <div className="card auth-card input-field">
                      <h2>Instagru</h2>

                      <input
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      />

                      <input
                      type="text"
                      placeholder="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      />

                      <input
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      />

                      <div className="file-field input-field">
                              <div className="btn">
                                <span>Upload Profile Image</span>
                                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                              </div>

                              <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                              </div>
                      </div>

                      <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                      type="button"
                      onClick={()=>PostData()}
                      >Signup
                      </button>
                      <h5>
                          <Link to ="signin">Already have an account ?</Link>
                      </h5>

            </div>
    </div>
  )
}


export default Signup
