/*
const sqlite = require('sqlite3');

const db = new sqlite.Database('./data.db', sqlite.OPEN_READWRITE, (error)=>{
    if (error) {console.error(error);}
});

/*
sql = `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL)`;
db.run(sql, (error)=>{
    if (error) {console.error(error);}
})*/


/* sql = `INSERT INTO categories (name) values (?)`;
db.run(sql, ["Categoría 4"], (error)=>{
    if (error) {console.error(error);}
}); */

/* sql = `UPDATE categories SET name = ? WHERE id = ?`;
db.run(sql, ["Categoría 1B", 1], (error)=>{
    if (error) {console.error(error);}
}); */
/*sql = `DELETE FROM categories WHERE id = ?`;
db.run(sql, [2], (error)=>{if (error) {console.error(error);}});*/

//imprimir toda la tabla

/*
sql = `SELECT * FROM categories`;
db.all(sql, (error, rows)=>{
    if (error) {console.error(error);}
    else {console.log(rows);}
})
*/


//select by id
/*
sql = `SELECT * FROM categories WHERE id = ?`;
db.all(sql, [3], (error, rows)=>{
    if (error) {console.error(error);}
    else {console.log(rows);}
});
*/
/*
//cerrado de base de datos, siempre al final
db.close((error)=>{if (error) {console.error(error);}});*/

const express = require('express');
const {db, init} = require('./db');
const studentController = require('./students');
const teacherController = require('./teachers');
const subjectController = require('./subjects');
const enrollmentController = require('./enrollments');
const app = express();

app.use(express.json());
app.use('/students', studentController);
app.use('/teachers', teacherController);
app.use('/subjects', subjectController);
app.use('/enrollments', enrollmentController);


init()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));
  })
  .catch(err=>{
    console.error('Init error:', err);
    process.exit(1);
  });