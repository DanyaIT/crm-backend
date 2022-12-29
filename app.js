require('dotenv').config()
const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')

app.use(helmet())

app.use(cors())

app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())




mongoose
    .connect(process.env.MONGO_URL)
    .then((res)=> console.log('Connect'))
    .catch((error)=> console.log(error));




//Routers
const userRouter = require('./src/routers/userRouter')
const ticketRouter = require('./src/routers/ticketRouter')
const tokenRouter = require('./src/routers/tokenRouter')

app.use('/api/user', userRouter)
app.use('/api/ticket', ticketRouter)
app.use('/api/tokens', tokenRouter)

const handleError = require('./src/utils/errorHandler')
app.use((req,res, next)=>{
    const error = new Error('Resources not found')
    error.status = 404;
    next(error)
});

app.use((error, req, res, next)=>{
    handleError(error, res)
})


app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})