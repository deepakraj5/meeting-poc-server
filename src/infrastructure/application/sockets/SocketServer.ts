import { Server } from "socket.io"
import http from 'http'
import { Socket } from 'socket.io'
import * as ChatSocket from './ChatSocket'

export class SocketServer {
    public socket: Socket

    constructor() {}

    public connect(server: http.Server) {
        const io = new Server(server, {
            cors: {
                origin: ['http://localhost:5173'],
                methods: ['GET', 'POST']
            }
        })

        io.on('connection', socket => {
            this.socket = socket
            console.log(`new user connected: ${socket.id}`)
            ChatSocket.onChatConnection(socket, io)
        })
    }

}
