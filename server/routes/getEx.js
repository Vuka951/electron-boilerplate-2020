import express from 'express';
import {db} from '../index';

// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', function(req, res) {
  db.serialize(function() {
    db.all('SELECT * FROM lorem', function(err, rows) {
      res.send(rows);
    });
  });
});

export default router;
