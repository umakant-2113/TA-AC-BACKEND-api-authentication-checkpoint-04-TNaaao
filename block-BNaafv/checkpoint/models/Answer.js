let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let answerSchema= new Schema({
    text:{type:String,require:true},
    author:{
        username:{type:String},
        id:{type : Schema.Types.ObjectId, ref:"User" }
    },
},{timestamps:true})


module.exports=mongoose.model("Answer",answerSchema)