const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.send({ "error": err })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()
                res.send({ "msg": "New user Has been registered" })
            }
        })
        
    } catch (err) {
        res.json({ "error": err })
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
   bcrypt.compare(pass, user.pass, (err, result) => {
    if (result) {
    let token = jwt.sign({ userID: user._id, user: user.name }, "masai")
    res.json({ msg: "Logged in !!", "token":token })
     } else {
     res.send({ "error":"Wrong Creadential...." })
    }
     })
        } else {
            res.send({ "msg": "user doesn't exist!!" })
        }
    } catch (error) {
        res.send({ "error": err})
    }
})



module.exports = {
    userRouter
}