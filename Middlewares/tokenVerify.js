const reference = require("../References/customReferences.js");
const tokenVerify=(req,res,next)=>{
    // let token=req.headers.authorization.split(' ')[1]+"11"
   console.log( req.headers)
    let token=req.headers.authorization.split(' ')[1]
    console.log('********************token****************************')
    console.log(token)
    reference.jwt.verify(token,reference.jwtPrivateKey,(err)=>{
        if(err){
            console.log(err)
            res.send({message:"invalid signature!"})
        }
        else{
            next()
        }
    })
}
module.exports=tokenVerify