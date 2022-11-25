const bcrypt = require('bcrypt')
const saltRounds  = 10

const hashPassword = (password)=>{
    return new Promise((resolve)=>{
        resolve(bcrypt.hashSync(password, saltRounds))
    })
}

const comparePassword = (currentPass, dbPass)=>{
    return new Promise ((resolve, reject)=>{
        bcrypt.compare(currentPass,dbPass, function (error,result){
            if (error) reject(error)
            resolve(result)
        })
    })
}

module.exports = {
    hashPassword,
    comparePassword
}