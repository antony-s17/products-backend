import CError, { Selector } from "../misc/errors.js";
import { verify } from "../utils/jwt.js";

const authenticate = (req, res, next) => {

    const { access_token: accesToken } = req.cookies;

    const user = verify(accesToken);
    if (!user) {
        return next(new CError(Selector.NOT_FOUND))
    }

    const { id, email, role } = user;
    res.locals = { id,email, role };

    next();
}

export default authenticate;