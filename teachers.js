const express = require('express');
const {db} = require('./db')
const router  = express.Router();

router.post('/', (req, res) => {
  const { firstname, lastname } = req.body;
  const sql = `INSERT INTO teachers (firstname, lastname) VALUES (?, ?)`;

  db.run(sql, [firstname, lastname], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID, firstname, lastname });
  });
});

router.get('/', (req, res) => {
  const sql = `SELECT * FROM teachers`;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM teachers WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: `Teacher with id ${id} not found` });
    res.json(row);
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  const sql = `UPDATE teachers SET firstname = ?, lastname = ? WHERE id = ?`;

  db.run(sql, [firstname, lastname, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: `Teacher with id ${id} not found` });
    res.json({ id, firstname, lastname });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM teachers WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: `Teacher with id ${id} not found` });
    res.json({ deletedId: id });
  });
});
module.exports = router;

