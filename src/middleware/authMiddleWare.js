const { verifyAccessJWT } = require("../helpers/jwtHelper");
const { getJWT,deleteJWT } = require("../helpers/redisHelper");

const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = await verifyAccessJWT(authorization);
  if (decoded.email) {
    const user_id = await getJWT(authorization);
    if (!user_id) {
      res.status(404).json({ message: "Пользователь не найден" });
    }

    req.userId = user_id;
    return next()
  }
  deleteJWT(authorization)

  return res.status(404).json({ message: "Пользователь не найден" });
};

module.exports = {
  userAuth,
};
