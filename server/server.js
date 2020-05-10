const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')


mongoose.connect(MONGOURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
  console.log('connected to mongodb')
})
  mongoose.connection.on('error',(error)=>{
    console.log('error connected',error)
  })


  require('./models/user')
  require('./models/post')

  app.use(express.json())

  app.use(require('./routes/auth'))
  app.use(require('./routes/post'))
  app.use(require('./routes/user'))





  // --------- understadning middle ware
//middlw ware function
// const customMiddleware = (req,res,next)=>{
//   console.log('middleware wxcuted!!!')
//         // if without next() server not completed loading
//   next() // use this argument to stop server
// }

// const secondMiddleware =(req,res,next)=>{
//   console.log('2nd middle ware run')
//   next()
// }
//
//
// // test -->  app.use(customMiddleware) //use middleware
//
// app.get('/',(req,res)=>{
//   console.log('home')
//   res.status(200)
//   .send('hello express')
// })
// // test --> use middleware in function
// app.get('/about',customMiddleware,secondMiddleware,(req,res)=>{
//   console.log('about')
//   res.send('this is about')
// })
// --------- understadning middle ware



if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    const path = require("path")

    app.get("*",(req,res)=>{
          res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })


}



app.listen(port,()=>console.log(`server connected to port ${port}`))
