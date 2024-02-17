const user= require('./../model/usermodel');
const responsefunction= require('./moviecrud');
const asyncErrorHandler= require('./../utlility/asyncerrorhandler');
exports.createuser= asyncErrorHandler(async(req,res,next)=>{
    const usercreated= await user.create(req.body);
    if (usercreated){
        res.status(201).json(responsefunction.responsefunction('succes',usercreated));
    }

});