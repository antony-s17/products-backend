import { insertUser, loginUser, selectUser } from "../services/auth.js";
import CError, { Selector } from "../misc/errors.js";
import { isValidUUID } from '../utils/utils.js';

const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await insertUser({ username, email, password });
        return res.status(201).json({
            ok:true,
            data: user
        })
    } catch (error) {
        if (error.code == 'P2002') {
            return next(new CError(Selector.USER_EXIST))
        }
        return next(error);
    } 
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await loginUser(email, password);
        res.cookie("access_token", response, {
            expiresAt: new Date() + 3_600_00,
            httpOnly: true,
            secure: false //only true in production
        })
        return res.status(200).json(
            {
                ok: true
            }
        )
    } catch (error) {
        return next(error);
    }
}

const logout = async(req, res, next) => {
    res.clearCookie("access_token");
    return res.status(200).json(
        {
            ok: true
        }
    )
}

export {
    createUser,
    login,
    logout
}