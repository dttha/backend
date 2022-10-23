import express from 'express';
import Advertisement from '../model/advertisementModel.js';
import { isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const advertisementRouter = express.Router()

advertisementRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const advertisements = await Advertisement.find()
        res.send({
            advertisements
        });
    })
);

advertisementRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const newAdvertisement = new Advertisement({
            alt: 'tên-mẫu-' + Date.now(),
            image: '/images/p1.jpg',
        });
        const advertisement = await newAdvertisement.save();
        res.send({ message: 'Ảnh quảng cáo đã được thêm mới', advertisement });
    })
);

advertisementRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const advertisementId = req.params.id;
        const advertisement = await Advertisement.findById(advertisementId);
        if (advertisement) {
            advertisement.alt = req.body.alt;
            advertisement.image = req.body.image;
            await advertisement.save();
            res.send({ message: 'Ảnh quảng cáo đã được chỉnh sửa' });
        } else {
            res.status(404).send({ message: 'Ảnh quảng cáo không tồn tại' });
        }
    })
);

advertisementRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const advertisement = await Advertisement.findById(req.params.id);
        if (advertisement) {
            await advertisement.remove();
            res.send({ message: 'Ảnh quảng cáo đã bị xóa' });
        } else {
            res.status(404).send({ message: 'Ảnh quảng cáo không tồn tại' });
        }
    })
);

const PAGE_SIZE = 3;

advertisementRouter.get(
    '/admin',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || PAGE_SIZE;

        const advertisements = await Advertisement.find()
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        const countAdvertisements = await Advertisement.countDocuments();
        res.send({
            advertisements,
            countAdvertisements,
            page,
            pages: Math.ceil(countAdvertisements / pageSize),
        });
    })
);

advertisementRouter.get('/:_id', async (req, res) => {
    const advertisement = await Advertisement.findById(req.params._id)
    if (advertisement) {
        res.send(advertisement)
    } else {
        res.status(404).send({ message: 'Ảnh quảng cáo không tồn tại' })
    }
})

export default advertisementRouter