let express=require("express");
const User = require("../models/User");
let router=express.Router()

// get profile 

router.get("/:username", async(req,res,next)=>{
let username=req.params.username;
let user=await User.findOne({username});
let profiledata={
    user:user.username,
    bio:user.bio,
    email:user.email,
    image:user.image
}
res.json(profiledata)
})

//upadte profile 

router.put("/:username", async (req,res,next)=>{
let username=req.params.username;
let user= await User.findOne({username})
let updateUser= await User.findByIdAndUpdate(user._id, req.body,{new:true})
let profileupdated={
    username :updateUser.username,
    name:updateUser.name,
    bio:updateUser.bio,
    email:updateUser.email,
    image:updateUser.image    
}
res.status(200).json(profileupdated)
})



module.exports=router