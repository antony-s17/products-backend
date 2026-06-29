import express from 'express';
import productRouter from './routes/products.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express();

app.use(express.json());

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



// Not Found Middleware
app.use(notFoundMiddleware);
// Error Middleware
app.use(errorHandler);


export default app;
