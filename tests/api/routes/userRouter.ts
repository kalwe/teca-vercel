import { Router, Request, Response } from 'express'
import { UserSchema, UserResponseSchema, UserInput } from '../schemas/UserSchema'
import { DeletedResponseSchema } from '../schemas/BaseSchema'

const userRouter = Router()

// simulate database
let usersDB: UserInput[] = []

// createUser(userData: UserType)
userRouter.post('/user', (req: Request, res: Response) => {
    const user: UserInput = req.body

    const isValidUserInput = UserSchema.parse({ ...user })

    const date = new Date()

    const isValidUser = UserResponseSchema.parse({
        ...isValidUserInput,
        id: Math.floor(Math.random() * 6) + 1,
        created_at: date.toJSON(),
        is_active: true,
    })

    usersDB.push(isValidUser)
    res.status(201).json(isValidUser)
})

// getAllUsers()
userRouter.get('/user', (req: Request, res: Response) => {
    res.status(200).json(usersDB);
})

// getById(id: number)
userRouter.get('/user/:id', (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const user = usersDB.filter((u) => u.id == id)
    res.status(200).json(user)
})


// deleteById(id: number)
userRouter.delete('/user/:id', (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const user = usersDB.filter((u) => u.id == id)

    const date = new Date()

    const deletedUser = DeletedResponseSchema.parse({
        id: user[0].id,
        deleted_at: date.toJSON(),
        is_active: false
    })

    res.status(204).json(deletedUser)
})

export default userRouter
