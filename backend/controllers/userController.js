const asynHandler = require('express-async-handler');

/**
 * @desc   Register user
 * @route  POST /api/users
 * @access public 
 * 
 */
const registerUser = asynHandler(async (req,res)=>{
    res.json({message: 'register user'});
});
/**
 * @desc   Login a user
 * @route  POST /api/users/login
 * @access public 
 * 
 */
const loginUser = asynHandler(async (req,res)=>{
    res.json({message: 'login user'});
});
/**
 * @desc   Login a user
 * @route  POST /api/users/me
 * @access private 
 * 
 */
const getMe = asynHandler(async (req,res)=>{
    res.json({message: 'user detials'});
});

module.exports = {registerUser,loginUser,getMe};

