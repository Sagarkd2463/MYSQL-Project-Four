const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'r$$100200',
    database:'books',
});

db.connect((err) => {
    if(err){
        console.log('Database Not Connected', err.stack);
    } else {
        console.log('Database Connected Successfully...');
    }
});

app.get('/books', (req, res) => {
    const query = "SELECT * FROM book";
    db.query(query, (err, data) => {
        if(err){
            res.json({status: false, message: err.stack});
        } else {
            res.json({status: true, message: data});
        }
    });
});

app.post('/books', (req, res) => {
    const query = "INSERT INTO book(`title`, `desc`, `cover`, `price`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(query, [values], (err, data) => {
        if(err){
            res.json({status: false, message: err.stack});
        } else {
            res.json({status: true, message: data});
        }
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM book WHERE id = ?";

    db.query(query, [id], (err) => {
        if(err){
            res.json({status: false, message: err.stack});
        } else {
            res.json({status: true, message: `Book with id - ${id} is deleted from the database.`});
        }
    });
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;

    const query = "UPDATE book SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(query, [...values, id], (err, data) => {
        if(err){
            res.json({status: false, message: err.stack});
        } else {
            res.json({status: true, message: data});
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`);
});