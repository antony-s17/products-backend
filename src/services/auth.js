import { compare } from "../utils/utils.js";
import { prisma } from "../db/config.js"
import CError, { Selector } from "../misc/errors.js";
import { cleanData, encrypt } from "../utils/utils.js"
import { sign } from "../utils/jwt.js";

const attributes = ["id", "password", "role", "createdAt", "updatedAt"];

const insertUser = async (user, role) => {
    try {
        const hashedpassword = await encrypt(user.password);
        const newUser = await prisma.user.create({ data: {...user, role, password: hashedpassword} })
        return {
            ok: true,
            data: cleanData(...attributes)(newUser)
        }
    } catch (error) {
        return {
            ok: false,
            data: error.code
        }
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
            throw new Error("Doesn't create user");
        }
        const areEqual = await compare(password, user.password);
        if (!areEqual) {
            throw new Error("Invalid credentials");
        }
        const { role } = user;

        const token = sign({ id: user.id, email, role });

        return {
            ok: true,
            data: token
        }
    } catch(error) {
        return {
            ok: false
        }
    }
}

const selectUser = async (id) => {
    try {
        const user = await prisma.user.findUnique({where: { id }});
        if (!user) {
            throw new Error("Not found user")
        }
        return {
            ok: true,
            data: cleanData(...attributes)(user)
        }
    } catch (error) {
        return {
            ok: false
        }
    }
}
    
export {
    insertUser,
    loginUser,
    selectUser
}