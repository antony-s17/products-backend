import validator from 'validator';
import CError, { Selector } from '../misc/errors.js';

const validateCreateUser = (req, res, next) => {
    //console.log(req.body);
    const { username, email, password } = req.body;
    if (!username?.trim() || !email?.trim() || !password?.trim() || !validator.isEmail(email) || !validator.isLength(password, {min:8})) {
        return next(new CError(Selector.BAD_INPUT));
    }
    req.body.email = validator.normalizeEmail(email); //normalize email PRUEBA@GMAIL.COM -> prueba@gmail.com
    next();
}

export default validateCreateUser;