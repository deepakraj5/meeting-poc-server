import { Request, Response, Router } from 'express'
import { createUser } from '../../infrastructure/application/service/UserService'

const router = Router()

router.get('/api/v1/signup', async (req: Request, res: Response) => {
    try {
        
        await createUser({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })

        res.status(200).send({
            statusCode: 200,
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

export default router
