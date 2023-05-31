const { getAllUserDB, getUserByIdDB, createUserDB, deleteDataDB } = require('../repository/user.repository');

const getAllUser = async () => {
    const data = await getAllUserDB();
    if (!data.length) throw new Error('Array is empty');
    return data;
}

const getUserById = async (id) => {
    const data = await getUserByIdDB(id);
    if (!data.length) throw new Error('Array is empty');
    return data;
}

const createUser = async (name, surname, email, pwd) => {
    const data = await createUserDB(name, surname, email, pwd);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

const deleteUser = async (id) => {
    const data = await deleteDataDB(id);
    if (!data.length) throw new Error(`Array with this id is empty`);
    return data;
}

module.exports = { getAllUser, getUserById, createUser, deleteUser }