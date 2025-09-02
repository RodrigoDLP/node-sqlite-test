const express = require('express')
const router  = express.Router()
const {db} = require('./db')

router.post('/', (req, res) => {
  const { studentid, subjectid, teacherid, semester } = req.body
  const sql = `INSERT INTO enrollments (studentid, subjectid, teacherid, semester) VALUES (?, ?, ?, ?)`
  db.run(sql, [studentid, subjectid, teacherid, semester], function(err) {
    if (err) return res.status(400).json({ error: err.message })
    res.status(201).json({ studentid, subjectid, teacherid, semester })
  })
})

router.get('/', (req, res) => {
  db.all('SELECT * FROM enrollments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

router.get(
  '/:studentid/:subjectid/:teacherid/:semester',
  (req, res) => {
    const { studentid, subjectid, teacherid, semester } = req.params
    const sql = `SELECT * FROM enrollments WHERE studentid=? AND subjectid=? AND teacherid=? AND semester=?`
    db.get(sql, [studentid, subjectid, teacherid, semester], (err, row) => {
      if (err) return res.status(500).json({ error: err.message })
      if (!row) return res.status(404).json({ error: 'Enrollment not found' })
      res.json(row)
    })
  }
)

router.put(
  '/:studentid/:subjectid/:teacherid/:semester',
  (req, res) => {
    const { studentid, subjectid, teacherid, semester } = req.params
    const { newTeacherid, newSemester } = req.body
    const sql = `
      UPDATE enrollments
         SET teacherid = ?, semester = ?
       WHERE studentid=? AND subjectid=?
         AND teacherid=? AND semester=?
    `
    db.run(sql, [newTeacherid, newSemester, studentid, subjectid, teacherid, semester], function(err) {
        if (err) return res.status(400).json({ error: err.message })
        if (this.changes === 0) return res.status(404).json({ error: 'Enrollment not found' })
        res.json({ studentid, subjectid, teacherid: newTeacherid, semester: newSemester })
      })})

router.delete(
  '/:studentid/:subjectid/:teacherid/:semester', (req, res) => {
    const { studentid, subjectid, teacherid, semester } = req.params
    const sql = `DELETE FROM enrollments WHERE studentid=? AND subjectid=? AND teacherid=? AND semester=?`
    db.run(sql, [studentid, subjectid, teacherid, semester], function(err) {
      if (err) return res.status(500).json({ error: err.message })
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' })
      res.json({ deleted: { studentid, subjectid, teacherid, semester } })
    })
  }
)

module.exports = router