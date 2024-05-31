import { CreateUserDto } from "../../../application/service/_dto/CreateUserDto"
import { AppDataSource } from "../../../config/db/postgresConfig"
import { User } from "../../../domain/model/User"

export const createUser = async (user: CreateUserDto): Promise<void> => {
    try {

        const dataSource = AppDataSource.getRepository(User)

        // await dataSource.query('')
        
    } catch (error) {
        console.log(error)
        throw error
    }
}
