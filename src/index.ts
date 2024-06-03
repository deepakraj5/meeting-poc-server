import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import { AppDataSource } from './config/db/postgresConfig'

import userRouter from './ui/controllers/user.controller'
import chatRouter from './ui/controllers/chat.controller'
import { SocketServer } from './infrastructure/application/sockets/SocketServer'

dotenv.config()

const app = express()

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

const server = http.createServer(app)

const socketServer = new SocketServer()
socketServer.connect(server)

app.use(userRouter)
app.use(chatRouter)


const PORT = process.env.PORT || 5001

server.listen(PORT, () => console.log(`server up on port: ${PORT}`))

AppDataSource.initialize()
    .then(() => console.log(`database connected on port 5432`))
    .catch((error) => console.log(`unable to connect database`, error))
