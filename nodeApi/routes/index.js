// Routes/index.js
//Controller

const express = require('express');
const router = express.Router();


const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4865',
    database: 'barcoder'
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

//router로 get 요청받기
router.get('/', (req,res) => {
    const responseObject ={
        key: 'value',
        key2: 'value2'
        //costom
    };

    res.send(responseObject);
});

router.get('/:barcodeNumber', (req,res) => {
    const userId = req.params.userId;
    //db 조회 로직
    //res.send(`get productName : ${productName}`)
})


module.exports = router;

