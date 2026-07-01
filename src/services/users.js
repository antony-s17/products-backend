import { prisma } from "../db/config.js";
import CError, { Selector } from "../misc/errors.js";

const selectFullUser = async (email) => {
    return await prisma.user.findUnique({select: {username: true, role: true, email: true }, where:{ email }});
}

export {
    selectFullUser
}
