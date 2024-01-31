const asynHandler = require('express-async-handler');
const Goal = require('../model/goalModel');
const User = require('../model/userModel');
/**
 * @desc   Get goals
 * @route  GET /api/goals
 * @access private 
 * 
 */
const getGoals = asynHandler(async(req,res) =>{
    const goals = await Goal.find({user: req.user.id});
    res.status(200).json(goals);
});
/**
 * @desc   Set a goal
 * @route  POST /api/goals
 * @access private 
 * 
 */
const setGoal = asynHandler(async(req,res) =>{
    if(!req.body.text.trim()){
        res.status(400);
        throw new Error('Text field cannot be empty!');
    }
    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    });
    res.status(201).json(goal);
});
/**
 * @desc   Update a goal
 * @route  PUT /api/goals/:id
 * @access private 
 * 
 */
const updateGoal = asynHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error("Goal not found!");
    }
    if(!req.body.text.trim()){
        res.status(400);
        throw new Error('Text field cannot be empty!');
    }

    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error('User not found!');
    }

    if(user.id !== goal.user.toString()){
        res.status(401);
        throw new Error('User not authorized!');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,{
        text:req.body.text,
        user: user.id
    }
    ,{new:true});
    res.status(200).json(updatedGoal);
});
/**
 * @desc   Delete a goal
 * @route  DELETE /api/goals/:id
 * @access private 
 * 
 */
const deleteGoal = asynHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error("Goal not found!");
    }
    await goal.deleteOne();
    res.status(200).json({id: req.params.id});
});

module.exports = {getGoals,setGoal,updateGoal, deleteGoal}