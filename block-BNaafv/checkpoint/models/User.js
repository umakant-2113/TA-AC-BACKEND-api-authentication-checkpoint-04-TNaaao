let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// bcrypt password
let bcrypt = require('bcrypt');
let jwt=require("jsonwebtoken");

let userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  isAdmin:{type:Boolean,default: false},
  isBlock: {type: Boolean ,default: false}
});

userSchema.pre('save', async function (next) {
let adminEmail=["lodhiumakant800@gmail.com"];
if(adminEmail.includes(this.email)){
  isAdmin= true
}


  if (this.password && this.isModified('password')) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next()  
    } catch (error) {
        next(error)
    }
  }else{
    next()
  }
});

// compare password
userSchema.methods.verifyPassword= async function(password){
        let result= await bcrypt.compare(password,this.password);
        return result;
}

// generat token

userSchema.methods.verifyToken= async function(){
    let payLoad= { email  :  this.email ,  userId  :  this.id};
    let token= await jwt.sign(payLoad,process.env.secret);
        return token;   
}

// json data

userSchema.methods.userJSON= function(token){
  return{
    username:this.username,
    email:this.email,
    token:token
  }
}
module.exports = mongoose.model('User', userSchema);
