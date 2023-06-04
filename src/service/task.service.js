const { createTaskDB, getAllTaskDB, getTaskByIdDB, deleteTaskByIdDB, updateTaskByIdDB, patchTaskDB } = require('../repository/task.repository');

const createTask = async (task, user_id) => {
    const data = await createTaskDB(task, user_id);
    if (!data.length) throw new Error(`The value didn't come from the client`);
    return data;
}

const getAllTask = async () => {
    const data = await getAllTaskDB();
    if (!data.length) throw new Error(`Array is empty`);
    return data;
}

const getTaskById = async (id) => {
    const data = await getTaskByIdDB(id);
    if (!data.length) throw new Error(`Array is empty`);
    return data;
}

const deleteTaskById = async (id) => {
    const data = await deleteTaskByIdDB(id);
    if (!data.length) throw new Error(`Array with this id is empty`);
    return data;
}

const updateTaskById = async (id, task, user_id) => {
    const data = await updateTaskByIdDB(id, task, user_id);
    if (!data.length) throw new Error(`Array with this id is empty`);
    return data;
}

const patchTask = async (id, clientData) => {
    const data = await patchTaskDB(id, clientData);
    return data;
}

module.exports = { createTask, getAllTask, getTaskById, deleteTaskById, updateTaskById, patchTask }