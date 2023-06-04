const { createAuthDB, createRegDB } = require('../repository/api.repository');

const createAuth = async (email, pwd) => {
    const data = await createAuthDB(email, pwd);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

const createReg = async (name, surname, email, pwd) => {
    const data = await createRegDB(name, surname, email, pwd);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

module.exports = { createAuth, createReg }