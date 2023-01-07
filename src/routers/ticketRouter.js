const express = require("express");
const router = express.Router();
const {
  insertTicket,
  getTicket,
  updateUserTicket,
  updateStatusClose,
  deleteTicket
} = require("../models/ticket/ticketModel");
const { userAuth } = require("../middleware/authMiddleWare");
const {createNewTicketValidation,replyOnTicket} = require('../middleware/formMiddleWare')

router.all("/", (req, res, next) => {
  next();
});

router.post("/",createNewTicketValidation, userAuth, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;
    const userId = req.userId;
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

router.get("/", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getTicket(userId);

    return res.json({ status: "succes", result });
  } catch (error) {
    res.json({ status: "error", message: "Не удалось получить все сообщения" });
  }
});

router.put("/:_id", replyOnTicket ,userAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const { sender, message } = req.body;
    const result = await updateUserTicket({ _id, clientId, sender, message });

    if (result._id) {
      res.json({ status: "succes", message: "Вы обновили разговор" });
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: "error",
      message: "Произошла ошибка при обновление пиcьма",
    });
  }
});

router.patch("/close-ticket/:_id", userAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const result = await updateStatusClose({ _id, clientId });
    if (result._id) {
      return res.json({ status: "succes", message: "Вы обновили статус" });
    }
  } catch (error) {
    console.log(error)
    res.json({
      status: "error",
      message: "Произошла ошибка при обновление статуса",
    });
  }
});

router.delete('/:_id', userAuth, async (req, res)=>{
  try {
    const {_id} = req.params
    const clientId = req.userId
    const result = await deleteTicket({_id, clientId})
    
    if(result._id){
      return res.json({status: 'access', message:'Вы успешно удалали сообщение'})
    }
  } catch (error) {
    console.log(error)
    res.json({status: 'error', message:'Не удалось удалить сообшение'})
  }
})

module.exports = router;
