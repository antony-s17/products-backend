import express from 'express';
import cookieParser from 'cookie-parser';
import productRouter from './routes/products.js';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundMiddleware from './middlewares/notFound.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended: true}));


//Routes
app.get('/health', (req, res) => {
    res.status(200).json(
        {
            ok: true,
            data: "Server is up and running"
        }
    );
});

app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/users/', userRouter);



// Not Found Middleware
app.use(notFoundMiddleware);
// Error Middleware
app.use(errorHandler);


export default app;
