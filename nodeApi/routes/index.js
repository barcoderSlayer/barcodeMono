// Routes/index.js
//Controller

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//db key config로 관리하기
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'qkrtjdgh123!',
    database: 'mydatabase'
})

//db 연결 확인
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');

    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
})


//router로 get 요청받기 test
router.get('/', (req,res) => {
    const responseObject ={
        key: 'value',
        key2: 'value2'
        //costom
    };
    res.send(barcodeData);
});

//barcodePage
router.get('/barcodePage/', (req,res) => {
    const barcodeData = req.query.barcodeData;
    console.log('barcodePage 요청 data :', barcodeData )
    
    const sql = `select * from products where barcodeNum = '${barcodeData}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
    
})

module.exports = router;

