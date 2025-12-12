
const InternalServerError=(res)=>{
    return res.status(500).json({success:false,message:"Internal Server error"})
}
const NotFoundError=(res)=>{
    return res.status(404).json({success:false,message:"Not found"})
}
const MissingFieldsError=(res)=>{
    return res.status(400).json({success:false,message:"Missing Required Fields"})
}

const AlreadyExistsError=(res)=>{
    return res.status(400).json({success:false,message:"Already Exists"})
}




module.exports={InternalServerError,NotFoundError,MissingFieldsError,AlreadyExistsError}