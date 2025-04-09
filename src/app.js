import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { startCronJobs } from "./utils/cronJobs.js";

const app = express();

startCronJobs(); // this function deletes unverified users every minutes automatically

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
  }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())

//routes
import userRouter from "./routes/user.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);

export { app };
