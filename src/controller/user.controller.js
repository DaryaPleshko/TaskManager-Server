const express = require('express');
const { getAllUser, getUserById, createUser, deleteUser, updateUser } = require('../service/user.service');
const { isValidUserId, isValidUserBody } = require('../helper/validation');
const { buildResponse } = require('../helper/buildResponse');

const route = express.Router();

route.get('/', async (request, response) => {
    try {
        const data = await getAllUser();
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.get('/:id', isValidUserId, async (request, response) => {
    try {
        const { id } = request.params;
        const data = await getUserById(id);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.post('/', isValidUserBody, async (request, response) => {
    try {
        const { name, surname, email, pwd } = request.body;
        const data = await createUser(name, surname, email, pwd);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 4040, error.message);
    }
});

route.delete('/:id', isValidUserId, async (request, response) => {
    try {
        const { id } = request.params;
        const data = await deleteUser(id);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.put('/:id', isValidUserId, isValidUserBody, async (request, response) => {
    try {
        const { id } = request.params;
        const { name, surname, email, pwd } = request.body;
        const data = await updateUser(id, name, surname, email, pwd);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

module.exports = route;      