import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            shippingMethod: req.body.shippingMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const order = await newOrder.save();
        res.status(201).send({ message: 'Tạo thành công đơn hàng', order });
    })
);

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Đơn hàng không tồn tại' });
        }
    })
);

orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updateOrder = await Order.save()
            res.send({ message: 'Đơn hàng đã thanh toán', order: updateOrder })
        }
        else {
            res.status(404).send({ message: 'Đơn hàng không tồn tại' })
        }
    })
)
export default orderRouter;