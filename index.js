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
    app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
  })
  .catch(err=>{
    console.error('Init error:', err);
    process.exit(1);
  });