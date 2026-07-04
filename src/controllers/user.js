import CError, { Selector } from "../misc/errors.js";
import { selectFullUser } from "../services/user.js";

const getUserInfo = async (req, res, next) => {
    const { email } = res.locals;
    const response = await selectFullUser(email);
    if (!response.ok) {
        return next(new CError(Selector.NOT_FOUND));
    }
    return res.status(200).json(
        {
            ok: true,
            data: response.data
        }
    )
}

export {
    getUserInfo
}