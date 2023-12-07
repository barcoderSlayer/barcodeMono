const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//cheerio API 자바스크립트 크롤링 api↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const axios = require('axios');
const config= require('../config');
const helmet = require('helmet');
require('dotenv').config(); // 환경 변수 라이브러리

const appHospitals = express();
const appPharmacies = express();

appPharmacies.use(express.json());
appPharmacies.use(helmet());


appHospitals.use(express.json());
appHospitals.use(helmet()); // 보안 헤더 설정

const portHospitals = 4000;
const portPharmacies = 4001;


//DataBaseKey
const db = mysql.createConnection({
host: config.DB_HOST,   
user: config.DB_USER,
password: config.DB_PASSWORD,
database: config.DB_DATABASE
})

appHospitals.get('/api/hospitals', (req, res) => {
const userLat = parseFloat(req.query.lat);
const userLng = parseFloat(req.query.lng);
if (isNaN(userLat) || isNaN(userLng)) {
return res.status(400).send('Invalid latitude or longitude');
}


const query = `
SELECT *, 
    (6371 * acos(
    cos(radians(?)) * cos(radians(latitude)) *
    cos(radians(longitude) - radians(?)) +
    sin(radians(?)) * sin(radians(latitude))
    )) AS distance 
FROM hospitals
HAVING distance < 1
ORDER BY distance`;

db.query(query, [userLat, userLng, userLat], (err, results) => {
if (err) {
    console.error(err);
    return res.status(500).send('An error occurred');
}
res.json(results);
});
});

appHospitals.listen(portHospitals, () => {
console.log(`병원 서버가 포트 ${portHospitals}에서 실행 중입니다`);
});

appPharmacies.get('/api/pharmacies', (req, res) => {
const userLat = parseFloat(req.query.lat);
const userLng = parseFloat(req.query.lng);
if (isNaN(userLat) || isNaN(userLng)) {
return res.status(400).send('Invalid latitude or longitude');
}

const query = `
SELECT *,
    (6371 * acos(
    cos(radians(?)) * cos(radians(latitude)) *
    cos(radians(longitude) - radians(?)) +
    sin(radians(?)) * sin(radians(latitude))
    )) AS distance
FROM pharmacies
HAVING distance < 1
ORDER BY distance`;

db.query(query, [userLat, userLng, userLat], (err, results) => {
if (err) {
    console.error(err);
    return res.status(500).send('An error occurred');
}
res.json(results);
});
});

appPharmacies.listen(portPharmacies, () => {
console.log(`약국 서버가 포트 ${portPharmacies}에서 실행 중입니다`);
});

//문의글 생성 api
app.post('/api/inquiries', async (req, res) => {
let conn;
try {
    conn = await pool.getConnection();
    const { title, content } = req.body;
    const result = await conn.query("INSERT INTO inquiries (title, content) VALUES (?, ?)", [title, content]);
    res.json({ success: true, message: 'Inquiry submitted successfully', inquiryId: result.insertId });
} catch (err) {
    res.status(500).json({ success: false, message: 'Error submitting inquiry' });
} finally {
    if (conn) conn.release();
}
});



//문의글 목록 조회 api
app.get('/api/inquiries', async (req, res) => {
let conn;
try {
    conn = await pool.getConnection();
    const results = await conn.query("SELECT * FROM inquiries");
    res.json(results);
} catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching inquiries' });
} finally {
    if (conn) conn.release();
}
});



//특정문의글 조회 api
app.get('/api/inquiries/:inquiryId', async(req, res) => {
let conn;
try {
    conn = await pool.getConnection();
    const { inquiryId } = req.params;
    const result = await conn.query("SELECT * FROM inquiries WHERE inquiryId = ?", [inquiryId]);
    if (result.length > 0) {
    res.json(result[0]);
    } else {
    res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
} catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching inquiry details' });
} finally {
    if (conn) conn.release();
}
});


//문의글에 답변추가 
apiapp.post('/api/inquiries/:inquiryId/answer', async (req, res) => {
let conn;
try {
    conn = await pool.getConnection();
    const { inquiryId } = req.params;
    const { answer } = req.body;
    const result = await conn.query("UPDATE inquiries SET answer = ? WHERE inquiryId = ?", [answer, inquiryId]);
    if (result.affectedRows > 0) {
    res.json({ success: true, message: 'Answer submitted successfully' });
    } else {
    res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
} catch (err) {
    res.status(500).json({ success: false, message: 'Error submitting answer' });
} finally {
    if (conn) conn.release();
};

})