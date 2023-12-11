const express = require('express');
const mysql = require('mysql');
const config = require('../config');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(helmet());

// DB 연결 설정
const db = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE
});

// DB 연결 확인
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

// 병원 데이터 제공 API
app.get('/api/hospitals', (req, res) => {
  const query = 'SELECT * FROM hospitals WHERE hospitalID BETWEEN 1 AND 100 ORDER BY Name';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json(results);
  });
});

// 약국 데이터 제공 API
app.get('/api/pharmacies', (req, res) => {
  const query = 'SELECT * FROM Pharmacies WHERE pharmacyID BETWEEN 1 AND 100 ORDER BY Name';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json(results);
  });
});

// 문의글 생성 API
app.post('/api/inquiries', (req, res) => {
  const { title, content } = req.body;
  const query = "INSERT INTO inquiries (title, content) VALUES (?, ?)";
  db.query(query, [title, content], (err, result) => {
    if (err) {
      console.error('Error submitting inquiry:', err);
      return res.status(500).json({ success: false, message: 'Error submitting inquiry' });
    }
    res.json({ success: true, message: 'Inquiry submitted successfully', inquiryId: result.insertId });
  });
});

// 문의글 목록 조회 API
app.get('/api/inquiries', (req, res) => {
  const query = "SELECT * FROM inquiries";
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching inquiries:', err);
      return res.status(500).json({ success: false, message: 'Error fetching inquiries' });
    }
    res.json(results);
  });
});

// 특정 문의글 조회 API
app.get('/api/inquiries/:inquiryId', (req, res) => {
  const { inquiryId } = req.params;
  const query = "SELECT * FROM inquiries WHERE inquiryId = ?";
  db.query(query, [inquiryId], (err, result) => {
    if (err) {
      console.error('Error fetching inquiry details:', err);
      return res.status(500).json({ success: false, message: 'Error fetching inquiry details' });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
  });
});

// 문의글에 답변 추가 API
app.post('/api/inquiries/:inquiryId/answer', (req, res) => {
  const { inquiryId } = req.params;
  const { answer } = req.body;
  const query = "UPDATE inquiries SET answer = ? WHERE inquiryId = ?";
  db.query(query, [answer, inquiryId], (err, result) => {
    if (err) {
      console.error('Error submitting answer:', err);
      return res.status(500).json({ success: false, message: 'Error submitting answer' });
    }
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Answer submitted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
  });
});

// 서버 시작
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});