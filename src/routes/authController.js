import { Router } from 'express';
import parameterMiddleware from '../middlewares/parameterMiddleware';
import { userModel } from '../model/user';
import jwt from 'jwt-then';
import { signingSecret } from '../config';

const router = Router();

router.post(
    '/login',
    parameterMiddleware(['username', 'password']),
    async (req, res, next) => {
        try {
            let { body } = req;
            let loginUser = await userModel.findOne({
                username: body.username
            });

            if (!loginUser)
                throw {
                    status: 401,
                    message: 'Username or Password Incorrect'
                };

            if (!(await loginUser.comparePassword(body.password)))
                throw {
                    status: 401,
                    message: 'Username or Password Incorrect'
                };

            let token = await jwt.sign(
                { username: loginUser.username },
                signingSecret
            );

            return res
                .status(200)
                .json({ bearer: token, user: loginUser.username });
        } catch (ex) {
            next(ex);
        }
    }
);

router.post(
    '/usernameAvailable',
    parameterMiddleware(['username']),
    async (req, res, next) => {
        try {
            let { username } = req.body;
            return res
                .status(200)
                .send((await userModel.countDocuments({ username })) == 0);
        } catch (ex) {
            next(ex);
        }
    }
);

router.post(
    '/register',
    parameterMiddleware(['username', 'password']),
    async (req, res, next) => {
        try {
            let { body } = req;

            let checkUser = await userModel.findOne({
                username: body.username
            });

            if (checkUser)
                throw { status: 400, message: 'Username already exists' };

            if (!userModel.isPasswordValid(body.password))
                throw {
                    status: 400,
                    message: 'Password does not meet the requirements'
                };
            let newUser = new userModel({
                username: body.username
            });

            await newUser.hashPassword(body.password);

            await newUser.save();
            return res
                .status(201)
                .json({ username: newUser.username, _id: newUser._id });
        } catch (ex) {
            next(ex);
        }
    }
);

export default router;
