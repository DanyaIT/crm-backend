const express = require("express");
const router = express.Router();
const { verifyRefreshJWT,createAccessJWT } = require("../helpers/jwtHelper");
const { getUserByEmail } = require("../models/user/userModel");

router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;
  const decoded = await verifyRefreshJWT(authorization);

  if (decoded.email) {
    const userProf = await getUserByEmail(decoded.email);
    if (userProf._id) {
      const dbRefreshToken = userProf.refreshJWT.token
      let tokenCreated = userProf.refreshJWT.addedAT;
      tokenCreated = tokenCreated.setDate(
      tokenCreated.getDate() + +process.env.TOKEN_EXP);
      const today = new Date()

      if( dbRefreshToken !== authorization && tokenCreated < today){
        return res.json({status:'error', message: 'Ошибка'})
      }
      const accessJWT = await createAccessJWT(decoded.email, userProf._id.toString())
      return res.json({status:'success', accessJWT})
    }
  }
   res.status(403).json({message:'Ошибка'})
});

module.exports = router;
