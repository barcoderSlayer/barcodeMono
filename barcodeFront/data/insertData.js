const mariadb = require('mariadb');
const fs = require('fs');


// const pool = mariadb.createPool({
//     host: 'localhost',   
//     user: 'root',
//     password: '4865',
//     database: 'barcoder'
// });

async function insertData() {
    let conn;
    try {
        // JSON 파일 읽기
        const data = JSON.parse(fs.readFileSync('Hospitalinfo.json', 'utf8'));
        
        conn = await pool.getConnection();
        
       // 데이터 삽입
for (let item of data) {
    await conn.query('INSERT INTO hospitals (name, phoneNumber, latitude, longitude, address, codename) VALUES (?, ?, ?, ?, ?, ?)', [
        item.요양기관명, item.전화번호, item.경도, item.위도, item.주소, item.종별코드명
    ]);
}

    } catch (err) {
        console.error(err);
    } finally {
        if (conn) await conn.end();
    }
}

insertData();
