const express = require('express')
const router = express.Router()
const {insertUser, getUserByEmail} = require ('../models/user/userModel')
const {hashPassword,comparePassword} = require('../helpers/hashPassword')
const {createAccessJWT, crateRefreshJWT} = require('../helpers/jwtHelper')



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
    const passFromDb = user && user._id ? user.password : null
    
    if(!passFromDb) return res.json({status:'error', message:'Неправильный email или пароль'})
    
    const result = await comparePassword(password,passFromDb)
    if(!result){
        return res.json({status:'error', message:'Некоректный пароль'})
    }
    const createJWT = await createAccessJWT(user.email, `${user._id}`)
    const refreshJWT = await crateRefreshJWT(user.email, `${user._id}`)

    res.json({status:'Успешно', createJWT, refreshJWT})
})



module.exports = router 
