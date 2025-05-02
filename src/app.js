import express from 'express';
import { config } from 'dotenv';
import router from './routes/user.routes.js'
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import { catchError } from './utils/error-response.js';

config();

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cookieParser());
connectDb();


app.use('/user', router);
app.use(catchError)

app.listen(PORT, () => {
    console.log(`Server on running ${PORT}`);
});