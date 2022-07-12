const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidate, loginValidate} = require('./validators/userRequest')

const userController = {

    register: async function (req, res) {
        try {
            const {error} = registerValidate(req.body)

            if (error) {
                return res.status(400).json({message:error.message})
            }

            if (await User.findOne({email:req.body.email})) {
                return res.status(400).json({message:"email already exists"})
            }

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password)
            })

            res.send(await user.save())

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },

    login: async function (req, res) {

        try {

            const {error} = loginValidate(req.body)

            if (error) {
                return res.status(400).json({message:error.message})
            }

            const user = await User.findOne({ email: req.body.email })
            const verifyPassword = bcrypt.compareSync(req.body.password, user.password)

            if (user == null) {
                return res.status(400).send({ message: 'email or password incorrect' })
            }

            if (!verifyPassword) {
               return  res.status(400).send({ message: 'email or password incorrect' })
            }

            const token = jwt.sign({_id:user._id, admin:user.admin}, process.env.TOKEN_SECRET)

            res.header('authorization-token', token)
            res.json({message:'logged'})

        } catch (error) {
            res.status(400).json({message:error.message})
        }

    }

}

module.exports = userController