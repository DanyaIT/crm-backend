const jwt = require("jsonwebtoken");
const {setJWT, getJWT} = require('../helpers/redisHelper')
const {storeUserRefreshJWT} = require('../models/user/userModel')

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({email}, process.env.SECRET_KEY_ACCESS, {
      expiresIn: "15m",
    });
    await setJWT(accessJWT, _id)
    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error)
  }
};

const crateRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({email}, process.env.SECRET_KEY_ACCESS, {
      expiresIn: "30d",
    });
    await storeUserRefreshJWT(_id, refreshJWT)
    return Promise.resolve(refreshJWT);
    
  } catch (error) {
    return Promise.reject(error)
  }
};

module.exports = {
  createAccessJWT,
  crateRefreshJWT,
};
