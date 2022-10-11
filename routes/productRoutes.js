import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
            name: 'sample name ' + Date.now(),
            slug: 'sample-name-' + Date.now(),
            image: '/images/p1.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
        });
        const product = await newProduct.save();
        res.send({ message: 'Product Created', product });
    })
);

productRouter.get(
    '/search',
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        console.log("🚀 ~ file: productRoutes.js ~ line 90 ~ expressAsyncHandler ~ query", query)
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const price = query.price || '';
        const rating = query.rating || '';
        const order = query.order || '';
        const searchQuery = query.query || '';

        const queryFilter =
            searchQuery && searchQuery !== 'all'
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};
        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter =
            rating && rating !== 'all'
                ? {
                    rating: {
                        $gte: Number(rating),
                    },
                }
                : {};
        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    price: {
                        $gte: Number(price.split('-')[3]),
                        $lte: Number(price.split('-')[4]),
                    },
                }
                : {};
        const sortOrder =
            order === 'featured'
                ? { featured: -1 }
                : order === 'lowest'
                    ? { price: 1 }
                    : order === 'highest'
                        ? { price: -1 }
                        : order === 'toprated'
                            ? { rating: -1 }
                            : order === 'newest'
                                ? { createdAt: -1 }
                                : { _id: -1 };
        console.log("🚀 ~ file: productRoutes.js ~ line 128 ~ expressAsyncHandler ~ sortOrder", sortOrder)

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        });
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
        console.log(123);
        const categories = await Product.distinct('category');
        console.log("🚀 ~ file: productRoutes.js ~ line 16 ~ expressAsyncHandler ~ categories", categories)
        res.send(categories);
    })
);
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

const PAGE_SIZE = 3;

productRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        console.log("🚀 ~ file: productRoutes.js ~ line 69 ~ expressAsyncHandler ~ query", query)
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const products = await Product.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countProducts = await Product.countDocuments();
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);



export default productRouter