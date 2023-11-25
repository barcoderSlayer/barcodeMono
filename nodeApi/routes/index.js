// Routes/index.js
//Controller

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//db key config로 관리하기
const db = mysql.createConnection({
    host: 'localhost',   
    user: 'root',
    password: '2848',
    database: 'bacode'
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

// query 메서드를 Promise로 변환 
const util = require('util');
const queryAsync = util.promisify(db.query).bind(db);


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
    
    const sql = `select * from products where barc odeNum = '${barcodeData}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
    
})

router.get('/api/rankings', async (req, res) => {
    try {
        const sql = 'SELECT * FROM products ORDER BY scanCnt DESC LIMIT 10';
        const rankings = await queryAsync(sql);
        console.log('Rankings:', rankings); // 결과를 콘솔에 출력
        res.json(rankings);
    } catch (err) {
        console.error('Error fetching rankings:', err);
        res.status(500).send(err);
    }
});

module.exports = router;

