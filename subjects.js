const express = require('express');
const {db} = require('./db')
const router  = express.Router();

router.post('/', (req, res) => {
  const {name} = req.body;
  const sql = `INSERT INTO subjects (name) VALUES (?)`;

  db.run(sql, [name], function(err) {
    if (err) return res.status(400).json({error: err.message});
    res.status(201).json({id: this.lastID, name});
  });
});

router.get('/', (req, res) => {
  const sql = `SELECT * FROM subjects`;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM subjects WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({error: err.message});
    if (!row) return res.status(404).json({error: `Subject with id ${id} not found`});
    res.json(row);
  });
});


router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  const sql = `UPDATE subjects SET name = ? WHERE id = ?`;

  db.run(sql, [name, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({error: `Subject with id ${id} not found`});
    res.json({id, name});
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM subjects WHERE id = ?`;

  db.run(sql, [id], function(err) {
    if (err) return res.status(500).json({error: err.message});
    if (this.changes === 0) return res.status(404).json({ error: `Subject with id ${id} not found` });
    res.json({ deletedId: id });
  });
});
module.exports = router;

