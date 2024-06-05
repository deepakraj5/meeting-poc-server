import { JwtResponse } from "../../../application/service/_dto/JwtResponse"
import { verifyJWT } from "../../../utils/accessToken"
import { UserUnauthenticated } from "../exceptions/UserUnauthenticated"

export const validateSocketAuthentication = (accessToken: string): boolean => {
    try {
        const verifiedToken = verifyJWT(accessToken) as JwtResponse
        if(!verifiedToken) throw new UserUnauthenticated()
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
