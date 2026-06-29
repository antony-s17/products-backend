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

export {
    isValidUUID,
    cleanData
}