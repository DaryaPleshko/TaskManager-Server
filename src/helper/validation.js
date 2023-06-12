const isValidTaskId = (request, response, next) => {
    const { id } = request.params;
    if (isNaN(id)) throw new Error(`id не число`);
    if (id <= 0) throw new Error(`id отрицательное`);
    next();
}

const isValidUserId = (request, response, next) => {
    const { id } = request.params;
    if (isNaN(id)) throw new Error(`id не число`);
    if (id <= 0) throw new Error(`id отрицательное`);
    next();
}

const isValidTaskBody = (request, response, next) => {
    const { task, user_id } = request.body;
    if (!task) throw new Error(`Value is empty`);
    if (!isNaN(task)) throw new Error(`Невалидное число`);
    if (isNaN(user_id)) throw new Error(`Невалидное число`);
    if (user_id <= 0) throw new Error(`user_id отрицательное`);
    next();
}

const isValidUserBody = (request, response, next) => {
    const { name, surname, email, pwd } = request.body;
    if (!name) throw new Error(`Value is empty`);
    if (!isNaN(name)) throw new Error(`Невалидное число`);
    if (!surname) throw new Error(`Value is empty`);
    if (!isNaN(surname)) throw new Error(`Невалидное число`);
    if (!email) throw new Error(`Value is empty`);
    if (!pwd) throw new Error(`Value is empty`);
    next();
}

module.exports = { isValidTaskId, isValidUserId, isValidTaskBody, isValidUserBody }            