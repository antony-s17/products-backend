import { prisma } from "../db/config.js";
import CError, { Selector } from "../misc/errors.js";

const selectFullUser = async (email) => {
    try {
        const user = await prisma.user.findUnique({select: {username: true, role: true, email: true }, where:{ email }});
        return {
            ok: true,
            data: user
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}

export {
    selectFullUser
}
