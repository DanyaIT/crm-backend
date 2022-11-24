const express = require('express')
const router = express.Router()
const {insertUser} = require ('../models/user/useModel')
const {hashPassword} = require('../helpers/hashPassword')



router.all('/', (req, res, next)=>{
    // res.json({message:'return from userRouter'})
    next()
})

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

module.exports = router 
