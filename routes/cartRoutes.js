import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Cart from '../model/cartModel.js';
import { isAuth } from '../utils.js';

const cartRouter = express.Router()

cartRouter.get(
    '/',
    isAuth, async (req, res) => {
        try {
            const user = req.user
            const cart = await Cart.findOne({ user: user._id });
            if (cart) {
                return res.send({
                    cart
                });
            } else {
                const newCart = new Cart({ user: user._id })
                await newCart.save();
                return res.send({
                    cart: newCart
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: "get cart fail"
            });
        }
    }
);

cartRouter.put(
    '/:idCart',
    async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.idCart);
            console.log("🚀 ~ file: cartRoutes.js ~ line 39 ~ req.params.idCart", req.params.idCart)
            if (cart) {
                cart.cartItems = req.body.cartItems;
                console.log("🚀 ~ file: cartRoutes.js ~ line 41 ~ req.body.cartItems", req.body.cartItems)
                await cart.save();
                const newCart = await Cart.findOne(cart)
                console.log("🚀 ~ file: cartRoutes.js ~ line 45 ~ newCart", newCart)
                res.send({ message: 'Thêm giỏ hàng thành công', cart: newCart });
            } else {
                res.status(404).send({ message: 'Cart không tồn tại' });
            }
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    }
);

export default cartRouter