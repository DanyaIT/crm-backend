const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    clientId:{
        type:Schema.Types.ObjectId
    },
    
    subject:{
        type:String,
        maxlength: 100,
        required: true,
        default: ""
    },

    openAt:{
        type: Date,
        required: true,
        default: Date.now(),
    },

    status:{
        type:String,
        required: true,
        default: 'Ожидание ответа от менеджера',
        maxlength: 30
    },

    conversations:[
        {
            sender:{
                type:String,
                maxlength: 50,
                required: true,
                default: "",
            },

            message:{
                type:String,
                maxlength: 1000,
                required: true,
                default: "",
            },
            
            msgAt:{
                type: Date,
                required:true,
                default: Date.now(),
            },
        }
    ]
})

module.exports = {
    TicketSchema: mongoose.model('Ticket', TicketSchema)
}