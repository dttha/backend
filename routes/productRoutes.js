import express from 'express';
import Product from '../model/productModel.js'

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})
productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Sản phẩm không tồn tại' })
    }
})
productRouter.get('/:_id', async (req, res) => {
    const product = await Product.findById(req.params._id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Sản phẩm không tồn tại' })
    }
})

export default productRouter