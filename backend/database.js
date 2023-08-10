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

const readStudents = () => {
  return knex_db('student').then(students => {
    return students;
  }).catch(error => {
    throw error;
  });
};

const readStudentInfo = id => {
  return knex_db('student').where({id}).then(([student]) => {
    return student;
  }).catch(error => {
    throw error;
  });
};

const addStudent = (id, name, age, hometown) => {
  return knex_db('student').insert({id, name, age, hometown}).then(() => {
    return {status: 'Successfully inserted Student'};
  }).catch(error => {
    throw error;
  });
};

const updateStudent = (id, name, age, hometown) => {
  return knex_db('student').where({id}).update({name, age, hometown}).then(() => {
    return {status: 'Successfully updated Student'};
  }).catch(error => {
    throw error;
  });
};

const deleteStudent = id => {
  return knex_db('student').where({id}).del().then(() => {
    return {status: 'Successfully deleted Student'};
  }).catch(error => {
    throw error;
  });
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