import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
import cors from 'cors'
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import advertisementRouter from './routes/advertisementRoutes.js';
import cartRouter from './routes/cartRoutes.js';

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
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use('/api/upload', uploadRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/products', productRouter)
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);

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