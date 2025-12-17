const mongoose = require("mongoose");
const {type} = require("os");

const adminSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    password:{type:Number,required:true,minlength:6},
    email:{type:String,required:true,unique:true,lowercase:true},
    role:{type:String,required:true},
},{Timestamp:true}
);
module.exports = mongoose.model("user",adminSchema)