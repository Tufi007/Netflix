const express = require("express");
const authController= require('./../controller/authcontroller');
const router= express.Router();
router.route('/signup').get().post(authController.createuser);
router.route('/login').get().post(authController.loginuser);
router.route('/forgetpassword').get().post(authController.forgetpassword);
// router.route('/resetpassword').get().post(authController.resetpassword);
module.exports=router;