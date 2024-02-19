const user = require("./../model/usermodel");
const responsefunction = require("./moviecrud");
const asyncErrorHandler = require("./../utlility/asyncerrorhandler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const util = require("util");
const customeError = require("../utlility/customerror");
const sendMail = require("../utlility/nodemailer,js");
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
    // responsefunction.responsefunction(res,{usercreated,tokenid});
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
console.log(userfound);
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

  const userid = decodedtoken.id;
  const userfound = await user.findById(userid);
  if (!userfound)
    return next(
      new customeError("No user found with the given credentials", 404)
    );

  const changecheck = await userfound.checkPassChanged(decodedtoken.iat);
  if (changecheck)
    return next(
      new customeError("need to log in your password was changed", 400)
    );
  req.user = userfound;
  next();
});
exports.checkRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      next(new customeError("you are not authorized to access the page", 403));
    }
    next();
  };
};
exports.resetpassword = asyncErrorHandler(async function (req, res, next) {
  
  const found = await user.findOne({ email: req.body.email });
  console.log(found.email);
  if (!found) return next(new customeError("given email id not found", 400));
  const resettoken = await found.makeresettoken();
  await found.save({ validateBeforeSave: false });
  const url = `${req.protocol}://${req.get(
    "host"
  )}/user/forgetpassword/${resettoken}`;
  const mes = `click the belowlink to rest the password===${url}`;
  console.log(mes);
  try {
    await sendMail({
      to: found.email,
      subject: "for resetting the password",
      message: mes,
    });
    res
      .status(200)
      .json(
        responsefunction.responsefunction("password email reset link send", url)
      );
  } catch (err) {
    this.resettokenexpires = undefined;
    this.resettoken = undefined;
    found.save({ validateBeforeSave: false });
    next(
      new customeError("server error cannot reset password link failed", 500)
    );
  }

  //  next();
});
exports.forgetpassword = asyncErrorHandler(async (req, res, next) => {
  const tokenid= req.params.id;
  const cryptotoken= crypto.createHash('sha256').update(tokenid).digest('hex');
 
  const found= await user.findOne({email:req.body.email,resettoken:cryptotoken,resettokenexpires:{$gt:Date.now()}});

  if(!found.email) return next(new customeError('token expired or not the valid token',400));
const changedat=await found.resetPassword(req.body.password);
await found.save({validateBeforeSave:true});
const newtoken= token(found._id);
res.status(200).json(responsefunction.responsefunction('succes',{changedat,tokenid:newtoken}));
});
exports.updatePassword=asyncErrorHandler(async (req,res,next)=>{
  const  id= req.user._id;
  console.log(id);
  const email= req.body.email;
  const pass= req.body.password;
  console.log(req.body.password);
  const found= await user.findById(id);
  console.log(found);
  if(!found) return next(new customeError('need to login again'));
  const changetat= await found.resetPassword(pass);
  await found.save({validateBeforeSave:true});
  const newtoken= await token(id);
  res.status(200).json(responsefunction.responsefunction('succes',{tokenid:newtoken,changetat}))
});
