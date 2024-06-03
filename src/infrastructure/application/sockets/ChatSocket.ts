import { Server, Socket } from "socket.io";

export const onChatConnection = (socket: Socket, io: Server) => {
    socket.on('join_room', data => {

        const { room } = data

        socket.join(room)

        socket.on('send_message', data => {
            io.in(room).emit('receive_message', data)
        })
    })
}
