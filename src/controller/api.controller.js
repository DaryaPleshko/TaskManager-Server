const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { createAuth, createReg } = require('../service/task.service');

const route = express.Router();

route.post('/auth', async (request, response) => {
    try {
        const { email, pwd } = request.body;
        const data = await createAuth(email, pwd);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.post('/reg', async (request, response) => {
    try {
        const { name, surname, email, pwd } = request.body;
        const data = await createReg(name, surname, email, pwd);
        buildResponse(response, 200, data);
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

module.exports = route;
