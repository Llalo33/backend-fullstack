const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.userController = {
    getUser: async (req, res) => {
        const user = await User.find()

        res.json(user)
    },
    registerUser: async (req, res) => {
        const {login, password} = req.body
        
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

        const user = await User.create({login: login, password: hash})

        res.json(user)
    },

    login: async (req, res) =>{ 
        const {login, password} = req.body

        const candidate = await User.findOne({login})

        if(!candidate){
            return res.status(401).json({error:'Неверный логин или пароль'})
        }

        const valid = await bcrypt.compare(password, candidate.password)

        if(!valid){
            return res.status(401).json({error:'Неверный логин'})
        }

        const payload = {
            id: candidate._id
        }

        const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '24h'
        })

        res.json(token)
    }
}