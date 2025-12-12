
const mongoose=require("mongoose")


const connectDB=async()=>{
    if(!process.env.MONGO_URI){
        throw new Error("Invalid connection string")
    }
    try{
        await  mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Db connected successfully")
    }catch(error){
        console.log("Mongodb connection error ",error)
    }
}

module.exports=connectDB;