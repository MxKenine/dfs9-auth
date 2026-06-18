import express from 'express'
import mongoose from 'mongoose'

//Import du dotenv
import dotenv from 'dotenv'
//Inject methode config pour acceder au variable
dotenv.config()

import cors from 'cors'

import authRoute from './routes/auth.route.js'

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

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