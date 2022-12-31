const { TicketSchema } = require("./ticketSchema");

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicket = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserTicket = ({ _id, clientId,sender, message }) => {
  return new Promise((resolve, reject) => {
    try {
        TicketSchema.findOneAndUpdate(
            { _id, clientId},
            { 
              status:'Ожидание ответа от менеджера',
              $push: {
                conversations: { sender, message },
              },
            },
            { new: true }
          )
        .then((data) => resolve(data))
        .catch((error)=> reject(error))
    } catch (error) {
    
        reject(error)
    }
  });
};

const updateStatusClose = ({_id, clientId}) =>{
    return new Promise ((resolve, reject) =>{
        try {
            TicketSchema.findOneAndUpdate(
                {_id, clientId},
                {status: 'Закрыт'}
            )
            .then((data)=> resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const deleteTicket = ({_id, clientId})=>{
  return new Promise((resolve, reject)=>{
    try{
      TicketSchema.findOneAndDelete(
        {_id, clientId},
      )
      .then((data)=> resolve(data))
      .catch((error)=> reject(error))
    }catch(error){
      reject(error)
    }
  })
}

module.exports = {
  insertTicket,
  getTicket,
  updateUserTicket,
  updateStatusClose,
  deleteTicket
};
