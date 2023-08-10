const dbConnection = require("./sqlite");

let _db;

async function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

async function dbinitialize() {
    testBase.resetDatabase(knex_db);
}

async function readTeachers() {
    const sql = `SELECT * FROM teacher`;
    try {
        const data = await knex_db.raw(sql);
        return data;
    } catch (error) {
        throw error;
    }
}

async function readTeacherInfo(id) {
    const sql = `SELECT * FROM teacher WHERE id = ?`;
    try {
        const data = await knex_db.raw(sql, [id]);
        return data;
    } catch (error) {
        throw error;
    }
}

async function addTeacher(id, name, age) {
    const sql = `INSERT INTO teacher(id, name, age) VALUES (?, ?, ?)`;
    try {
        await knex_db.raw(sql, [id, name, age]);
        return { status: "Successfully inserted Teacher" };
    } catch (error) {
        throw error;
    }
}

async function updateTeacher(name, age, id) {
    const sql = `UPDATE teacher SET name=?, age=? WHERE id=?`;
    try {
        await knex_db.raw(sql, [name, age, id]);
        return { status: "Successfully updated Teacher" };
    } catch (error) {
        throw error;
    }
}

async function deleteTeacher(id) {
    const sql = `DELETE FROM teacher WHERE id = ?`;
    try {
        await knex_db.raw(sql, [id]);
        return { status: "Successfully deleted Teacher" };
    } catch (error) {
        throw error;
    }
}

const executeQuery = async (sql, params = []) => {
    try {
        const result = await knex_db.raw(sql, params);
        return result;
    } catch (error) {
        throw error;
    }
};

const readStudents = async () => {
    const sql = `SELECT * FROM student`;
    return executeQuery(sql);
};

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM student WHERE id = ?`;
    return executeQuery(sql, [id]);
};

const addStudent = async (id, name, age, hometown) => {
    const sql = `INSERT INTO student(id,name,age,hometown) VALUES (?,?,?,?)`;
    await executeQuery(sql, [id, name, age, hometown]);
    return { status: "Successfully inserted Student" };
};

const updateStudent = async (name, age, id, hometown) => {
    const sql = `UPDATE student SET name=?, age=?, hometown=? WHERE id=?`;
    await executeQuery(sql, [name, age, hometown, id]);
    return { status: "Successfully updated Student" };
};

const deleteStudent = async (id) => {
    const sql = `DELETE FROM student WHERE id = ?`;
    await executeQuery(sql, [id]);
    return { status: "Successfully deleted Student" };
};

module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};