import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import sendEmail from '../helper/mailer.js';
import { deliverOrderEmailTemplate, payOrderEmailTemplate } from '../helper/mailOrder.js';
import Order from '../model/orderModel.js';
import Product from '../model/productModel.js';
import User from '../model/userModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find().populate('user', 'name').sort({ createdAt: -1 });
        res.send(orders);
    })
);

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
    '/summary',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ]);
        const users = await User.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);
        const dailyOrders = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalPrice' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const productCategories = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.send({ users, orders, dailyOrders, productCategories });
    })
);

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
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
    '/:id/deliver',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate("user");
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            await order.save();
            sendEmail({ from: "Hà", to: order.user.email, subject: `Vận chuyển đơn hàng ${order._id}`, html: deliverOrderEmailTemplate(order) }).then((res) =>
                console.log(res)).catch((err) => console.log(err))
            res.send({ message: 'Đơn hàng đã được vận chuyển' });
        } else {
            res.status(404).send({ message: 'Đơn hàng không tồn tại' });
        }
    })
);

orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            const orderPopulate = await Order.findOne(updatedOrder).populate("user")
            console.log(orderPopulate, "order.user.email", orderPopulate.user.email)
            sendEmail({ from: "Hà", to: orderPopulate.user.email, subject: `Đơn hàng mới ${orderPopulate._id}`, html: payOrderEmailTemplate(orderPopulate) }).then((res) =>
                console.log(res)).catch((err) => console.log(err))

            res.send({ message: 'Đơn hàng đã được thanh toán', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Đơn hàng không tồn tại' });
        }
    })
);

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.remove();
            res.send({ message: 'Đơn hàng đã bị xóa' });
        } else {
            res.status(404).send({ message: 'Đơn hàng không tồn tại' });
        }
    })
);

export default orderRouter;