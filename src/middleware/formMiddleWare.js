const Joi = require('joi')

const createNewTicketValidation = (req, res, next)=>{
    const schema = Joi.object({
        subject: Joi.string().min(2).max(50).required(),
        sender: Joi.string().min(2).max(50).required(),
        message: Joi.string().min(2).max(1000).required(),
    })
    const value = schema.validate(req.body)
    if(value.error){
        return res.json({status:'error', message:'Укажите допустимые значения'})
    }
    next()
}

const replyOnTicket = (req, res, next)=>{
    const schema = Joi.object({
        sender: Joi.string().min(2).max(50).required(),
        message: Joi.string().min(2).max(1000).required(),
    })

    const value = schema.validate(req.body)

    if(value.error){
        return res.json({status:'error', message:'Укажите допустимые значения'})
    }
    next()
}


module.exports = {
    createNewTicketValidation,
    replyOnTicket
}