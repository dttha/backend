import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import { isAuth, generateToken, isAdmin } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await User.find({});
        res.send(users);
    })
);

userRouter.get(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'Người dùng không tồn tại' });
        }
    })
);

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            const set = {
                name: req.body.name || user.name,
                phone: req.body.phone || user.phone,
                email: req.body.email || user.email
            }
            if (req.body.password) {
                set.password = bcrypt.hashSync(req.body.password, 8);
            }

            const updatedUser = await User.findByIdAndUpdate(req.user._id, {
                $set: set
            }, { new: true })
            console.log("🚀 ~ file: userRoutes.js ~ line 47 ~ expressAsyncHandler ~ updatedUser", updatedUser)
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                phone: updatedUser.phone,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: 'Người dùng không tồn tại' });
        }
    })
);

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.isAdmin);
            const updatedUser = await user.save();
            res.send({ message: 'Người dùng đã được cập nhật', user: updatedUser });
        } else {
            res.status(404).send({ message: 'Người dùng không tồn tại' });
        }
    })
);

userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === 'ha@example.com') {
                res.status(400).send({ message: 'Không thể xóa người dùng quản trị' });
                return;
            }
            await user.remove();
            res.send({ message: 'Người dùng đã bị xóa' });
        } else {
            res.status(404).send({ message: 'Người dùng không tồn tại' });
        }
    })
);

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Email/Tên hoặc mật khẩu không đúng' });
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        })
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
    })
)



export default userRouter;