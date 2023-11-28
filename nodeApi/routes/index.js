// Routes/index.js
//Controller

//http://192.168.0.41:3000/

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//cheerio API 자바스크립트 크롤링 api↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const axios = require('axios');
const cheerio = require('cheerio');

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
    res.send(null);
});

//barcodePage
// 비동기적으로 가져와야한다. async ...
router.get('/barcodePage/', async(req,res) => {
    const barcodeData = req.query.barcodeData;
    console.log('barcodePage 요청 data :', barcodeData )
    
    const imgUrl = await getImgUrl(barcodeData); //이미지 값 가져오기
    console.log("함수에서 받은 데이터",imgUrl);
    
    const sql = `select * from products where barcodeNum = '${barcodeData}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;

        // console.log(result);
        if(imgUrl){ //imgUrl 함수 실행 결과값이 있다면
            result[0].imageUrl = imgUrl;
        }
        console.log( "보내는 데이터 :",result);
        res.send(result);
    })
})





//사이트 서버에서 이미지 소스 크롤링
async function getImgUrl(barcodeData){
    let imageUrl = null;
    try{
        console.log(barcodeData, '의 이미지 데이터 = ↓');
        const imgUrlArray = [];

    
        const response = await axios.get(`https://www.beepscan.com/barcode/${barcodeData}`);
                const $ = cheerio.load(response.data); //html 받아오기
                
                $('div.card>img').each((index, item) =>{
                    console.log("크롤링 해온 imageUrl은",item.attribs.src); //item에서 attribs class 안에 src만 받아오기
                    imgUrlArray.push(item.attribs.src);
                    //얻어온url을 db 이미지에 넣기
                }); //이미지 가지고오기

            //imageUrl 값이 있다면  sql문 실행
            imageUrl = imgUrlArray.length > 0 ? imgUrlArray[0] : null;
            // if (imageUrl) {
            //     const updateSql = `UPDATE products SET imageUrl = ? WHERE barcodeNum = ?`;
            //     db.query(updateSql, [imageUrl, barcodeData], (err, updateResult) => {
            //         if (err) {
            //             console.error('Error updating image URL in DB:', err);
            //             throw err;
            //         } else {
            //             console.log('Update result:', updateResult);
            //         }
            //     });
            // }

    }catch(error){
        console.log("getImgUrl에서 에러 발생", error)
        throw error;
    }
    return imageUrl;
}


module.exports = router;

