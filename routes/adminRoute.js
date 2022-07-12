const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/', authController, (req , res)=>{
    if (req.user.admin) {
        res.json({message:"you're logged as admin"})
    }else{
        res.status(401).json({message: "you're user not admin"})
    }
})

router.get('/free', authController, (req , res)=>{
    res.json({message:"you're logged"})
})


module.exports = router