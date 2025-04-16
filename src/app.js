import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { connectionDB } from "./db/index.js";
import authRouter from "./router/auth.routes.js"; 

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN);


authRouter(bot);  


await connectionDB();
