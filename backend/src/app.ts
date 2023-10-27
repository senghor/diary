import "dotenv/config"
import express, {NextFunction, Request, Response} from 'express'
import morgan from "morgan"
import noteRoutes from "./routes/note"
import userRoutes from "./routes/user"
import createHttpError, {isHttpError} from "http-errors"
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"
import { requiresAuth } from "./middleware/auth"

const app = express()

app.use(express.json())

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}))

app.use(morgan("dev"))

app.use("/api/note", requiresAuth, noteRoutes)
app.use("/api/user", userRoutes)


app.use((req, res, next)=>{
    next(createHttpError(404, "Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error)
    let errorMessage = "An unknown error has occured"
    let statusCode = 500
    if(isHttpError(error)){
        statusCode = error.status
        errorMessage = error.message
    }
    if(error instanceof Error) errorMessage = error.message
    res.status(statusCode).json({error:errorMessage})
})
 
export default app
