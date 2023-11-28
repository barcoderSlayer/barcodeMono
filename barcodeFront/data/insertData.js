const mariadb = require('mariadb');
const fs = require('fs');

const pool = mariadb.createPool({
    host: '127.0.0.1', 
    user: 'root', 
    password: 'qkrtjdgh123!',
    database: 'mydatabase'
});

async function insertData() {
    let conn;
    try {
        // JSON 파일 읽기
        const data = JSON.parse(fs.readFileSync('Pharmacy.json', 'utf8'));
        
        conn = await pool.getConnection();
        
       // 데이터 삽입
for (let item of data) {
    await conn.query('INSERT INTO Pharmacy (Name, PhoneNumber, Latitude, Longitude, Address, Codename) VALUES (?, ?, ?, ?, ?, ?)', [
        item.요양기관명, item.전화번호, item.위도, item.경도, item.주소, item.종별코드명
    ]);
}

    } catch (err) {
        console.error(err);
    } finally {
        if (conn) await conn.end();
    }
}

insertData();
