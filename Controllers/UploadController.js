/** @type {import("express").RequestHandler} */
export const UploadImg =async(req,res)=>{

  try{
  console.log(req);
  res.send(); 
  }
  catch(error)
  {
    console.log(error)
    res.send('error')
  }
   
}
