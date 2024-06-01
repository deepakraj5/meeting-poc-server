import { CreateUserDto } from "../../../application/service/_dto/CreateUserDto"
import { LoginResponse } from "../../../application/service/_dto/LoginResponse"
import { AppDataSource } from "../../../config/db/postgresConfig"
import { User } from "../../../domain/model/User"
import { generateJWT } from "../../../utils/accessToken"
import { comparePassword, hashPassword } from "../../../utils/passwordHash"
import { UserNotFoundException } from "../exceptions/UserNotFoundException"
import { UserPasswordMisMatch } from "../exceptions/UserPasswordMisMatch"

export const createUser = async (userCommand: CreateUserDto): Promise<void> => {
    try {

        const dataSource = AppDataSource.getRepository(User)

        const user = new User()
        user.firstName = userCommand.firstName
        user.lastName = userCommand.lastName
        user.email = userCommand.email
        user.password = await hashPassword(userCommand.password)

        await dataSource.save(user)
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        
        const user = await getUser(email)
        if(!user) {
            throw new UserNotFoundException(email)
        }

        if(!await comparePassword(password, user.password)) {
            throw new UserPasswordMisMatch()
        }

        const accessToken = generateJWT(user)

        return {
            email: user.email,
            jwtToken: accessToken
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getUser = async (email: string): Promise<User> => {
    try {
        
        const dataSource = AppDataSource.getRepository(User)

        return dataSource.findOneOrFail({
            where: {
                email
            }
        })

    } catch (error) {
        console.log(error)
        throw error
    }
}
