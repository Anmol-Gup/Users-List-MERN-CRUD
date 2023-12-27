const User=require('../models/user')

const GetAllUsers=async(req,res)=>{
    try{
        const users=await User.find()
        if(users)
            res.status(200).json(users)
        else
            res.status(404).json({message:'No users found!'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const CreateUser=async(req,res)=>{
    const {name,email,gender,age}=req.body
    if(!name || !email || !gender || !age){
        return res.status(400).json({message:'',error:'All fields are required!'})
    }
    
    try{
        const user=await User.create({
            name,email,gender,age
        })
        res.status(201).json({message:'User Added!',error:''})
    }
    catch(error){
        res.status(500).json({message:error.message,error:''})
    }
}
const GetUserById=async (req,res)=>{
    try{
        const user=await User.findById({_id:req.params.id})
        if(user)
            res.status(200).json(user)
        else
            res.status(404).json({message:'User Not Found!'})
    }
    catch(error){
        res.status(500).json({message:'',error:error.message})
    }
}
const UpdateUserById=async(req,res)=>{
    const {name,email,gender,age}=req.body
    if(!name || !email || !gender || !age){
        return res.status(400).send({message:'',error:'All fields are required!'})
    }
    try{
        const user=await User.findByIdAndUpdate({_id:req.params.id},{name,email,gender,age})
        if(user)
            res.status(200).json({message:'User Updated!',error:''})
        else
            res.status(204).json({message:'',error:'Update Failed!'})
    }
    catch(error){
        res.status(500).json({message:'',error:error.message})
    }
}

const DeleteUserById=async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete({_id:req.params.id})
        if(user)
            res.status(200).json({message:'success'})
        else
            res.status(204).json({message:'failed'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports={
    GetAllUsers,
    CreateUser,
    UpdateUserById,
    DeleteUserById,
    GetUserById
}