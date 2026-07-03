import CError, { Selector } from "../misc/errors.js";
import { verify } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
    //console.log("header: ", req.headers);
    //console.log("cookies: ", req.cookies);

    const { access_token: accesToken } = req.cookies;

    const user = verify(accesToken);

    if (!user) {
        return next(new CError(Selector.UNATHORIZED))
    }

    const { id, email, role } = user;
    res.locals = { id,email, role };

    next();
}

export default authenticate;