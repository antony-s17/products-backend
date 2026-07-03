import { compare } from "bcrypt";
import { prisma } from "../db/config.js"
import CError, { Selector } from "../misc/errors.js";
import { cleanData, encrypt } from "../utils/utils.js"
import { sign } from "../utils/jwt.js";

const attributes = ["id", "password", "role", "createdAt", "updatedAt"];

const insertUser = async (user) => {
    try {
        const hashedpassword = await encrypt(user.password);
        const newUser = await prisma.user.create({ data: {...user, password: hashedpassword} })
        return cleanData(...attributes)(newUser)
    } catch (error) {
        throw error;
    }
}

const loginUser = async (email, password ) => {
    try {
        const user = await prisma.user.findUnique(
        {
            select: {id: true, password: true, role: true },
            where: { email }
        });
        if (!user) {
            throw new CError(Selector.NOT_FOUND);
        }
        const areEqual = await compare(password, user.password);
        if (!areEqual) {
            throw new CError(Selector.WRONG_CRED);
        }
        const { role } = user;

        const token = sign({ id: user.id, email, role });

        return token;
    } catch(error) {
        throw error;
    }

}

const selectUser = async (id) => {
    try {
        const user = await prisma.user.findUnique({where: { id }});
        if (!user) {
            return null;
        }
        return cleanData(...attributes)(user);
    } catch (error) {
        throw error;
    }
}
    
export {
    insertUser,
    loginUser,
    selectUser
}