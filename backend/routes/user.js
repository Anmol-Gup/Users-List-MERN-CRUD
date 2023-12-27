const express=require('express')
const router=express.Router()
const {GetAllUsers, GetUserById, CreateUser, UpdateUserById, DeleteUserById}=require('../controllers/user')

router.get('/',GetAllUsers)
router.post('/',CreateUser)
router.get('/:id',GetUserById)
router.patch('/:id',UpdateUserById)
router.delete('/:id',DeleteUserById)

module.exports=router
