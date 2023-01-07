const express = require('express')
const router = express.Router()
const {insertUser, getUserByEmail,getUserById, storeUserRefreshJWT} = require ('../models/user/userModel')
const {hashPassword,comparePassword} = require('../helpers/hashPassword')
const {createAccessJWT, crateRefreshJWT} = require('../helpers/jwtHelper')
const { userAuth } = require('../middleware/authMiddleWare')
const {setPasswordRestPin} = require('../models/resetPin/resetPinModel')
const {send, emailProcesser} = require('../helpers/emailHelper')
const {getPinByEmailPin} = require('../models/resetPin/resetPinModel')
const {updatePassword} = require('../models/user/userModel')
const {deleteJWT} = require('../helpers/redisHelper')


router.all('/', (req, res, next)=>{

    next()
})


//Authorization
router.get('/', userAuth, async (req, res)=>{
    const _id = req.userId
    const userProf = await getUserById(_id)
    const {name, email} = userProf
    res.json({user:{
        _id,
        name,
        email
    }})
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
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)
    const refreshJWT = await crateRefreshJWT(user.email, `${user._id}`)

    res.json({status:'access', accessJWT, refreshJWT})
})

router.post('/reset-password', async (req, res)=>{
    const {email} = req.body 
    const user = await getUserByEmail(email)
    
    if (user && user._id){
        const setPin = await setPasswordRestPin(email)
        const result =  await emailProcesser(email, setPin.pin)
        if(result && result.messageId){
            return res.json({status:'success', message:'Письмо отправлено'})
        }
        return res.json({status:'error', message:'Невозможно послать письмо'})
    }

 res.json({status:'error'})
})


router.patch('/reset-password', async (req, res)=>{
    const {email, pin, newPassword} = req.body
    const getPin = await getPinByEmailPin(email, pin)

    if (getPin._id){
        const dateInDb = getPin.addedAt
        const expiresDate = 1
        let expDate = dateInDb.setDate(dateInDb.getDate(dateInDb) + expiresDate)
        const today = new Date()
        if(today > expDate){
            return res.json({status:'error', massage: 'Время пин-кода истекло'})
        }

        const hashPass = await hashPassword(newPassword)
        const user = await updatePassword(email, hashPass)

        if(user._id){
            return res.json({message:'access', message:'Пароль изменен!' })
        }
    }

    res.json({status: 'error', message:'Не удалось установаить пароль'})
})


router.delete('/logout', userAuth, async (req,res)=>{
     const {authorization} = req.headers
     const _id = req.userId
     deleteJWT(authorization)
     const result = await storeUserRefreshJWT(_id, "")
    if(result._id){
        return res.json({status:'access', message:'Вы успешно вышли из системы'})
    }
    res.json({status:'error', message:'Вы не вышли из системы'})
})


module.exports = router 
