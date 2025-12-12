const { InternalServerError, MissingFieldsError, AlreadyExistsError, NotFoundError } = require("../helpers/errors");
const { Created, Success } = require("../helpers/success");
const User = require("../models/user.model");
const bcrypt=require("bcryptjs");
const registerSchema = require("../validation/auth.validation");
const generateToken = require("../helpers/generateToken");

const registerController = async (req, res) => {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
  
      const { firstName, lastName, password, email, phone } = req.body;
  
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        return AlreadyExistsError(res)
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await User.create({ firstName, lastName, email, phone, password: hashedPassword });
      const userResponse = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
      };
  
      const token = generateToken(newUser._id);
      return Created(res, { user: userResponse, token });
    } catch (error) {
      console.error(`Error in registerController: ${error.message}`, { error, body: req.body });
      return InternalServerError(res);
    }
  };


const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return MissingFieldsError(res);
        }
        const user=await User.findOne({email:email});
        if(!user){
            return NotFoundError(res);
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid email or password"})
        }
        const token=generateToken(user?._id)
        return Success(res,{user,token})

    }catch(error){
        console.log(error)
        return InternalServerError(res);
    }
}

module.exports={loginController,registerController}