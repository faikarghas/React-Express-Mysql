const express   = require('express');
const app       = express();
const cors      = require('cors');
const mysql     = require('mysql');
const bodyParser = require('body-parser');
const port      = 3010

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'faikar127',
    database: 'exmysql'
})

db.connect();

app.get('/data', (req, res) => {
    let sql = 'select * from dataku';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.post('/data', (req, res) => {
    let data    = {nama:req.body.nama, usia:req.body.usia};
    let sql     = 'insert into dataku set ?';
    db.query(sql,data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);

    // let data = {nama:"dedi", usia:23}
// let sql = 'insert into pegawai set ?';
// db.query(sql, data, (err, result) => {
//     if (err) throw err;
//     console.log(result);
// });
    })
})


app.listen(port, () => {
    console.log(`aktif di port ${port}`)
})