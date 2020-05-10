const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} =  mongoose.Schema.Types


const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  pic:{
    type: String,
    default:"https://res.cloudinary.com/little-codekrub/image/upload/v1587106206/no-images_ecln4y.png"
  },
  followers:[{type: ObjectId, ref:"User"}],
  following:[{type: ObjectId, ref:"User"}]

})

mongoose.model('User',userSchema)
