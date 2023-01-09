import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';
import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 })
    res.send(products)
})

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const newProduct = new Product({
            name: 'tên mẫu ' + Date.now(),
            slug: 'tên-mẫu-' + Date.now(),
            image: '/images/p1.jpg',
            category: 'danh mục mẫu',
            price: 0,
            countInStock: 0,
            author: 'tên tác giả mẫu',
            publisher: 'tên nhà xuất bản mẫu',
            weight: 0,
            numberOfPages: 0,
            size: 0,
            yearPublish: 0,
            rating: 0,
            numReviews: 0,
            description: 'mô tả mẫu',
        });
        const product = await newProduct.save();
        res.send({ message: 'Sản phẩm đã được thêm mới', product });
    })
);

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.slug = req.body.slug;
            product.image = req.body.image;
            product.category = req.body.category;
            product.price = req.body.price;
            product.countInStock = req.body.countInStock;
            product.author = req.body.author;
            product.publisher = req.body.publisher;
            product.weight = req.body.weight;
            product.numberOfPages = req.body.numberOfPages;
            product.size = req.body.size;
            product.yearPublish = req.body.yearPublish;
            product.description = req.body.description;
            await product.save();
            res.send({ message: 'Sản phẩm đã được chỉnh sửa' });
        } else {
            res.status(404).send({ message: 'Sản phẩm không tồn tại' });
        }
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.send({ message: 'Sản phẩm đã bị xóa' });
        } else {
            res.status(404).send({ message: 'Sản phẩm không tồn tại' });
        }
    })
);

productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            if (product.reviews.find((x) => x.name === req.user.name)) {
                return res
                    .status(400)
                    .send({ message: 'Bạn đã gửi một đánh giá' });
            }

            const review = {
                name: req.user.name,
                rating: Number(req.body.rating),
                comment: req.body.comment,
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((a, c) => c.rating + a, 0) /
                product.reviews.length;
            const updatedProduct = await product.save();
            res.status(201).send({
                message: 'Bài đánh giá đã được tạo',
                review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
                numReviews: product.numReviews,
                rating: product.rating,
            });
        } else {
            res.status(404).send({ message: 'Sản phẩm không tồn tại' });
        }
    })
);


const PAGE_SIZE = 3;

productRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
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
        const categories = await Product.find().distinct('category');
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

export default productRouter