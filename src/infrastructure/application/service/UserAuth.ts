import { NextFunction, Request, Response } from "express";
import { UserUnauthenticated } from "../exceptions/UserUnauthenticated";
import { verifyJWT } from "../../../utils/accessToken";
import { JwtResponse } from "../../../application/service/_dto/JwtResponse";

export interface CustomRequest extends Request {
    token: JwtResponse
}

export const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const authorization = req.headers['authorization']
        if(!authorization) throw new UserUnauthenticated()
        
        const accessToken = authorization.replace('Bearer ', '')
        const verifiedToken = verifyJWT(accessToken) as JwtResponse

        (req as CustomRequest).token = verifiedToken

        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            statusCode: 401,
            message: 'User unauthenticated'
        })
    }
}
