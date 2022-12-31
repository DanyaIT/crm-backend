const jwt = require("jsonwebtoken");
const {setJWT, getJWT} = require('../helpers/redisHelper')
const {storeUserRefreshJWT} = require('../models/user/userModel')

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({email}, process.env.SECRET_KEY_ACCESS, {
      expiresIn: "60m",
    });
    await setJWT(accessJWT, _id)
    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error)
  }
};

const crateRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({email}, process.env.SECRET_KEY_REFRESH, {
      expiresIn: "30d",
    });
    await storeUserRefreshJWT(_id, refreshJWT)
    return Promise.resolve(refreshJWT);
    
  } catch (error) {
    return Promise.reject(error)
  }
};


const verifyAccessJWT = (userJWT)=>{
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.SECRET_KEY_ACCESS))
  } catch (error) {
    return Promise.resolve(error)
  }
}

const verifyRefreshJWT = (userJWT)=>{
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.SECRET_KEY_REFRESH))
  } catch (error) {
    return Promise.resolve(error)
  }
}


module.exports = {
  createAccessJWT,
  crateRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT
};
