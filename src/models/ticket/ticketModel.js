
const {TicketSchema} = require('./ticketSchema')

const insertTicket = ticketObj =>{
    return new Promise((resolve, reject)=>{
        try {
            TicketSchema(ticketObj)
            .save()
            .then((data)=> resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const getTicket = (clientId) =>{
    return new Promise ((resolve, reject)=>{
        try {
            TicketSchema
            .find({clientId})
            .then((data) => resolve(data))
            .catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    insertTicket,
    getTicket
}