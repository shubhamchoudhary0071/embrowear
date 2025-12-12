const { Schema, default: mongoose } = require("mongoose");


const userSchema=new Schema({
    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    phone:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    gender:{type:String,required:true,trim:true,enum:["male","female","others"]},
    dob:{type:String,trim:true},
    role:{type:String,required:true,enum:["admin","user"],default:"user"},
    notifications:{type:Boolean,default:false}
},{
    timestamps:true
})

const User=mongoose.model("user",userSchema);

module.exports=User;