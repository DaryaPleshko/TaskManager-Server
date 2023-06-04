const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { isValidTaskId, isValidTaskBody } = require('../helper/validation');
const { createTask, getAllTask, getTaskById, deleteTaskById, updateTaskById, patchTask } = require('../service/task.service');

const route = express.Router();

route.post('/', isValidTaskBody, async (request, response) => {
    try {
        const { task, user_id } = request.body;
        const data = await createTask(task, user_id);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.get('/', async (request, response) => {
    try {
        const data = await getAllTask();
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.get('/:id', isValidTaskId, async (request, response) => {
    try {
        const { id } = request.params;
        const data = await getTaskById(id);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.delete('/:id', isValidTaskId, async (request, response) => {
    try {
        const { id } = request.params;
        const data = await deleteTaskById(id);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.put('/:id', isValidTaskId, isValidTaskBody, async (request, response) => {
    try {
        const { id } = request.params;
        const { task, user_id } = request.body;
        const data = await updateTaskById(id, task, user_id);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.patch('/:id', isValidTaskId, async (request, response) => {
    try {
        const { id } = request.params;
        const clientData = request.body;
        const data = await patchTask(id, clientData);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

module.exports = route;