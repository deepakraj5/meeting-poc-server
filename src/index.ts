import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'
import { AppDataSource } from './config/db/postgresConfig'

import userRouter from './ui/controllers/user.controller'

dotenv.config()

const app = express()

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

const server = http.createServer(app)

const io = new Server(server)


io.on('connection', (socket) => {
    console.log(`new user connected: ${socket.id}`)
})

app.use(userRouter)


const PORT = process.env.PORT || 5001

server.listen(PORT, () => console.log(`server up on port: ${PORT}`))

AppDataSource.initialize()
    .then(() => console.log(`database connected on port 5432`))
    .catch((error) => console.log(`unable to connect database`, error))
