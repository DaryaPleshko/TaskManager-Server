const bcrypt = require('bcrypt');
const { createAuthDB, createRegDB } = require('../repository/api.repository');


const salt = 12;

const createAuth = async (email, pwd) => {
    const data = await createAuthDB(email, pwd);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

const createReg = async (name, surname, email, pwd) => {
    const hashPwd = await bcrypt.hash(pwd, salt);

    const data = await createRegDB(name, surname, email, hashPwd);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

module.exports = { createAuth, createReg }