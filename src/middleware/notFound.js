import CError, {Selector} from "../misc/errors.js"
const notFoundMiddleware = (req, res, next) => {
    return next(new CError(Selector.NOT_FOUND));
}

export default notFoundMiddleware;