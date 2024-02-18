const user = require("./../model/usermodel");
const responsefunction = require("./moviecrud");
const asyncErrorHandler = require("./../utlility/asyncerrorhandler");
const jwt = require("jsonwebtoken");
const util = require("util");
const customeError = require("../utlility/customerror");
const token = function (id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXP,
  });
};
exports.createuser = asyncErrorHandler(async (req, res, next) => {
  const usercreated = await user.create(req.body);
  if (usercreated) {
    const tokenid = token(usercreated._id);
    res
      .status(201)
      .json(
        responsefunction.responsefunction("succes", { usercreated, tokenid })
      );
  }
});
exports.loginuser = asyncErrorHandler(async (req, res, next) => {
  if (!req.body.email && !req.body.password) {
    const error = new customeError("email or password are required", 404);
    next(error);
  }

  const id = req.body.email;
  const pass = req.body.password;
  const userfound = await user.findOne({ email: id });

  if (userfound) {
    passwordFound = await userfound.comparePassword(pass);
    if (passwordFound) {
      const tokenid = await token(userfound._id);
      res.status(200).json(
        responsefunction.responsefunction("welcom user", {
          userfound,
          tokenid,
        })
      );
    } else {
      const error = new customeError("password incorrect", 400);
      return next(error);
    }
  } else {
    const error = new customeError("email or password incorrect", 400);
    return next(error);
  }
});
exports.userverify = asyncErrorHandler(async (req, res, next) => {
  const tokenpresent = req.headers.authorization;
  let token;
  if (!tokenpresent)
    return next(new customeError("you are required to login first", 400));
  if (tokenpresent && tokenpresent.startsWith("Bearer"))
    token = tokenpresent.split(" ")[1];
  const decodedtoken = await util.promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY
  );

  const userid=decodedtoken.id;
  const userfound = await user.findById(userid);
  if (!userfound)
    return next(
      new customeError("No user found with the given credentials", 404)
    );

  const changecheck=await userfound.checkPassChanged(decodedtoken.iat);
    if(changecheck) return next(
      new customeError("need to log in your password was changed", 400)
    );
  req.user = userfound;
  next();
});
exports.checkRole=(...role)=>{
  return (req,res,next)=>{
    if(!role.includes(req.user.role)){
      next(new customeError('you are not authorized to access the page',403));
    }
    next();
  };
};
exports.forgetpassword= asyncErrorHandler(async function(req,res,next){
  console.log(req.body.email);
  const found= await  user.findOne({email:req.body.email});
  console.log(found.email);
  if(!found) return next(new customeError('given email id not found',400));
  const resettoken = await found.makeresettoken();
  await found.save({validateBeforeSave:false});
  res.json({data:"helooooooo"})
//  next();
});
