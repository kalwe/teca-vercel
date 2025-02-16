import express, { Express} from 'express'
import { Router, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import userRouter from "../routes/userRouter"
import employeeRouter from "../routes/employeeRouter"

dotenv.config()

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3001

const app: Express = express()
const route = Router()

const allowedOrigins = [`http://${host}:${port}`, "http://localhost:3000"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(options))
app.use(express.json())
app.use(route)

// health-check
app.get('/', (req: Request, res: Response) => {
    res.json({ message: "OK"})
})

app.use(userRouter)
app.use(employeeRouter)

app.listen(port, () => {
    console.log(`[server]: Server is running art http://${host}:${port}`)
}).on("error", (error) => {
    throw new Error(error.message)
})
