const express = require("express");
const authController= require('./../controller/authcontroller');
const router= express.Router();
router.route('/signup').get().post(authController.createuser);
router.route('/login').get().post(authController.loginuser);
router.route('/forgetpassword/:id').get().patch(authController.forgetpassword);
router.route('/resetpassword').get().post(authController.resetpassword);
router.route('/updatePassword').get().patch(authController.userverify,authController.updatePassword);
module.exports=router;