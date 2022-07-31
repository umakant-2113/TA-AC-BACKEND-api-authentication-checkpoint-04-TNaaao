var express = require('express');
var router = express.Router();

let User=require("../models/User")
let auth= require("../middleware/auth")
/* GET users listing. */


router.post("/register",async(req,res,next)=>{
  try {
    let user= await User.create(req.body);
    let token = await user.verifyToken()
    res.status(200).json({user:user.userJSON(token)})
  } catch (error) {
    next(error)
  }
})

// logi page 

router.post("/login",async (req,res,next)=>{
let {email,password}=req.body;
if(!email && !password){
  res.status(400).json({Error: "email and password is required"})
}
let user= await User.findOne({email});
if(!user){
  res.status(400).json({Error: "email  is required"})
}
let result= await user.verifyPassword(password);
if(!result){
  res.status(400).json({Error: "email  is required"})
}
let token = await user.verifyToken()
 res.status(200).json({user:user.userJSON(token)})
})

// current-user
router.get("/current-user", auth.verifyToken, async (req,res,next)=>{
let userId= req.users.userId ;
let user= await User.findById(userId);
let token = await user.verifyToken()
let userData= {
  username: user.username,
  email:user.email,
  token :token
}
res.status(200).json(userData)

})

module.exports = router;
