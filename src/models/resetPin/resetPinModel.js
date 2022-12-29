const {ResetSchema} = require('./resetPinSchema')
const {randomNumberPin} = require('../../utils/randomPinNumber');



const setPasswordRestPin = async (email) =>{
    
    pinLength = 6;
    const randomPin = await randomNumberPin(pinLength)

    const resetObj = {
        pin: randomPin,
        email,
    }
    
    return new Promise((res, rej)=>{
        ResetSchema(resetObj)
        .save()
        .then((data)=>console.log(data))
        .catch((error)=> console.log(error))
    })

}

const getPinByEmailPin = (email, pin)=>{
    return new Promise((resolve, reject)=>{
        try {
            ResetSchema.findOne({email, pin}, (error, data) =>{
               if(error){
                console.log(error)
                resolve(false)
               } 
               resolve(data)
            });
        } catch (error) {
            reject(error)
            console.log(error)
        }
    })
}

module.exports = {
    setPasswordRestPin,
    getPinByEmailPin
}