const db = require("./sqlite"); 

db.connect()
  .then(initializedDb)
  .catch(handleError);

let database;

function initializedDb(dbInstance) {
  database = dbInstance;
}

const queryBuilder = require("./db-config");

// Teacher operations

const getTeachers = () => {
  const sql = `SELECT * FROM teachers`;
  return executeSql(sql);
}

const getTeacherById = (id) => {
  const sql = `SELECT * FROM teachers WHERE id = ?`;
  return executeSql(sql, [id]);
}

const createTeacher = (id, name, age) => {
  const sql = `INSERT INTO teachers VALUES (?, ?, ?)`; 
  return executeSql(sql, [id, name, age]); 
}

const updateTeacher = (name, age, id) => {
  const sql = `UPDATE teachers SET name = ?, age = ? WHERE id = ?`;
  return executeSql(sql, [name, age, id]);
}

const deleteTeacher = (id) => {
  const sql = `DELETE FROM teachers WHERE id = ?`;
  return executeSql(sql, [id]);
}


// Student operations  

const getStudents = () => {
  const sql = `SELECT * FROM students`;
  return executeSql(sql);
}

const getStudentById = (id) => {
  const sql = `SELECT * FROM students WHERE id = ?`;
  return executeSql(sql, [id]);
}

const createStudent = (id, name, age, hometown) => {
  const sql = `INSERT INTO students VALUES (?, ?, ?, ?)`;
  return executeSql(sql, [id, name, age, hometown]);
}

const updateStudent = (name, age, hometown, id) => {
  const sql = `UPDATE students SET name = ?, age = ?, hometown = ? WHERE id = ?`;
  return executeSql(sql, [name, age, hometown, id]);
}

const deleteStudent = (id) => {
  const sql = `DELETE FROM students WHERE id = ?`; 
  return executeSql(sql, [id]);
}


// Helper method to execute SQL
function executeSql(sql, params=[]) {
  return queryBuilder.raw(sql, params);
}

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
}