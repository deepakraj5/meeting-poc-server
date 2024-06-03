import { randomUUID } from "crypto"
import { Room } from "../../../domain/model/Room"
import { AppDataSource } from "../../../config/db/postgresConfig"

export const createRoom = async (): Promise<string> => {
    try {
        const dataSource = AppDataSource.getRepository(Room)
        
        const roomId = randomUUID()
        const room = new Room()
        room.roomId = roomId

        await dataSource.save(room)

        return roomId
    } catch (error) {
        console.log(error)
        throw error
    }
}
