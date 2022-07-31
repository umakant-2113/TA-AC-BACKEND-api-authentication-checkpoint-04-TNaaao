let jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;
    try {
      if (token) {
        let payload = await jwt.verify(token, process.env.secret);
        req.users = payload;
        next();
      } else {
        res.status(400).json({ Error: 'token is required' });
      }
    } catch (error) {
      next(error);
    }
  },
optionalAuth: async(req,res,next)=>{
  let token = req.headers.authorization;
  try {
    if(token){
      let payload= await jwt.verify(token, process.env.secret);
      req.users=null;
      next()
    }else{
      res.status(400).json({ Error: 'token is required' });
    }
  } catch (error) {
    next(error)
  }
}
};
