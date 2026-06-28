import express from 'express';
import productRouter from './routes/products.js';

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



// Not found route
app.use((req, res) => {
    res.status(404).json(
        {
            ok: false,
            error: {
                code: 'ROUTE_NOT_FOUND',
                message: 'Not found'
            }
        }
    )
})


export default app;
