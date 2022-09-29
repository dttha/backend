import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to db')
}).catch(err => {
    console.log(err.message)
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter)
app.use('/api/users', userRouter);

app.use('/', (req, res) => {
    return res.render('Hello')
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`serve at http://localhost:${port}`)
})