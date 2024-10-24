const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recepti'
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//da dobis vse
app.get('/recepti', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query('SELECT * from recept', (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    });
});

// za single recept
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query('SELECT * from recept WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    });
});

// za bbirsanje
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query('DELETE from recept WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();

            if (!err) {
                res.send(`recept z idjem ${[req.params.id]} je izbrisan`);
            } else {
                console.log(err);
            }
        });
    });
});

// za kreiranje
app.post('', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const params = req.body;

        connection.query('INSERT INTO recept SET ?', params, (err, rows) => {
            connection.release();

            if (!err) {
                res.json({ message: `Recept z nazivom ${params.naziv} je dodan` });
            } else {
                console.log(err);
                res.status(500).json({ error: 'Napaka pri dodajanju recepta.' });
            }
        });
        console.log(req.body);
    });
});

// za updejtat
app.put('/recepti/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        const { naziv, sestavine, potekdela } = req.body; 
        const id = req.params.id;

        connection.query('UPDATE recept SET naziv = ?, sestavine = ?, potekdela = ? WHERE id = ?', [naziv, sestavine, potekdela, id], (err, result) => {
            connection.release();

            if (!err) {
                res.send(`Recept z nazivom ${naziv} je bil uspešno posodobljen.`);
            } else {
                console.log(err);
                res.status(500).send('Napaka pri posodabljanju recepta.');
            }
        });
    });
});

// Listen on port
app.listen(port, () => console.log(`Listening on port ${port}`));
