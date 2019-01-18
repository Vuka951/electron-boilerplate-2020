const express = require('express');
const cors = require('cors');
const app = express();
let sqlite = require('sqlite3');
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.db');
let db = new sqlite.Database(dbPath);

app.use(cors());

app.get('/', (req, res) => {
  db.serialize(function() {
    db.all('SELECT * FROM lorem', function(err, rows) {
      res.send(rows);
    });
  });
});

app.listen(3000, function() {
  console.log('Running for my life on :3000');
});
