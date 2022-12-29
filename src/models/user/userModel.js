const { UserSchema } = require("./userSchema");

const insertUser = (obj) => {
  UserSchema(obj)
    .save()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return false;

    try {
      UserSchema.findOne({ email }, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = (_id)=>{
  return new Promise ((resolve, reject)=>{
    if (!_id) return false
    try {
      UserSchema.findOne({_id}, (error, data)=>{
        if(error){
          reject(error)
        }
        resolve(data)
      })
    } catch (error) {
      reject(error)
    }

  })
}

const storeUserRefreshJWT = (_id, token)=>{
  return new Promise ((resolve, reject)=>{
    try {
      UserSchema.findByIdAndUpdate(
        {_id},
        {$set:{'refreshJWT.token':token, 'refreshJWT.addedAT':Date.now()}},
        {new: true}
        ).then((data) => resolve(data))
        .catch((error) => {console.log(error); reject(error)})

    } catch (error) {
      reject(error)
    }
  })
}

const updatePassword = (email, newPassword) =>{
  return new Promise ((resolve, reject)=>{
    try {
        UserSchema.findOneAndUpdate(
          {email},
          {$set:{'password': newPassword}},
          {new:true}
        ).then((data)=> resolve(data))
        .catch((error)=> {console.log(error); reject(error)})
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}



module.exports = {
  insertUser,
  getUserByEmail,
  storeUserRefreshJWT,
  getUserById,
  updatePassword

};
