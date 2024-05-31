import jsonwebtoken from 'jsonwebtoken'
const secretkey='354zdsf354zd';

/** @type {import("express").RequestHandler} */
const isJwtAuthenticated=(req,res,next)=>
{
let token= req.header('token');
console.log(token);
if(token==undefined)
  {
    res.status(401).send("error");
    
  }
  else
  {
    if(jsonwebtoken.verify(token,secretkey))
      {
        let userDetails=jsonwebtoken.decode(token,secretkey)
        console.log(userDetails);
        req.user=userDetails;
        next();
      }
    else
    return res.status(401).send("error");
    
  }
};


const getToken=(payload)=>{

  return jsonwebtoken.sign(payload,secretkey);
}

export {isJwtAuthenticated,getToken}
   