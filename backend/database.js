const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
    testBase.resetDatabase(knex_db);
}

const readTeachers = async () => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addTeacher = async (id, name, age) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateTeacher = async (name, age, id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const deleteTeacher = async (id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudents = async () => {
  const sql = `SELECT * FROM students`;
  
  return knex_db.raw(sql);
}

const readStudentInfo = async (id) => {
  const sql = `SELECT * FROM students WHERE id = ?`;
  
  return knex_db.raw(sql, [id]);
} 

const addStudent = async (id, name, age, religion) => {
  const sql = `INSERT INTO students(id, name, age, religion) VALUES (?, ?, ?, ?)`;
  
  return knex_db.raw(sql, [id, name, age, religion]);
}

const updateStudent = async (name, age, religion, id) => {
  const sql = `UPDATE students SET name = ?, age = ?, religion = ? WHERE id = ?`;
  
  return knex_db.raw(sql, [name, age, religion, id]);
}

const deleteStudent = async (id) => {
  const sql = `DELETE FROM students WHERE id = ?`;
  
  return knex_db.raw(sql, [id]); 
}

module.exports = {

  // Teacher functions
  readTeachers,
  readTeacherInfo,
  addTeacher,
  updateTeacher,
  deleteTeacher,

  // Student functions
  readStudents, 
  readStudentInfo,
  addStudent,
  updateStudent,
  deleteStudent

};