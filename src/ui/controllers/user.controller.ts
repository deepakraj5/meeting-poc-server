import { Request, Response, Router } from 'express'
import * as UserService from '../../infrastructure/application/service/UserService'
import { UserNotFoundException } from '../../infrastructure/application/exceptions/UserNotFoundException'
import { UserPasswordMisMatch } from '../../infrastructure/application/exceptions/UserPasswordMisMatch'
import { EntityNotFoundError } from 'typeorm'
import * as UserAuth from '../../infrastructure/application/service/UserAuth'
import { UserUnauthenticated } from '../../infrastructure/application/exceptions/UserUnauthenticated'

const router = Router()

router.post('/api/v1/signup', async (req: Request, res: Response) => {
    try {
        
        await UserService.createUser({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })

        res.status(201).send({
            statusCode: 201,
            message: 'signed up'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
})

router.post('/api/v1/login', async (req: Request, res: Response) => {
    try {
        
        const response = await UserService.login(req.body.email, req.body.password)

        return res.status(200).send({
            statusCode: 200,
            data: response
        })
    } catch (error) {
        console.log(error)

        if(error instanceof UserNotFoundException || 
            error instanceof UserPasswordMisMatch ||
            error instanceof EntityNotFoundError) {
            res.status(401).send({
                statusCode: 401,
                message: 'Invalid credentails'
            })
        } else {
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error'
            })
        }
    }
})

router.post('/api/v1/validate_token', UserAuth.userAuth , async (req: Request, res: Response) => {
    try {

        return res.status(200).send({
            statusCode: 200
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
