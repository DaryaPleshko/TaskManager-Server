const { pool } = require('../db');

const getAllUserDB = async () => {
    const client = await pool.connect();

    const sql = `
    SELECT *
    FROM users
    `;
    const result = (await client.query(sql)).rows;
    return result;
};

const getUserByIdDB = async (id) => {
    const client = await pool.connect();

    const sql = `
    SELECT *
    FROM users
    WHERE id = $1`;
    const result = (await client.query(sql, [id])).rows;
    return result;
}

const createUserDB = async (name, surname, email, pwd) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = `
        INSERT INTO users(name, surname, email, pwd)
        VALUES ($1, $2, $3, $4) RETURNING *`;
        const gettingSql = (await client.query(sql, [name, surname, email, pwd])).rows;

        await client.query('COMMIT');

        return gettingSql;
    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

const deleteDataDB = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = `
        DELETE FROM users 
        WHERE id = $1 RETURNING *`;
        const gettingSql = (await client.query(sql, [id])).rows;

        await client.query('COMMIT');

        return [gettingSql];
    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

const updateUserDB = async (id, name, surname, email, pwd) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = `
        UPDATE users
        SET name = $1, surname = $2, email = $3, pwd = $4 
        WHERE id = $5 RETURNING *`;
        const gettingSql = (await client.query(sql, [name, surname, email, pwd, id])).rows;

        await client.query('COMMIT');

        return [gettingSql];
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error(error.message);
    }
};


module.exports = { getAllUserDB, getUserByIdDB, createUserDB, deleteDataDB, updateUserDB }