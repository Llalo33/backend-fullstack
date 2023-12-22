const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(require('./routes/todo.route'))
app.use(require('./routes/user.route'))

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER, {
    })
      .then(() => console.log('Успешно соединились с сервером MongoDB'))
      .catch(() => console.log('Ошибка при соединении с сервером MongoDB'))
     app.listen(process.env.PORT, () => console.log(`Сервер запущен успешно http://localhost:${process.env.PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()