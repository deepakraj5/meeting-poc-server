import * as jwt from 'jsonwebtoken'
import { User } from '../domain/model/User'
import { UserUnauthenticated } from '../infrastructure/application/exceptions/UserUnauthenticated'


export const generateJWT = (user: User): string => {
    try {
        const JWT_SECRET = 'hasheddjhfidojwjr'
        
        return jwt.sign({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }, JWT_SECRET, {
            expiresIn: '2h'
        })

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const verifyJWT = (accessToken: string): jwt.JwtPayload | string => {
    try {
        const JWT_SECRET = 'hasheddjhfidojwjr'
        
        return jwt.verify(accessToken, JWT_SECRET)
    } catch (error) {
        console.log(error)
        throw new UserUnauthenticated()
    }
}
