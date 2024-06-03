import { Request, Response, Router } from "express";
import * as ChatService from '../../infrastructure/application/service/ChatService'

const router = Router()

router.post('/api/v1/rooms', async (req: Request, res: Response) => {
    try {
        
        const roomId = await ChatService.createRoom()

        res.status(200).send({
            statusCode: 200,
            room: roomId
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
})

export default router
