let express = require('express');
let router = express.Router();

let auth = require('../middleware/auth');
router.use(auth.verifyToken);

let Question = require('../models/Questions');
const User = require('../models/User');
let Answer=require("../models/Answer")


router.post('/questions', async (req, res, next) => {
  req.body.slug = req.body.title.split(' ').join('-');
  req.body.tags=req.body.tags.split(" ")
  let userId=req.users.userId;

let user= await User.findOne({userId})
req.body.author = {
    id: user._id,
    username: user.username
}
  let question = await Question.create(req.body);

  res.json(question)
});

// list of question
router.get("/questions", async(req,res,next)=>{
let allQuestions= await Question.find({});
res.json(allQuestions)
})

// update question
router.put("/questions/:questionId", async(req,res,next)=>{
let questionId=req.params.questionId;
let userId=req.users.userId;
let user= await User.findOne({userId})

req.body.author = {
    id: user._id,
    username: user.username
}

let updatedQuestion = await Question.findByIdAndUpdate(questionId,req.body,{new:true})
res.json(updatedQuestion)
})


// delete questions

router.delete("/questions/:slug",  async(req,res,next)=>{
let slug= req.params.slug;
let question= await Question.findOne({slug});
let questionId= question.id;
let removeQuestion= await Question.findByIdAndDelete(questionId);
res.json({remove : "this question is removed"})
})

// create answer for particular questions

router.post("/questions/:questionId/answer", async(req,res,next)=>{
    let questionId=req.params.questionId;
    let userId=req.users.userId;
    let user= await User.findOne({userId})
    req.body.author = {
        id: user._id,
        username: user.username
    }
    
    let answer= await Answer.create(req.body);
    console.log(answer)
    let question= await Question.findByIdAndUpdate(questionId, {$push : {answer: answer.id}},{new:true});
    let AnswerWithQuestions= await Question.findById(questionId).populate("answer");

    res.json(AnswerWithQuestions)
})

// all  answer

router.get("/questions/:questionId/answers", async(req,res,next)=>{
let userId= req.users.userId;
let questionId= req.params.questionId;
let question= await Question.findById(questionId).populate("answer");
res.json(question.answer)

})

// update answer 

router.put("/questions/answers/:answerId",  async(req,res,next)=>{
let answerId=req.params.answerId;
let answer= await Answer.findByIdAndUpdate(answerId,req.body,{new:true});
res.json(answer)
})

// deleted answer 

router.delete("/questions/answers/:answerId",  async(req,res,next)=>{
    let answerId=req.params.answerId;
    let answer= await Answer.findByIdAndDelete(answerId);
    res.json({remove: "this answer is deleted" })
    })

    // taglist of all questions
    
    router.get("/questions/tags", async(req,res,next)=>{
let questions= await Question.find({}).distinct("tags");
res.json(questions)
    })


module.exports = router;
