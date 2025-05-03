import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


//Routes imports
import userRouter from './routes/user.routes.js'



//routes decleration
app.use("/api/v1/users", userRouter);  //("urls by user"/ which router should activate!)


export {app}; 