const asynHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/userModel');

/**
 * @desc   Register user
 * @route  POST /api/users
 * @access public 
 * 
 */
const registerUser = asynHandler(async (req,res)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    // check if user is already registered
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error('User already registered');
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    if(!user){
       res.status(400);
       throw new Error('Invalid user data');
    }

    res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        token: generateToken(user._id)
    });

});
/**
 * @desc   Login a user
 * @route  POST /api/users/login
 * @access public 
 * 
 */
const loginUser = asynHandler(async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Email or Password can not be blank!');
    }
    // check if user exist
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error('user does not exist, please create an account');
    }
    // check if email and password are valid
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid credentials !');
    }
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

// Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '24h'});
}

module.exports = {registerUser,loginUser,getMe};

