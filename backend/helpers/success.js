

const Success=(res,data)=>{
    return res.status(200).json({success:true,data:data});
}

const Created=(res,data)=>{
    return res.status(201).json({success:true,data:data});
}

module.exports={Success,Created}