import { Request, Response, Router } from 'express'

const router = Router()

router.get('/api/v1/users', async (req: Request, res: Response) => {
    try {
        
        

        res.status(200).send({
            statusCode: 200,
            message: 'users'
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
