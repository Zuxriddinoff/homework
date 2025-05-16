import express from 'express';
import { config } from 'dotenv';

import { categoryRouter } from './routes/category.route.js';
import { productRouter } from './routes/product.route.js';
config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.listen(PORT, () => console.log('Server running on port', PORT));