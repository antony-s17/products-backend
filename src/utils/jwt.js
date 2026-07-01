import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../misc/constants.js';

const sign = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn:"1h"});
}

const verify = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch(error) {
        return false;
    }
}

export {
    sign,
    verify
}