const express = require('express')
const router = express.Router()
const {insertUser, getUserByEmail} = require ('../models/user/userModel')
const {hashPassword,comparePassword} = require('../helpers/hashPassword')



router.all('/', (req, res, next)=>{
    // res.json({message:'return from userRouter'})
    next()
})

//Create User
router.post('/', async (req, res)=>{
    const {name, company, address, phone, email, password} = req.body
    try{
        const hashedPassword = await hashPassword(password)
        let newUserObj = {
             name,
             company,
             address,
             phone,
             email,
             password: hashedPassword
        }
        const result = await insertUser(newUserObj)
        console.log(result)
        
        res.json({message: 'New User', result})

    }catch(e){
        console.log(e)
        res.json(e.message)
    }

})

//Sign user in router
router.post('/login', async (req, res)=>{
    const {email, password} =req.body
    if (!email || !password){
        return res.json({status:'error', message:'Заполните все поля ввода'})
    }

    const user = await getUserByEmail(email)
    console.log(user)
    const passFromDb = user && user._id ? user.password : null
    if(!passFromDb) return res.json({status:'error', message:'Неправильный email или пароль'})

    const result = await comparePassword(password,passFromDb)
    console.log(result)
    res.json({status:'Успешно'})
})



module.exports = router 
