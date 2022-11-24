const {UserSchema} = require ('./userSchema')


const insertUser = (obj)=>{
    UserSchema(obj)
    .save()
    .then((data)=> console.log(data))
    .catch((error)=> console.log(error));
}


module.exports  = {
    insertUser,
};