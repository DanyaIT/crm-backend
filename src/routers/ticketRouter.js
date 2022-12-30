const express = require("express");
const router = express.Router();
const {insertTicket, getTicket} = require("../models/ticket/ticketModel");
const {userAuth} = require('../middleware/authMiddleWare')

router.all("/", (req, res, next) => {
  next();
});

router.post("/", userAuth, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;
    const userId = req.userId
    const ticketObj = {
      clientId: userId,
      subject,
      conversations: [
        {
          sender,
          message,
        },
      ],
    };
    const result = await insertTicket(ticketObj);
    if (result._id) {
      return res.json({
        status: "access",
        message: "Вы успешно отправили письмо",
      });
    }
    res.json({ status: "error", message: "Не удалось отправить письмо" });
  } catch (error) {
    res.json({ status: "error", message: "Не удалось отправить письмо" });
  }
});

router.get("/", userAuth, async (req, res)=>{
  try{
    const userId = req.userId
    const result = await getTicket(userId)
    
    return res.json({status:'succes', result})
    
  }catch(error){
    res.json({status:'error', message:'Не удалось получить все сообщения'})
}
})

module.exports = router;