import CError, { Selector } from "../misc/errors.js";
import { selectFullUser } from "../services/users.js";

const getUserInfo = async (req, res, next) => {
    try {
        const { email } = res.locals;
        const user = await selectFullUser(email);
        if (!user) {
            throw new CError(Selector.USR_NOTFOUND);
        }
        return res.status(200).json(
            {
                ok: true,
                data: user
            }
        )
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

export {
    getUserInfo
}