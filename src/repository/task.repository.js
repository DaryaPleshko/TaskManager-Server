const { pool } = require('../db');

const createTaskDB = async (task, user_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = `
        INSERT INTO tasks(task,user_id)
        VALUES ($1, $2) RETURNING *`;
        const gettingSql = (await client.query(sql, [task, user_id])).rows;

        await client.query('COMMIT');

        return gettingSql;
    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

const getAllTaskDB = async () => {
    const client = await pool.connect();

    const sql = `SELECT * FROM tasks`;
    const gettingSql = (await client.query(sql)).rows;

    return gettingSql;
}

const getTaskByIdDB = async (id) => {
    const client = await pool.connect();

    const sql = `SELECT * FROM tasks
    WHERE id = $1`;
    const gettingSql = (await client.query(sql, [id])).rows;

    return gettingSql;
}

const deleteTaskByIdDB = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = `
        DELETE FROM tasks 
        WHERE id = $1 RETURNING *`;
        const gettingSql = (await client.query(sql, [id])).rows;

        await client.query('COMMIT');

        return [gettingSql];
    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

const updateTaskByIdDB = async (id, task, user_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = `
        UPDATE tasks
        SET task = $1, user_id = $2
        WHERE id = $3 RETURNING *`;
        const gettingSql = (await client.query(sql, [task, user_id, id])).rows;

        await client.query('COMMIT');

        return [gettingSql];
    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

module.exports = { createTaskDB, getAllTaskDB, getTaskByIdDB, deleteTaskByIdDB, updateTaskByIdDB }