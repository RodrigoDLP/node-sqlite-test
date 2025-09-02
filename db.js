/*const path = require('path');
const sqlite = require('sqlite3');
const db = new sqlite.Database(path.resolve(__dirname, '../../database.db'), sqlite.OPEN_READWRITE, (error)=>{
    if (error) {return console.error(error);}})

const studentstablequery = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(50) NOT NULL);`;
const teacherstablequery = `CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(50) NOT NULL);`;
const subjectstablequery = `CREATE TABLE IF NOT EXISTS subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL);`
const enrollmentstablequery = `CREATE TABLE IF NOT EXISTS enrollments (studentid INTEGER NOT NULL, subjectid INTEGER NOT NULL, teacherid INTEGER NOT NULL, semester VARCHAR(10) NOT NULL,
FOREIGN KEY (studentid) REFERENCES students(id), FOREIGN KEY (teacherid) REFERENCES teachers(id), FOREIGN KEY (subjectid) REFERENCES subjects(id));`;

db.run(studentstablequery, (error)=>{if (error) return console.error(error);});
db.run(teacherstablequery, (error)=>{if (error) return console.error(error);});
db.run(subjectstablequery, (error)=>{if (error) return console.error(error);});
db.run(enrollmentstablequery, (error)=>{if (error) return console.error(error);});*/


const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { promisify } = require('util');

const db = new sqlite3.Database(
  path.resolve(__dirname, './database.db'),
  sqlite3.OPEN_READWRITE, err => {
    if (err) {console.error('Database connection error:', err); process.exit(1);}
    console.log('Database connection was successful');
  }
);

const run = promisify(db.run.bind(db));

const studentTable = `
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(50) NOT NULL
  );
`;

const teacherTable = `
  CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(50) NOT NULL
  );
`;

const subjectTable = `
  CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL
  );
`;

const enrollmentTable = `
  CREATE TABLE IF NOT EXISTS enrollments (
    studentid INTEGER NOT NULL,
    subjectid INTEGER NOT NULL,
    teacherid INTEGER NOT NULL,
    semester VARCHAR(10) NOT NULL,
    FOREIGN KEY (studentid) REFERENCES students(id),
    FOREIGN KEY (subjectid) REFERENCES subjects(id),
    FOREIGN KEY (teacherid) REFERENCES teachers(id),
    UNIQUE (studentid, subjectid, teacherid, semester)
  );
`;

async function init() {
  await run(studentTable);
  await run(teacherTable);
  await run(subjectTable);
  await run(enrollmentTable);
  console.log('Database migrations completed successfully');
}

module.exports = {db, init,};
