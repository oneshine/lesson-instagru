const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
        //authorization === Bearer ssdfaexswesdseerdsse
        if(!authorization){
              res.status(400).json({error:"you must be logged in"})
        }
        const token = authorization.replace("Bearer ","")
        jwt.verify(token,JWT_SECRET,(err,payload)=>{
            if(err){
              res.status(401).json({error:"you must be logged in"})
            }

            const { _id } = payload

            User.findById(_id).then(userdata =>{
                req.user = userdata
                next()
            })
                // next()  ouside of User.findOne will cannot use req.user
        })
}
