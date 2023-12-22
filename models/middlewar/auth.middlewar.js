const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers
    const [type, token] = authorization?.split(" ")
    console.log(type, token);
    if (!authorization) {
      return res.status(401).json({ error: "Не существует" })
    }
    

    if (type !== 'Bearer') {
        return res.status(401).json({ error: "Ошибка аутентификации" })
      }
    try {
        req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY)
        next()
      } catch (error) {
        res.status(401).json({ error: "Не правильный токен" })
      }
    }

// const { authorization } = req.headers
// if (!authorization) {
//     return res.status(401).json("Токен отсутствует");
// }
// const [type, token] = authorization.split(" ")
// if (type !== "Bearer") {
//     return res.status(401).json("Неверный тип токена")
// }
// await jwt.verify(token, process.env.SECRET_JWT_KEY)