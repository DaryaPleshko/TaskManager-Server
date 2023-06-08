const bcrypt = require('bcrypt');
const { getUserByEmail, createRegDB } = require('../repository/api.repository');

        
const salt = 2;

const createAuth = async (email, pwd) => {
    const user = await getUserByEmail(email);

    if (!user.length) throw new Error(`email not found`);

    if (!(await bcrypt.compare(pwd, user[0].pwd))) throw new Error(`Password don't match`);
    return user;
}

const createReg = async (name, surname, email, pwd) => {
    const hashPwd = await bcrypt.hash(pwd, salt);

    const data = await createRegDB(name, surname, email, hashPwd);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

module.exports = { createAuth, createReg }