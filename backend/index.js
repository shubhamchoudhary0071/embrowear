const express=require("express")
const morgan=require("morgan")
const cors=require("cors")
const dotenv=require("dotenv");
const connectDB = require("./config/db");

dotenv.config()

const app=express();
connectDB()



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan("dev"));

app.use("/api",require("./routes/route"))


const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server is running on port ",port);
})


