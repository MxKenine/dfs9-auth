import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

import cors from 'cors'

import authRoute from './routes/auth.route.js'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('', authRoute)

//Etablir une connexion vers MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connecté à la base de données')
        app.listen(PORT, () => {
            console.log('Server On !')
        })
    })
    .catch(err => {
        console.log(err)
    })

const PORT = process.env.PORT || 3000