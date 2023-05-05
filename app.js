import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cors from "cors"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";

export const app = express()


// MONGO_URI = mongodb://127.0.0.1:27017

config({
    path : "./data/config.env"
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use("/api/v1/users",userRouter)

app.use("/api/v1/task",taskRouter)


app.get("/", (req, res) => {
    res.end("Welcome")
})

app.use(errorMiddleware)