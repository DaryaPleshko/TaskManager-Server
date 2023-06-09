const express = require('express');
const { buildResponse } = require('../helper/buildResponse');
const { createReg, createAuth } = require('../service/api.service');

const route = express.Router();

route.post('/reg', async (request, response) => {
    try {
        const { name, surname, email, pwd } = request.body;
        buildResponse(response, 200, (await createReg(name, surname, email, pwd)));
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

route.post('/auth', async (request, response) => {
    try {
        const { email, pwd } = request.body;
        buildResponse(response, 200, (await createAuth(email, pwd)));
    } catch (error) {
        buildResponse(response, 404, error.message);
    }
});

module.exports = route;
