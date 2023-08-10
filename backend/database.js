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
    const sql = `SELECT * FROM teacher`
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
    const sql = `SELECT * FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teacher(id,name,age) VALUES (?,?,?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id, name, age])
            .then(() => {
                resolve({status: "Successfully inserted Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateTeacher = async (name, age, id) => {
    const sql = `UPDATE teacher SET name=?, age=? WHERE id=?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [name, age, id])
            .then(() => {
                resolve({status: "Successfully updated Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then(() => {
                resolve({status: "Successfully deleted Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudents = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM student`;
    knex_db
      .raw(sql)
      .then((student) => {
        resolve(student);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const readStudentInfo = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM student WHERE id = ?`;
    knex_db
      .raw(sql, [id])
      .then((student) => {
        resolve(student);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const readStudents = async () => {
  const sql = `SELECT * FROM student`;
  return knexQuery(sql);
};

const readStudentInfo = async (id) => {
  const sql = `SELECT * FROM student WHERE id = ?`;
  return knexQuery(sql, [id]);
};

const addStudent = async (id, name, age, hometown) => {
  const sql = `INSERT INTO student(id, name, age, hometown) VALUES (?, ?, ?, ?)`;
  return knexExecute(sql, [id, name, age, hometown]);
};

const updateStudent = async (name, age, id, hometown) => {
  const sql = `UPDATE student SET name = ?, age = ?, hometown = ? WHERE id = ?`;
  return knexExecute(sql, [name, age, hometown, id]);
};

const deleteStudent = async (id) => {
  const sql = `DELETE FROM student WHERE id = ?`;
  return knexExecute(sql, [id]);
};

const knexQuery = async (sql, params = []) => {
  try {
      const result = await knex_db.raw(sql, params);
      return result;
  } catch (error) {
      throw error;
  }
};

const knexExecute = async (sql, params = []) => {
  try {
      await knex_db.raw(sql, params);
      return { status: "Success" };
  } catch (error) {
      throw error;
  }
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
