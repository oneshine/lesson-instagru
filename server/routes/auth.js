const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/signup',(req,res)=>{
    const { name,email,password,pic} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:'please add all the field'})
    }
    //    res.json({message:"signup successed"})
    User.findOne({email:email})
        .then((saveUser)=>{
          if(saveUser){
            return res.status(422).json({error:'User already exist'})
          }

            bcrypt.hash(password, 12) // 12 --> qty digit for hash
            .then(hashedpassord=>{
                        const user = new User({
                              name,
                              email,
                              password : hashedpassord,
                              pic
                        })

                            user.save()
                            .then(user=>{
                                  res.json({message:"saved successfully"})
                            })
                            .catch(err=>{
                                  console.log(err)
                            })
            })

        })
        .catch(err=>{

        })
})





router.get('/protected',requireLogin,(req,res)=>{
    res.send('hello user')
})




router.post('/signin',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
      res.status(422).json({error:"please add email or password"})
  }
  User.findOne({email: email})
      .then(savedUser =>{
              if(!savedUser){
                  return res.status(422).json({error:"Invalid email or password"})
              }
                  bcrypt.compare(password, savedUser.password)
                  .then(doMatch=>{
                          if(doMatch){
                            //    res.json({message:"successfully signin"})
                              const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                              const {_id,name,email,followers,following,pic} = savedUser
                              res.json({token,user:{_id,name,email,followers,following,pic}})
                          }
                          else{
                            return res.status(422).json({error:"Invalid email or password"})
                          }
                  })
                  .catch(err=>{
                    console.log(err)
                  })
      })

})




module.exports = router
