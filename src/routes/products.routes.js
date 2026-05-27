import express from 'express';
import products from '../db/products.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ 
        ok: true,
        data: products 
    });
});

router.get('/:id', (req, res) => {
    res.status(200).json({
        ok:true,
        data: products.find((product) => product.id === parseInt(req.params.id))
    });
})

export default router;