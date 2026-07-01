import bcrypt from 'bcrypt';

const ROUNDS = 10;

const isValidUUID = (id) => {
    return /^[0-9a-fA-F-]{36}$/.test(id);
};

const cleanData = (...properties) => (data) => {
    const result = {...data};
    for (const property of properties) {
        delete result[property]
    }
    return result;
}

const encrypt = async (data) => {
    const salt = await bcrypt.genSalt(ROUNDS);
    return await bcrypt.hash(data, salt);
}

const comparte = async (text, hashedtext) => {
    return await bcrypt.compare(text, hashedtext);
} 

export {
    isValidUUID,
    cleanData,
    encrypt
}