import CError, { Selector } from "../misc/errors.js";

const requireRole = (role) => {
    return (req, res, next) => {
        if (role !== res.locals.role) {
            return next(new CError(Selector.UNATHORIZED));
        }
        next();
    }
}

export default requireRole;