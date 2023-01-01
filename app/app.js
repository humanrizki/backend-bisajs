import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import route from './../routes/route.js'
import database from './../starter/database.js'
import mongo from './../config/mongo.js'
dotenv.config()
const app = express()
database.connect(mongo)
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))
app.use(morgan('combined'))
app.use(express.static('public'))
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: session,
//     cookie: {
//         secure: 'auto'
//     }
// }))
app.use(route)
app.listen(process.env.APP_PORT, ()=>{
    console.log("Server berjalan di port " + process.env.APP_PORT )
})