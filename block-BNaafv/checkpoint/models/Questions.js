let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let questionSchema=new Schema({
    title:{type:String,required:true},
    author:{
        username:{type:String},
        id:{type : Schema.Types.ObjectId, ref:"User" }
    },
    slug:{type:String},
    description:{type:String},
    tags:  [{type:String}],
    answer:[{type:Schema.Types.ObjectId,ref : "Answer"}]
},{timestamps:true})





module.exports=mongoose.model("Question",questionSchema)