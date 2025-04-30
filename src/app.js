import express from "express";
import cookieParser from "cookie-parser";


import { mainRouter } from "./router/index.js";
import { monngoDB } from "./config/index.js";
monngoDB();

const app = express();
const PORT = +process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());


app.use("/course", mainRouter);

app.listen(PORT, () => console.log(`Server is running on port`, PORT));
