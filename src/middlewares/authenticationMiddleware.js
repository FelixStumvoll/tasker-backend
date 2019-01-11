import jwt from 'jwt-then';
import { signingSecret } from '../../config';
import {userModel} from '../model/user';

export default async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = removeBearerFromString(token);

            let decoded = await jwt.verify(token, signingSecret).catch(() => {
                throw { status: 401, message: 'invalid token' };
            });

            let user = await userModel.findOne({ username: decoded.username });

            if (!user) throw { status: 401, message: 'Unauthorized user' };

            res.locals.user = user;
            return next();
        } else {
            throw { status: 401, message: 'invalid token' };
        }
    } catch (error) {
        return next(error);
    }
};

const removeBearerFromString = token => {
    let bearerReg = new RegExp('[b|B]earer\\s');
    if (bearerReg.test(token)) {
        return token.replace(bearerReg, '');
    } else {
        return token;
    }
};
