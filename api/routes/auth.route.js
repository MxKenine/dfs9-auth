import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, role } = req.body
        console.log(req.body)
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' })
        }
        const hash = await bcrypt.hash(password, 10)

        await User.create({ username, email, password: hash, role })
        res.status(201).json({ message: 'Utilisateur crée !' })
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

router.post('/login-localstorage', async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalides identifiants' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalides identifiants' })
        }
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET)
        res.status(200).json({ token, role: user.role })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

function verfyToken(req, res, next) {
    try {
        const authHeaders = req.headers.authorization
        const token = authHeaders.split(' ')[1]
        if (!token) {
            return res.status(403).json({ message: 'Token manquant !' })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

router.get('/admin', verfyToken, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Accées refusé" })
    }
    const users = await User.find()
    res.status(200).json(users)
})

router.get('/profile', verfyToken, async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
})

export default router