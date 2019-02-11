import express from 'express';
import cors from 'cors';
import sqlite from 'sqlite3';
import path from 'path';

// Imported Routes
import getEx from './routes/getEx';
import postEx from './routes/postEx';
import putEx from './routes/putEx';
import deleteEx from './routes/deleteEx';
// DB set up
const dbPath = path.resolve(__dirname, '../public/database.db');
export let db = new sqlite.Database(dbPath);
console.log(dbPath);
const app = express();

app.use(cors());

app.use('/', getEx);
app.use('/post', postEx);
app.use('/put', putEx);
app.use('/delete', deleteEx);

app.use(function(err, req, res, next) {
  if (err.status && err.status < 500) {
    return res.status(400).send('Request Aborted');
  }
});

app.listen(3000, () => console.log('Running for my life on :3000'));
