// Routes/index.js
//Controller

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//db key config로 관리하기
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

    const sql = 'show tables;';
    db.query(sql,(err, result) => {
        if (err) throw err;
        // console.log(result);
        console.log("connected!!!", result);
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
    
    // getData(barcodeData);
    
    const sql = `select * from products where barcodeNum = '${barcodeData}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})



//cheerio API 자바스크립트 크롤링 api↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const axios = require('axios');
const cheerio = require('cheerio');

// function getData(barcodeNumber) {
//     let url = `http://www.allproductkorea.or.kr/products/search?q=%7B%22mainKeyword%22:%22${barcodeNumber}%22,%22subKeyword%22:%22%22%7D&page=1&size=1`;
//     let html = response.data;
// let $ = cheerio.load(html);
// $.html();
// // 원하는 데이터를 가져옵니다.
// let productCode = $('li[data-prd-no] em').text();
// let productName = $('li[data-prd-no] strong').text();
// let productCategory = $('li[data-prd-no] .spl_pm').text();
// console.log(productCode, productName, productCategory);

        
//         if(response.status ===200){
//             let html = response.data;
//             let $ = cheerio.load(html);
    
//             //원하는 데이터를 가져옵니다.
//             let productCode = $('li[data-prd-no] em').text();
//             let productName = $('li[data-prd-no] strong').text();
//             let productCategory = $('li[data-prd-no] .spl_pm').text();
        
//             console.log(productCode, productName, productCategory);
//         }
    
// }



module.exports = router;

